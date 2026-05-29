<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { externalLinks } from '../../data/externalLinks';

interface OrderTier {
    min: number;
    max: number | null;
    pricePerOrder: number;
}

const PRICE_PER_CHANNEL = 5;
const MAX_CHANNELS = 100;
const ORDER_SLIDER_MAX = 1000;
const ORDER_TARGET_MAX = 100000;

const CURVE_POWER = 3;

const CHANNEL_SLIDER_MAX = 1000;
const CHANNEL_CURVE_POWER = 3;

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
        value: 100,
        label: '100',
    },
    {
        value: 1000,
        label: '1k',
    },
    {
        value: 10000,
        label: '10k',
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
        label: '5',
    },
    {
        value: 25,
        label: '25',
    },
    {
        value: 50,
        label: '50',
    },
];

const channelTickPositions = CHANNEL_TICKS.map((tick) => {
    return {
        ...tick,
        percent: (channelsToSliderPosition(tick.value) / CHANNEL_SLIDER_MAX) * 100,
    };
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
    let remaining = orders.value;
    let total = 0;
    let lastMax = 0;

    for (const tier of ORDER_TIERS) {
        const tierMax = tier.max ?? Infinity;
        const tierSize = tierMax - lastMax;
        const inThisTier = Math.min(remaining, tierSize);

        if (inThisTier > 0) {
            total += inThisTier * tier.pricePerOrder;
            remaining -= inThisTier;
        }

        if (remaining <= 0) {
            break;
        }

        lastMax = tierMax;
    }

    return total;
});

const totalPrice = computed(() => {
    return channelCost.value + orderCost.value;
});

