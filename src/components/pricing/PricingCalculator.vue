<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { externalLinks } from '../../data/externalLinks';
import { useTranslations } from '../../i18n/ui';
import { localizeHref, type Locale } from '../../i18n/routes';

const props = withDefaults(defineProps<{ locale?: Locale }>(), { locale: 'nl' });
const t = computed(() => useTranslations(props.locale).pricingCalculator);
const contactHref = computed(() => localizeHref('/contact', props.locale));

interface OrderTier {
    min: number;
    max: number | null;
    pricePerOrder: number;
}

const PRICE_PER_CHANNEL = 5;
const MAX_CHANNELS = 100;
const ORDER_SLIDER_MAX = 1000;
const ORDER_TARGET_MAX = 100000;

const CURVE_POWER = 2;

const CHANNEL_SLIDER_MAX = 1000;
const CHANNEL_CURVE_POWER = 2;

function ordersToSliderPosition(orderCount: number): number {
    if (orderCount <= 0) {
        return 0;
    }

    if (orderCount >= ORDER_TARGET_MAX) {
        return ORDER_SLIDER_MAX;
    }

    return Math.round(Math.pow(orderCount / ORDER_TARGET_MAX, 1 / CURVE_POWER) * ORDER_SLIDER_MAX);
}

function sliderPositionToOrders(position: number): number {
    if (position <= 0) {
        return 0;
    }

    if (position >= ORDER_SLIDER_MAX) {
        return ORDER_TARGET_MAX;
    }

    const t = position / ORDER_SLIDER_MAX;
    const raw = Math.pow(t, CURVE_POWER) * ORDER_TARGET_MAX;

    let precision: number;

    if (raw < 100) {
        precision = 10;
    } else if (raw < 1000) {
        precision = 25;
    } else if (raw < 10000) {
        precision = 100;
    } else if (raw < 50000) {
        precision = 500;
    } else {
        precision = 1000;
    }

    return Math.max(0, Math.round(raw / precision) * precision);
}

function channelsToSliderPosition(channelCount: number): number {
    if (channelCount <= 1) {
        return 0;
    }

    if (channelCount >= MAX_CHANNELS) {
        return CHANNEL_SLIDER_MAX;
    }

    return Math.round(Math.pow((channelCount - 1) / (MAX_CHANNELS - 1), 1 / CHANNEL_CURVE_POWER) * CHANNEL_SLIDER_MAX);
}

function sliderPositionToChannels(position: number): number {
    if (position <= 0) {
        return 1;
    }

    if (position >= CHANNEL_SLIDER_MAX) {
        return MAX_CHANNELS;
    }

    const t = position / CHANNEL_SLIDER_MAX;
    const raw = Math.pow(t, CHANNEL_CURVE_POWER) * (MAX_CHANNELS - 1) + 1;
    return Math.round(raw);
}

const ORDER_TICKS = [
    {
        value: 500,
    },
    {
        value: 2500,
    },
    {
        value: 10000,
    },
    {
        value: 50000,
    },
];

const orderTickPositions = ORDER_TICKS.map((tick) => {
    return {
        ...tick,
        percent: (ordersToSliderPosition(tick.value) / ORDER_SLIDER_MAX) * 100,
    };
});

const CHANNEL_TICKS = [
    {
        value: 5,
    },
    {
        value: 10,
    },
    {
        value: 25,
    },
    {
        value: 50,
    },
];

const channelTickPositions = computed(() => {
    const numberFormat = new Intl.NumberFormat(t.value.numberLocale);
    return CHANNEL_TICKS.map((tick) => {
        return {
            ...tick,
            label: numberFormat.format(tick.value),
            percent: (channelsToSliderPosition(tick.value) / CHANNEL_SLIDER_MAX) * 100,
        };
    });
});

const ORDER_TIERS: Array<OrderTier> = [
    {
        min: 0,
        max: 100,
        pricePerOrder: 0.10,
    },
    {
        min: 100,
        max: 250,
        pricePerOrder: 0.20,
    },
    {
        min: 250,
        max: 500,
        pricePerOrder: 0.14,
    },
    {
        min: 500,
        max: 1000,
        pricePerOrder: 0.07,
    },
    {
        min: 1000,
        max: 1500,
        pricePerOrder: 0.08,
    },
    {
        min: 1500,
        max: 2500,
        pricePerOrder: 0.025,
    },
    {
        min: 2500,
        max: 4000,
        pricePerOrder: 0.0333,
    },
    {
        min: 4000,
        max: 6000,
        pricePerOrder: 0.0625,
    },
    {
        min: 6000,
        max: 10000,
        pricePerOrder: 0.0375,
    },
    {
        min: 10000,
        max: null,
        pricePerOrder: 0.02,
    },
];

