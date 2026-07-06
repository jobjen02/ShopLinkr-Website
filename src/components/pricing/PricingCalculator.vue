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

// All-in model: one price, driven only by orders. Sales channels, label printing
// and users are included for free. A EUR 10/month minimum applies at low volume.
const MIN_PRICE = 10;
const ORDER_SLIDER_MAX = 1000;
const ORDER_TARGET_MAX = 100000;
const CURVE_POWER = 2;

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

const ORDER_TICKS = [
    { value: 500 },
    { value: 2500 },
    { value: 10000 },
    { value: 50000 },
];

const orderTickPositions = ORDER_TICKS.map((tick) => {
    return {
        ...tick,
        percent: (ordersToSliderPosition(tick.value) / ORDER_SLIDER_MAX) * 100,
    };
});

const ORDER_TIERS: Array<OrderTier> = [
    { min: 0, max: 250, pricePerOrder: 0.26 },
    { min: 250, max: 500, pricePerOrder: 0.17 },
    { min: 500, max: 1000, pricePerOrder: 0.13 },
    { min: 1000, max: 2500, pricePerOrder: 0.095 },
    { min: 2500, max: 5000, pricePerOrder: 0.066 },
    { min: 5000, max: 10000, pricePerOrder: 0.048 },
    { min: 10000, max: 25000, pricePerOrder: 0.036 },
    { min: 25000, max: null, pricePerOrder: 0.028 },
];

const orderSliderValue = ref(ordersToSliderPosition(300));

const orders = computed(() => {
    return sliderPositionToOrders(orderSliderValue.value);
});

const isMaxOrders = computed(() => {
    return orderSliderValue.value === ORDER_SLIDER_MAX;
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
    return Math.max(MIN_PRICE, orderCost.value);
});

const formattedTotal = computed(() => {
    // Whole euros only: the calculator is indicative ("work it out yourself"), so a
    // rounded round number reads cleaner than trailing cents.
    return new Intl.NumberFormat(t.value.numberLocale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(totalPrice.value);
});

// Keep the big price on one line: shrink the type a step once the amount reaches
// the thousands (e.g. "1.010,94") so it never wraps past the euro sign.
const priceSizeClass = computed(() =>
    formattedTotal.value.length >= 8 ? 'text-5xl md:text-6xl' : 'text-6xl md:text-7xl',
);

const formattedOrders = computed(() => {
    return new Intl.NumberFormat(t.value.numberLocale).format(orders.value);
});

const ordersLabel = computed(() => {
    if (isMaxOrders.value) {
        return t.value.ordersMax;
    }

    return formattedOrders.value;
});

const volumeSentence = computed(() => t.value.volumeLine.replace('{n}', ordersLabel.value));

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

watch(orderSliderValue, (newValue) => {
    const orderCount = sliderPositionToOrders(newValue);
    const idealPosition = ordersToSliderPosition(orderCount);
    if (newValue !== idealPosition) {
        orderSliderValue.value = idealPosition;
    }
}, { flush: 'sync' });
</script>

<template>
    <section class="py-8 md:py-16">
        <div class="container-prose">
            <div class="relative mx-auto max-w-2xl overflow-hidden bg-paper dark:bg-charcoal rounded-2xl ring-1 ring-chalk-dark dark:ring-flint shadow-[0_24px_70px_-42px_rgba(25,25,25,0.4)] px-6 py-10 md:px-12 md:py-14">
                <!-- Warm dial-glow behind the price: the sunstone accent that also
                     fills the slider, so the control and the payoff read as one thing. -->
                <div
                    class="pointer-events-none absolute inset-x-0 -top-16 h-56 bg-[radial-gradient(ellipse_at_top,var(--color-sunstone-mist),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(250,237,213,0.07),transparent_70%)]"
                    aria-hidden="true"
                ></div>

                <div class="relative text-center">
                    <p class="eyebrow mb-6">{{ t.eyebrow }}</p>

                    <div class="flex items-baseline justify-center gap-2">
                        <span
                            class="font-semibold tabular-nums tracking-tight leading-none whitespace-nowrap text-charcoal dark:text-paper"
                            :class="priceSizeClass"
                        >
                            &euro; {{ formattedTotal }}
                        </span>
                        <span class="text-lg text-steel dark:text-gravel">{{ t.perMonth }}</span>
                    </div>
                    <p class="mt-3 text-sm text-steel dark:text-gravel">{{ volumeSentence }}</p>
                </div>

                <div class="relative mt-10 md:mt-12">
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

                    <div class="relative h-1.5 mt-1 mx-[11px] max-sm:hidden">
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
                            class="absolute top-0 -translate-x-1/2 max-sm:hidden"
                            :style="{ left: `${tick.percent}%` }"
                        >
                            {{ t.tickOrders[i] }}
                        </span>
                        <span class="absolute right-0 top-0">100k+</span>
                    </div>
                </div>

                <ul class="relative mt-10 pt-8 border-t border-chalk-dark dark:border-flint grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    <li
                        v-for="perk in t.perks"
                        :key="perk"
                        class="flex items-start gap-2.5 text-sm text-steel dark:text-gravel"
                    >
                        <i class="fa-solid fa-check text-sunstone-deep text-xs mt-1" aria-hidden="true"></i>
                        <span>{{ perk }}</span>
                    </li>
                </ul>

                <div
                    v-if="isMaxOrders"
                    class="relative mt-8 rounded-xl bg-sunstone-mist/50 dark:bg-sunstone/10 ring-1 ring-sunstone-soft/50 dark:ring-sunstone/30 p-4 text-sm leading-relaxed text-center text-steel dark:text-gravel"
                >
                    {{ t.salesNotice }}
                    <a
                        :href="contactHref"
                        class="font-semibold text-sunstone-deep hover:text-charcoal dark:hover:text-paper transition-colors"
                    >
                        {{ t.contactSales }}
                    </a>
                </div>

                <div class="relative mt-10 flex flex-col items-center gap-4">
                    <a
                        :href="externalLinks.register"
                        class="btn btn-sunstone text-base w-full sm:w-auto justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ t.startTrial }}
                        <i class="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                    </a>
                    <p class="text-xs text-steel dark:text-gravel text-center max-w-sm">{{ t.payg }}</p>
                    <a
                        :href="externalLinks.demoBooking"
                        class="text-sm text-steel dark:text-gravel hover:text-charcoal dark:hover:text-paper transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ t.preferDemo }}
                    </a>
                </div>
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
    /* Horizontal drag moves the thumb; vertical swipes still scroll the page.
       Without this the browser treats a sideways drag as a scroll/swipe gesture
       and the page jumps on mobile. */
    touch-action: pan-y;
}