const formattedTotal = computed(() => {
    return new Intl.NumberFormat('nl-NL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(totalPrice.value);
});

const formattedChannelCost = computed(() => {
    return new Intl.NumberFormat('nl-NL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(channelCost.value);
});

const formattedOrderCost = computed(() => {
    return new Intl.NumberFormat('nl-NL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(orderCost.value);
});

const formattedOrders = computed(() => {
    return new Intl.NumberFormat('nl-NL').format(orders.value);
});

const ordersLabel = computed(() => {
    if (isMaxOrders.value) {
        return '100.000+';
    }

    return formattedOrders.value;
});

const channelLabel = computed(() => {
    if (isMaxChannels.value) {
        return '100+ verkoopkanalen';
    }

    if (channels.value === 1) {
        return '1 verkoopkanaal';
    }

    return `${channels.value} verkoopkanalen`;
});

const salesNoticeText = computed(() => {
    if (isEnterprise.value) {
        return 'Werk je op enterprise schaal? Plan een gesprek met sales voor een offerte op maat.';
    }

    if (isMaxOrders.value) {
        return 'Boven 100.000 orders per maand? Plan een gesprek met sales voor enterprise pricing.';
    }

    return 'Meer dan 100 verkoopkanalen? Plan een gesprek met sales voor enterprise pricing.';
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
                <div class="lg:col-span-3 bg-paper rounded-2xl ring-1 ring-chalk-dark p-8 md:p-12">
                    <p class="eyebrow mb-3">Bereken jouw maandprijs</p>
                    <h2 class="text-2xl md:text-3xl font-semibold text-charcoal tracking-tight leading-tight mb-10">
                        Je betaalt alleen voor wat je gebruikt.
                    </h2>

                    <div class="mb-10">
                        <div class="flex items-baseline justify-between mb-4">
                            <label for="channels-input" class="text-sm font-semibold text-charcoal">
                                Aantal verkoopkanalen
                            </label>
                            <span class="text-base font-semibold text-charcoal tabular-nums">
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
                            :style="{
                                '--progress': `${(channelSliderValue / CHANNEL_SLIDER_MAX) * 100}%`,
                            }"
                        />

                        <div class="relative h-1.5 mt-1 mx-[11px]">
                            <span
                                v-for="tick in channelTickPositions"
                                :key="`mark-channel-${tick.value}`"
                                class="absolute top-0 w-px h-1.5 bg-chalk-darker"
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
                            <label for="orders-input" class="text-sm font-semibold text-charcoal">
                                Orders per maand
                            </label>
                            <span class="text-base font-semibold text-charcoal tabular-nums">
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
                            :style="{
                                '--progress': `${(orderSliderValue / ORDER_SLIDER_MAX) * 100}%`,
                            }"
                        />

                        <div class="relative h-1.5 mt-1 mx-[11px]">
                            <span
                                v-for="tick in orderTickPositions"
                                :key="`mark-${tick.value}`"
                                class="absolute top-0 w-px h-1.5 bg-chalk-darker"
                                :style="{ left: `${tick.percent}%` }"
                                aria-hidden="true"
                            ></span>
                        </div>

                        <div class="relative text-xs text-gravel mt-1 tabular-nums h-4 mx-[11px]">
                            <span class="absolute left-0 top-0">0</span>
                            <span
                                v-for="tick in orderTickPositions"
                                :key="`label-${tick.value}`"
                                class="absolute top-0 -translate-x-1/2"
                                :style="{ left: `${tick.percent}%` }"
                            >
                                {{ tick.label }}
                            </span>
                            <span class="absolute right-0 top-0">100k+</span>
                        </div>
                    </div>

                    <div class="pt-8 border-t border-chalk-dark">
                        <p class="eyebrow mb-5">Prijsopbouw</p>
                        <dl class="space-y-3 text-sm">
                            <div class="flex items-baseline justify-between gap-4">
                                <dt class="text-steel">
                                    Verkoopkanalen
                                    <span class="text-gravel">
                                        ({{ channels }})
                                    </span>
                                </dt>
                                <dd class="text-charcoal font-medium tabular-nums whitespace-nowrap">
                                    &euro; {{ formattedChannelCost }}
                                </dd>
                            </div>
                            <div class="flex items-baseline justify-between gap-4">
                                <dt class="text-steel">
                                    Orders
                                    <span v-if="orders > 0" class="text-gravel">
                                        ({{ formattedOrders }})
                                    </span>
                                </dt>
                                <dd class="text-charcoal font-medium tabular-nums whitespace-nowrap">
                                    &euro; {{ formattedOrderCost }}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <aside class="lg:col-span-2 bg-charcoal text-paper rounded-2xl p-8 md:p-12 flex flex-col">
                    <p class="text-xs uppercase tracking-[0.08em] font-semibold text-sunstone mb-4">
                        Jouw maandprijs
                    </p>

                    <div class="flex items-baseline gap-2 mb-2">
                        <span class="text-5xl md:text-6xl font-semibold tabular-nums tracking-tight leading-none">
                            &euro;{{ formattedTotal }}
                        </span>
                        <span class="text-base text-chalk-darker">/ maand</span>
                    </div>

                    <p class="text-sm text-chalk-darker leading-relaxed mb-6">
                        Vanaf &euro; 5 per maand. Geen verborgen kosten. Maandelijks opzegbaar.
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
                                    href="/contact"
                                    class="inline-flex items-center gap-1.5 text-sunstone font-semibold hover:text-paper transition-colors"
                                >
                                    Contact sales
                                    <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <ul class="space-y-3 mb-10">
                        <li class="flex items-start gap-3 text-sm text-chalk">
                            <i class="fa-solid fa-check text-sunstone text-xs mt-1" aria-hidden="true"></i>
                            <span>Alle features inbegrepen</span>
                        </li>
                        <li class="flex items-start gap-3 text-sm text-chalk">
                            <i class="fa-solid fa-check text-sunstone text-xs mt-1" aria-hidden="true"></i>
                            <span>Ongelimiteerde gebruikers</span>
                        </li>
                        <li class="flex items-start gap-3 text-sm text-chalk">
                            <i class="fa-solid fa-check text-sunstone text-xs mt-1" aria-hidden="true"></i>
                            <span>Snelle support via chat en mail</span>
                        </li>
                        <li class="flex items-start gap-3 text-sm text-chalk">
                            <i class="fa-solid fa-check text-sunstone text-xs mt-1" aria-hidden="true"></i>
                            <span>Gratis migratie en onboarding</span>
                        </li>
                    </ul>

                    <div class="mt-auto flex flex-col gap-3">
                        <a
                            :href="externalLinks.register"
                            class="btn btn-sunstone justify-center text-base"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Start 14 dagen gratis
                            <i class="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                        </a>
                        <a
                            :href="externalLinks.demoBooking"
                            class="text-center text-sm text-chalk-darker hover:text-paper transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Liever eerst een demo? Plan een gesprek
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
    box-shadow: 0 0 0 4px var(--color-sunstone-mist);
}

.pricing-range:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone-mist);
}
</style>