const channelSliderValue = ref(channelsToSliderPosition(2));
const orderSliderValue = ref(ordersToSliderPosition(500));

const channels = computed(() => {
    return sliderPositionToChannels(channelSliderValue.value);
});

const orders = computed(() => {
    return sliderPositionToOrders(orderSliderValue.value);
});

const isMaxOrders = computed(() => {
    return orderSliderValue.value === ORDER_SLIDER_MAX;
});

const isMaxChannels = computed(() => {
    return channels.value === MAX_CHANNELS;
});

const showSalesNotice = computed(() => {
    return isMaxOrders.value || isMaxChannels.value;
});

const isEnterprise = computed(() => {
    return isMaxOrders.value && isMaxChannels.value;
});

const channelCost = computed(() => {
    return channels.value * PRICE_PER_CHANNEL;
});

const orderCost = computed(() => {
    const totalOrders = orders.value;
    let total = 0;

    for (const tier of ORDER_TIERS) {
        if (totalOrders <= tier.min) {
            break;
        }

        const tierMax = tier.max ?? Infinity;
        const ordersInTier = Math.min(totalOrders, tierMax) - tier.min;
        total += ordersInTier * tier.pricePerOrder;
    }

    return total;
});

const totalPrice = computed(() => {
    return channelCost.value + orderCost.value;
});

