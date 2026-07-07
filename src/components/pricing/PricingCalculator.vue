<script setup lang="ts">
import { computed, ref } from 'vue';
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

// The input is orders PER DAY (how a webshop owner thinks). The monthly figure and
// the price are derived from it (day * 30). The staffel below stays in monthly
// orders, so we convert once. A EUR 10/month minimum applies at low volume.
const MIN_PRICE = 10;
const DAYS_PER_MONTH = 30;
const PER_DAY_MAX = 1500; // ~45.000 orders/month
const SLIDER_MAX = 1000;
const CURVE_POWER = 2;

function perDayToSliderPosition(perDay: number): number {
    if (perDay <= 0) {
        return 0;
    }
    if (perDay >= PER_DAY_MAX) {
        return SLIDER_MAX;
    }
    return Math.round(Math.pow(perDay / PER_DAY_MAX, 1 / CURVE_POWER) * SLIDER_MAX);
}

function sliderPositionToPerDay(position: number): number {
    if (position <= 0) {
        return 0;
    }
    if (position >= SLIDER_MAX) {
        return PER_DAY_MAX;
    }

    const raw = Math.pow(position / SLIDER_MAX, CURVE_POWER) * PER_DAY_MAX;

    let precision: number;
    if (raw < 30) {
        precision = 1;
    } else if (raw < 100) {
        precision = 5;
    } else if (raw < 300) {
        precision = 10;
    } else if (raw < 1000) {
        precision = 25;
    } else {
        precision = 50;
    }

    return Math.max(0, Math.round(raw / precision) * precision);
}

const DAY_TICKS = [
    { value: 10 },
    { value: 50 },
    { value: 100 },
    { value: 250 },
    { value: 500 },
    { value: 1000 },
];

const dayTickPositions = DAY_TICKS.map((tick) => {
    return {
        ...tick,
        percent: (perDayToSliderPosition(tick.value) / SLIDER_MAX) * 100,
    };
});

// Monthly staffel (unchanged): the price is computed on orders per month.
const ORDER_TIERS: Array<OrderTier> = [
    { min: 0, max: 250, pricePerOrder: 0.26 },
    { min: 250, max: 500, pricePerOrder: 0.17 },
    { min: 500, max: 1000, pricePerOrder: 0.13 },
    { min: 1000, max: 2500, pricePerOrder: 0.095 },
    { min: 2500, max: 5000, pricePerOrder: 0.066 },
    { min: 5000, max: 10000, pricePerOrder: 0.048 },
    { min: 10000, max: 20000, pricePerOrder: 0.045 },
    { min: 20000, max: null, pricePerOrder: 0.04 },
];

const perDay = ref(10);

const sliderPos = computed(() => perDayToSliderPosition(perDay.value));
const isMax = computed(() => perDay.value >= PER_DAY_MAX);
const monthly = computed(() => perDay.value * DAYS_PER_MONTH);

const setPerDay = (n: number) => {
    perDay.value = Math.max(0, Math.min(PER_DAY_MAX, Math.round(n)));
};

// Dragging snaps to a nearby "nice" step; typing/clicking a tick is exact.
const onSlider = (event: Event) => {
    perDay.value = sliderPositionToPerDay(Number((event.target as HTMLInputElement).value));
};

// Typable value field: click the number to enter an exact orders/day count.
const editing = ref(false);
const draft = ref('');

const startEdit = (event: FocusEvent) => {
    editing.value = true;
    draft.value = String(perDay.value);
    (event.target as HTMLInputElement).select();
};

const onType = (event: Event) => {
    const raw = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
    const n = raw === '' ? 0 : Math.min(PER_DAY_MAX, parseInt(raw, 10));
    draft.value = raw === '' ? '' : String(n);
    perDay.value = n;
};

const endEdit = () => {
    editing.value = false;
};

const confirmEdit = (event: KeyboardEvent) => {
    (event.target as HTMLInputElement).blur();
};