.pricing-range:focus {
    outline: none;
}

/* The filled part of the track uses the sunstone accent (the same warm tone as
   the price glow and the CTA), so dragging visibly "charges" the price. */
.pricing-range::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 9999px;
    background: linear-gradient(
        to right,
        var(--color-sunstone-deep) 0%,
        var(--color-sunstone-deep) var(--progress, 0%),
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
    background-color: var(--color-sunstone-deep);
}

.pricing-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    margin-top: -8px;
    border-radius: 9999px;
    background-color: var(--color-paper);
    border: 2px solid var(--color-sunstone-deep);
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
    border: 2px solid var(--color-sunstone-deep);
    box-shadow: 0 1px 4px rgba(25, 25, 25, 0.18);
    transition: transform 0.15s ease;
}

.pricing-range::-moz-range-thumb:hover {
    transform: scale(1.08);
}

.pricing-range:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone-soft);
}

.pricing-range:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone-soft);
}
</style>

<style>
/* Dark mode (UNSCOPED so the `.dark` class on <html>, outside this component,
   matches). The unfilled track goes to flint; the filled part keeps the sunstone
   accent, and the knob is paper with a sunstone ring so it stays visible. */
.dark .pricing-range::-webkit-slider-runnable-track {
    background: linear-gradient(
        to right,
        var(--color-sunstone-deep) 0%,
        var(--color-sunstone-deep) var(--progress, 0%),
        var(--color-flint) var(--progress, 0%),
        var(--color-flint) 100%
    );
}

.dark .pricing-range::-moz-range-track {
    background: var(--color-flint);
}

.dark .pricing-range::-moz-range-progress {
    background-color: var(--color-sunstone-deep);
}

.dark .pricing-range::-webkit-slider-thumb {
    background-color: var(--color-paper);
    border-color: var(--color-sunstone-deep);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.dark .pricing-range::-moz-range-thumb {
    background-color: var(--color-paper);
    border-color: var(--color-sunstone-deep);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.dark .pricing-range:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone);
}

.dark .pricing-range:focus-visible::-moz-range-thumb {
    box-shadow: 0 0 0 4px var(--color-sunstone);
}
</style>