const formattedTotal = computed(() => {
    return new Intl.NumberFormat(t.value.numberLocale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(totalPrice.value);
});

const formattedChannelCost = computed(() => {
    return new Intl.NumberFormat(t.value.numberLocale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(channelCost.value);
});

const formattedOrderCost = computed(() => {
    return new Intl.NumberFormat(t.value.numberLocale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(orderCost.value);
});

const formattedOrders = computed(() => {
    return new Intl.NumberFormat(t.value.numberLocale).format(orders.value);
});

const ordersLabel = computed(() => {
    if (isMaxOrders.value) {
        return t.value.ordersMax;
    }

    return formattedOrders.value;
});

const ordersAriaText = computed(() => {
    if (isMaxOrders.value) {
        return t.value.ordersAriaMax;
    }

    if (orders.value === 0) {
        return t.value.ordersAriaZero;
    }

    if (orders.value === 1) {
        return t.value.ordersAriaOne;
    }

    return t.value.ordersAriaMany.replace('{n}', formattedOrders.value);
});

const channelLabel = computed(() => {
    if (isMaxChannels.value) {
        return t.value.channelsMaxLabel;
    }

    if (channels.value === 1) {
        return t.value.channelOne;
    }

    return t.value.channelMany.replace('{n}', String(channels.value));
});

const salesNoticeText = computed(() => {
    if (isEnterprise.value) {
        return t.value.salesEnterprise;
    }

    if (isMaxOrders.value) {
        return t.value.salesOrders;
    }

    return t.value.salesChannels;
});

watch(channelSliderValue, (newValue) => {
    const channelCount = sliderPositionToChannels(newValue);
    const idealPosition = channelsToSliderPosition(channelCount);
    if (newValue !== idealPosition) {
        channelSliderValue.value = idealPosition;
    }
}, { flush: 'sync' });

watch(orderSliderValue, (newValue) => {
    const orderCount = sliderPositionToOrders(newValue);
    const idealPosition = ordersToSliderPosition(orderCount);
    if (newValue !== idealPosition) {
        orderSliderValue.value = idealPosition;
    }
}, { flush: 'sync' });
</script>

<template>
    <section class="py-12 md:py-16">
        <div class="container-prose">
            <div class="grid lg:grid-cols-5 gap-8 lg:gap-12">
                <div class="lg:col-span-3 bg-paper dark:bg-charcoal rounded-2xl ring-1 ring-chalk-dark dark:ring-flint p-8 md:p-12">
                    <p class="eyebrow mb-3">{{ t.eyebrow }}</p>
                    <h2 class="text-2xl md:text-3xl font-semibold text-charcoal dark:text-paper tracking-tight leading-tight mb-10">
                        {{ t.heading }}
                    </h2>

                    <div class="mb-10">
                        <div class="flex items-baseline justify-between mb-4">
                            <label for="channels-input" class="text-sm font-semibold text-charcoal dark:text-paper">
                                {{ t.channelsLabel }}
                            </label>
                            <span class="text-base font-semibold text-charcoal dark:text-paper tabular-nums">
                                {{ channelLabel }}
                            </span>
                        </div>

                        <input
                            id="channels-input"
                            v-model.number="channelSliderValue"
                            type="range"
                            min="0"
                            :max="CHANNEL_SLIDER_MAX"
                            step="1"
                            class="pricing-range w-full"
                            :aria-valuetext="channelLabel"
                            :style="{
                                '--progress': `${(channelSliderValue / CHANNEL_SLIDER_MAX) * 100}%`,
                            }"
                        />

                        <div class="relative h-1.5 mt-1 mx-[11px]">
                            <span
                                v-for="tick in channelTickPositions"
                                :key="`mark-channel-${tick.value}`"
                                class="absolute top-0 w-px h-1.5 bg-chalk-darker dark:bg-flint"
                                :style="{ left: `${tick.percent}%` }"
                                aria-hidden="true"
                            ></span>
                        </div>

                        <div class="relative text-xs text-gravel mt-1 tabular-nums h-4 mx-[11px]">
                            <span class="absolute left-0 top-0">1</span>
                            <span
                                v-for="tick in channelTickPositions"
                                :key="`label-channel-${tick.value}`"
                                class="absolute top-0 -translate-x-1/2"
                                :style="{ left: `${tick.percent}%` }"
                            >
                                {{ tick.label }}
                            </span>
                            <span class="absolute right-0 top-0">100+</span>
                        </div>
                    </div>

                    <div class="mb-10">
                        <div class="flex items-baseline justify-between mb-4">
                            <label for="orders-input" class="text-sm font-semibold text-charcoal dark:text-paper">
                                {{ t.ordersLabel }}
                            </label>
                            <span class="text-base font-semibold text-charcoal dark:text-paper tabular-nums">
                                {{ ordersLabel }}
                            </span>
                        </div>

                        <input
                            id="orders-input"
                            v-model.number="orderSliderValue"
                            type="range"
                            min="0"
                            :max="ORDER_SLIDER_MAX"
                            step="1"
                            class="pricing-range w-full"
                            :aria-valuetext="ordersAriaText"
                            :style="{
                                '--progress': `${(orderSliderValue / ORDER_SLIDER_MAX) * 100}%`,
                            }"
                        />

                        <div class="relative h-1.5 mt-1 mx-[11px]">
                            <span
                                v-for="tick in orderTickPositions"
                                :key="`mark-${tick.value}`"
                                class="absolute top-0 w-px h-1.5 bg-chalk-darker dark:bg-flint"
                                :style="{ left: `${tick.percent}%` }"
                                aria-hidden="true"
                            ></span>
                        </div>

                        <div class="relative text-xs text-gravel mt-1 tabular-nums h-4 mx-[11px]">
                            <span class="absolute left-0 top-0">0</span>
                            <span
                                v-for="(tick, i) in orderTickPositions"
                                :key="`label-${tick.value}`"
                                class="absolute top-0 -translate-x-1/2"
                                :style="{ left: `${tick.percent}%` }"
                            >
                                {{ t.tickOrders[i] }}
                            </span>
                            <span class="absolute right-0 top-0">100k+</span>
                        </div>
                    </div>

                    <div class="pt-8 border-t border-chalk-dark dark:border-flint">
                        <p class="eyebrow mb-5">{{ t.breakdown }}</p>
                        <dl class="space-y-3 text-sm">
                            <div class="flex items-baseline justify-between gap-4">
                                <dt class="text-steel dark:text-gravel">
                                    {{ t.channelsRow }}
                                    <span class="text-gravel">
                                        ({{ channels }})
                                    </span>
                                </dt>
                                <dd class="text-charcoal dark:text-paper font-medium tabular-nums whitespace-nowrap">
                                    &euro; {{ formattedChannelCost }}
                                </dd>
                            </div>
                            <div class="flex items-baseline justify-between gap-4">
                                <dt class="text-steel dark:text-gravel">
                                    {{ t.ordersRow }}
                                    <span v-if="orders > 0" class="text-gravel">
                                        ({{ formattedOrders }})
                                    </span>
                                </dt>
                                <dd class="text-charcoal dark:text-paper font-medium tabular-nums whitespace-nowrap">
                                    &euro; {{ formattedOrderCost }}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <aside class="lg:col-span-2 bg-charcoal dark:bg-graphite text-paper rounded-2xl p-8 md:p-12 flex flex-col">
                    <p class="text-xs uppercase tracking-[0.08em] font-semibold text-sunstone mb-4">
                        {{ t.monthlyPrice }}
                    </p>

                    <div class="flex items-baseline gap-2 mb-2">
                        <span class="text-5xl md:text-6xl font-semibold tabular-nums tracking-tight leading-none">
                            &euro;{{ formattedTotal }}
                        </span>
                        <span class="text-base text-chalk-darker">{{ t.perMonth }}</span>
                    </div>

                    <p class="text-sm text-chalk-darker leading-relaxed mb-6">
                        {{ t.payg }}
                    </p>

                    <div
                        v-if="showSalesNotice"
                        class="mb-8 rounded-lg bg-sunstone-mist/15 border border-sunstone/40 p-4 text-sm leading-relaxed"
                    >
                        <div class="flex items-start gap-3">
                            <i class="fa-solid fa-headset text-sunstone text-base mt-0.5" aria-hidden="true"></i>
                            <div>
                                <p class="text-paper mb-2">
                                    {{ salesNoticeText }}
                                </p>
                                <a
                                    :href="contactHref"
                                    class="inline-flex items-center gap-1.5 text-sunstone font-semibold hover:text-paper transition-colors"
                                >
                                    {{ t.contactSales }}
                                    <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <ul class="space-y-3 mb-10">
                        <li
                            v-for="perk in t.perks"
                            :key="perk"
                            class="flex items-start gap-3 text-sm text-chalk"
                        >
                            <i class="fa-solid fa-check text-sunstone text-xs mt-1" aria-hidden="true"></i>
                            <span>{{ perk }}</span>
                        </li>
                    </ul>

                    <div class="mt-auto flex flex-col gap-3">
                        <a
                            :href="externalLinks.register"
                            class="btn btn-sunstone justify-center text-base"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ t.startTrial }}
                            <i class="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                        </a>
                        <a
                            :href="externalLinks.demoBooking"
                            class="text-center text-sm text-chalk-darker hover:text-paper transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ t.preferDemo }}
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>