const orderCost = computed(() => {
    const totalOrders = monthly.value;
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
    // Whole euros only: the calculator is indicative, a round number reads cleaner.
    return new Intl.NumberFormat(t.value.numberLocale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(totalPrice.value);
});

const priceSizeClass = computed(() =>
    formattedTotal.value.length >= 8 ? 'text-5xl md:text-6xl' : 'text-6xl md:text-7xl',
);

const formattedPerDay = computed(() => new Intl.NumberFormat(t.value.numberLocale).format(perDay.value));

const perDayLabel = computed(() => (isMax.value ? t.value.ordersMax : formattedPerDay.value));

const perDayAria = computed(() => {
    if (isMax.value) {
        return t.value.ordersAriaMax;
    }
    if (perDay.value === 0) {
        return t.value.ordersAriaZero;
    }
    if (perDay.value === 1) {
        return t.value.ordersAriaOne;
    }
    return t.value.ordersAriaMany.replace('{n}', formattedPerDay.value);
});

// ~ orders per month, derived from the per-day figure.
const volumeSentence = computed(() => {
    const n = new Intl.NumberFormat(t.value.numberLocale).format(monthly.value);
    return t.value.volumeLine.replace('{n}', n);
});

</script>

<template>
    <section class="py-8 md:py-16">
        <div class="container-prose">
            <div class="relative mx-auto max-w-2xl overflow-hidden bg-paper dark:bg-charcoal rounded-2xl ring-1 ring-chalk-dark dark:ring-flint shadow-[0_24px_70px_-42px_rgba(25,25,25,0.4)] px-6 py-10 md:px-12 md:py-14">
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
                    <div class="flex items-center justify-between mb-4">
                        <label for="orders-input" class="text-sm font-semibold text-charcoal dark:text-paper">
                            {{ t.ordersLabel }}
                        </label>
                        <span class="group relative inline-block">
                            <i class="fa-solid fa-pen pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[0.7rem] text-gravel opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden="true"></i>
                            <input
                                type="text"
                                inputmode="numeric"
                                :value="editing ? draft : perDayLabel"
                                @focus="startEdit"
                                @input="onType"
                                @blur="endEdit"
                                @keydown.enter="confirmEdit"
                                :aria-label="t.ordersLabel"
                                class="w-28 border-b border-dashed border-transparent bg-transparent pl-6 pr-1 py-0.5 text-right text-base font-semibold text-charcoal dark:text-paper tabular-nums cursor-text transition-[border-color] duration-200 hover:border-steel focus:border-sunstone-deep focus:outline-none"
                            />
                        </span>
                    </div>

                    <input
                        id="orders-input"
                        :value="sliderPos"
                        @input="onSlider"
                        type="range"
                        min="0"
                        :max="SLIDER_MAX"
                        step="1"
                        class="pricing-range w-full"
                        :aria-valuetext="perDayAria"
                        :style="{
                            '--progress': `${(sliderPos / SLIDER_MAX) * 100}%`,
                        }"
                    />

                    <div class="relative h-1.5 mt-1 mx-[11px] max-sm:hidden">
                        <span
                            v-for="tick in dayTickPositions"
                            :key="`mark-${tick.value}`"
                            class="absolute top-0 w-px h-1.5 bg-chalk-darker dark:bg-flint"
                            :style="{ left: `${tick.percent}%` }"
                            aria-hidden="true"
                        ></span>
                    </div>

                    <div class="relative text-xs text-gravel mt-1 tabular-nums h-4 mx-[11px]">
                        <button
                            type="button"
                            @click="setPerDay(0)"
                            class="absolute left-0 top-0 cursor-pointer transition-colors hover:text-charcoal dark:hover:text-paper"
                        >
                            0
                        </button>
                        <button
                            v-for="(tick, i) in dayTickPositions"
                            :key="`label-${tick.value}`"
                            type="button"
                            @click="setPerDay(tick.value)"
                            class="absolute top-0 -translate-x-1/2 cursor-pointer transition-colors hover:text-charcoal dark:hover:text-paper max-sm:hidden"
                            :style="{ left: `${tick.percent}%` }"
                        >
                            {{ t.tickOrders[i] }}
                        </button>
                        <button
                            type="button"
                            @click="setPerDay(PER_DAY_MAX)"
                            class="absolute right-0 top-0 cursor-pointer transition-colors hover:text-charcoal dark:hover:text-paper"
                        >
                            {{ t.ordersMax }}
                        </button>
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
                    v-if="isMax"
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
    touch-action: pan-y;
}

.pricing-range:focus {
    outline: none;
}

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