<style scoped>
.pricing-range {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    height: 1.25rem;
    cursor: pointer;
}

.pricing-range:focus {
    outline: none;
}

.pricing-range::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 9999px;
    background: linear-gradient(
        to right,
        var(--color-charcoal) 0%,
        var(--color-charcoal) var(--progress, 0%),
        var(--color-chalk-dark) var(--progress, 0%),
        var(--color-chalk-dark) 100%
    );
}

.pricing-range::-moz-range-track {
    height: 6px;
    border-radius: 9999px;
    background: var(--color-chalk-dark);
}

.pricing-range::-moz-range-progress {
    height: 6px;
    border-radius: 9999px;
    background-color: var(--color-charcoal);
}

.pricing-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    margin-top: -8px;
    border-radius: 9999px;
    background-color: var(--color-paper);
    border: 2px solid var(--color-charcoal);
    box-shadow: 0 1px 4px rgba(25, 25, 25, 0.18);
    transition: transform 0.15s ease;
}

.pricing-range::-webkit-slider-thumb:hover {
    transform: scale(1.08);
}

.pricing-range::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 9999px;
    background-color: var(--color-paper);
    border: 2px solid var(--color-charcoal);
    box-shadow: 0 1px 4px rgba(25, 25, 25, 0.18);
    transition: transform 0.15s ease;
}

.pricing-range::-moz-range-thumb:hover {
    transform: scale(1.08);
}

.pricing-range:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone-deep);
}

.pricing-range:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone-deep);
}

</style>

<style>
/* Dark mode (UNSCOPED so the `.dark` class on <html>, outside this component,
   matches). The slider fill is the primary neutral and inverts exactly like the
   primary buttons: charcoal (light) -> paper (dark). The unfilled track goes
   chalk-dark -> flint, and the knob inverts too (paper+charcoal border ->
   charcoal+paper border) so it stays visible on the now-light fill. */
.dark .pricing-range::-webkit-slider-runnable-track {
    background: linear-gradient(
        to right,
        var(--color-paper) 0%,
        var(--color-paper) var(--progress, 0%),
        var(--color-flint) var(--progress, 0%),
        var(--color-flint) 100%
    );
}

.dark .pricing-range::-moz-range-track {
    background: var(--color-flint);
}

.dark .pricing-range::-moz-range-progress {
    background-color: var(--color-paper);
}

.dark .pricing-range::-webkit-slider-thumb {
    background-color: var(--color-charcoal);
    border-color: var(--color-paper);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.dark .pricing-range::-moz-range-thumb {
    background-color: var(--color-charcoal);
    border-color: var(--color-paper);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.dark .pricing-range:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone);
}

.dark .pricing-range:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone);
}
</style>
