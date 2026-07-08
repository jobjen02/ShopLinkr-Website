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
const PER_MONTH_MAX = PER_DAY_MAX * DAYS_PER_MONTH; // 45.000
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

// Per-month equivalent: snaps to nice MONTHLY steps so dragging lands on round monthly
// figures (e.g. 500), instead of multiples of 30 you get by snapping orders/day.
function sliderPositionToMonthly(position: number): number {
    if (position <= 0) {
        return 0;
    }
    if (position >= SLIDER_MAX) {
        return PER_MONTH_MAX;
    }

    const raw = Math.pow(position / SLIDER_MAX, CURVE_POWER) * PER_MONTH_MAX;

    let precision: number;
    if (raw < 1000) {
        precision = 50;
    } else if (raw < 3000) {
        precision = 100;
    } else if (raw < 10000) {
        precision = 250;
    } else if (raw < 30000) {
        precision = 500;
    } else {
        precision = 1000;
    }

    return Math.max(0, Math.round(raw / precision) * precision);
}

// Tick values differ per unit: orders/day in per-day mode, round monthly figures in
// per-month mode. Their slider position is computed from the per-day equivalent.
const DAY_TICKS = [10, 50, 100, 250, 500, 1000];
const MONTH_TICKS = [500, 2500, 5000, 10000, 15000, 30000];

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

// The number is always stored as orders/day (the canonical source). A toggle only
// changes the DISPLAYED unit: per day, or per month (= day * 30). Default: per day.
type Unit = 'day' | 'month';
const unit = ref<Unit>('day');
const isDay = computed(() => unit.value === 'day');

const sliderPos = computed(() => perDayToSliderPosition(perDay.value));
const isMax = computed(() => perDay.value >= PER_DAY_MAX);
const monthly = computed(() => perDay.value * DAYS_PER_MONTH);

// Displayed number is rounded (day: orders/day, month: orders/month). Stored perDay
// may be fractional after clicking a round monthly tick, so the month figure lands exact.
const displayValue = computed(() => (isDay.value ? Math.round(perDay.value) : Math.round(monthly.value)));
const displayMax = computed(() => (isDay.value ? PER_DAY_MAX : PER_MONTH_MAX));

const tickPositions = computed(() =>
    (isDay.value ? DAY_TICKS : MONTH_TICKS).map((value) => {
        const pd = isDay.value ? value : value / DAYS_PER_MONTH;
        return { pd, percent: (perDayToSliderPosition(pd) / SLIDER_MAX) * 100 };
    }),
);

// A tick click sets the exact value (no per-day rounding), so a round monthly tick
// like 500 shows 500 rather than snapping to 510.
const setTick = (pd: number) => {
    perDay.value = Math.max(0, Math.min(PER_DAY_MAX, pd));
};

// Ticks at or below the current value are highlighted (as if hovered); hovering a
// label lights up that tick (label + mark) too.
const hoveredTick = ref<number | null>(null);
const tickActive = (pd: number, i: number) => perDay.value >= pd || hoveredTick.value === i;

const setPerDay = (n: number) => {
    perDay.value = Math.max(0, Math.min(PER_DAY_MAX, Math.round(n)));
};

// Dragging snaps to a nearby "nice" step; typing/clicking a tick is exact.
const onSlider = (event: Event) => {
    const pos = Number((event.target as HTMLInputElement).value);
    // Snap in the currently displayed unit: orders/day, or round monthly figures.
    perDay.value = isDay.value
        ? sliderPositionToPerDay(pos)
        : sliderPositionToMonthly(pos) / DAYS_PER_MONTH;
};

// Typable value field: click the number to enter an exact orders/day count.
const editing = ref(false);
const draft = ref('');

const startEdit = (event: FocusEvent) => {
    editing.value = true;
    draft.value = String(displayValue.value);
    (event.target as HTMLInputElement).select();
};

const onType = (event: Event) => {
    const raw = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
    const n = raw === '' ? 0 : Math.min(displayMax.value, parseInt(raw, 10));
    draft.value = raw === '' ? '' : String(n);
    // Store as orders/day; in month mode convert the typed monthly figure back exactly.
    perDay.value = isDay.value ? n : n / DAYS_PER_MONTH;
};

const endEdit = () => {
    editing.value = false;
};

const confirmEdit = (event: KeyboardEvent) => {
    (event.target as HTMLInputElement).blur();
};

const setUnit = (u: Unit) => {
    unit.value = u;
    editing.value = false;
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

const formattedDisplay = computed(() => new Intl.NumberFormat(t.value.numberLocale).format(displayValue.value));

const maxLabel = computed(() => (isDay.value ? t.value.ordersMax : t.value.ordersMaxMonth));
const displayLabel = computed(() => (isMax.value ? maxLabel.value : formattedDisplay.value));

const tickLabels = computed(() => (isDay.value ? t.value.tickOrders : t.value.tickOrdersMonth));

const unitWord = computed(() => (isDay.value ? t.value.toggleDay : t.value.toggleMonth).toLowerCase());
const fieldAria = computed(() => `${t.value.ordersLabel} (${unitWord.value})`);
const sliderAria = computed(() => `${displayLabel.value} ${unitWord.value}`);

// The secondary line shows the OTHER unit, so both are always visible: in per-day
// mode it shows the monthly figure, in per-month mode the per-day figure.
const volumeSentence = computed(() => {
    if (isDay.value) {
        const n = new Intl.NumberFormat(t.value.numberLocale).format(Math.round(monthly.value));
        return t.value.volumeLine.replace('{n}', n);
    }
    const n = new Intl.NumberFormat(t.value.numberLocale).format(Math.round(perDay.value));
    return t.value.volumeLinePerDay.replace('{n}', n);
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
                    <div class="mb-4">
                        <div class="flex items-center justify-between gap-3">
                            <label for="orders-input" class="cursor-text text-sm font-semibold text-charcoal dark:text-paper">
                                {{ t.ordersLabel }}
                            </label>
                            <span class="group relative inline-block">
                                <i class="fa-solid fa-pen pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[0.7rem] text-gravel opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden="true"></i>
                                <input
                                    type="text"
                                    inputmode="numeric"
                                    :value="editing ? draft : displayLabel"
                                    @focus="startEdit"
                                    @input="onType"
                                    @blur="endEdit"
                                    @keydown.enter="confirmEdit"
                                    :aria-label="fieldAria"
                                    class="w-28 border-b border-dashed border-transparent bg-transparent pl-6 pr-1 py-0.5 text-right text-base font-semibold text-charcoal dark:text-paper tabular-nums cursor-text transition-[border-color] duration-200 hover:border-steel focus:border-sunstone-deep focus:outline-none"
                                />
                            </span>
                        </div>
                        <div class="mt-3 inline-flex rounded-full bg-chalk-light dark:bg-graphite p-0.5 ring-1 ring-chalk-dark dark:ring-flint text-xs font-semibold" role="group" :aria-label="t.ordersLabel">
                            <button
                                type="button"
                                @click="setUnit('day')"
                                :aria-pressed="isDay"
                                class="cursor-pointer rounded-full px-3 py-1 transition-colors"
                                :class="isDay ? 'bg-paper dark:bg-charcoal text-charcoal dark:text-paper shadow-[0_1px_3px_rgba(25,25,25,0.12)]' : 'text-steel dark:text-gravel hover:text-charcoal dark:hover:text-paper'"
                            >
                                {{ t.toggleDay }}
                            </button>
                            <button
                                type="button"
                                @click="setUnit('month')"
                                :aria-pressed="!isDay"
                                class="cursor-pointer rounded-full px-3 py-1 transition-colors"
                                :class="!isDay ? 'bg-paper dark:bg-charcoal text-charcoal dark:text-paper shadow-[0_1px_3px_rgba(25,25,25,0.12)]' : 'text-steel dark:text-gravel hover:text-charcoal dark:hover:text-paper'"
                            >
                                {{ t.toggleMonth }}
                            </button>
                        </div>
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
                        :aria-valuetext="sliderAria"
                        :style="{
                            '--progress': `${(sliderPos / SLIDER_MAX) * 100}%`,
                        }"
                    />

                    <div class="relative h-1.5 mt-1 mx-[11px] max-sm:hidden">
                        <span
                            v-for="(tick, i) in tickPositions"
                            :key="`mark-${i}`"
                            class="absolute top-0 w-px h-1.5 -translate-x-1/2 transition-colors"
                            :class="tickActive(tick.pd, i) ? 'bg-charcoal dark:bg-paper' : 'bg-chalk-darker dark:bg-flint'"
                            :style="{ left: `${tick.percent}%` }"
                            aria-hidden="true"
                        ></span>
                    </div>

                    <div class="relative text-xs text-gravel mt-1 tabular-nums h-4 mx-[11px]">
                        <button
                            type="button"
                            @click="setPerDay(0)"
                            class="absolute left-0 top-0 -translate-x-1/2 cursor-pointer transition-colors text-charcoal dark:text-paper"
                        >
                            0
                        </button>
                        <button
                            v-for="(tick, i) in tickPositions"
                            :key="`label-${i}`"
                            type="button"
                            @click="setTick(tick.pd)"
                            @mouseenter="hoveredTick = i"
                            @mouseleave="hoveredTick = null"
                            class="absolute top-0 -translate-x-1/2 cursor-pointer transition-colors max-sm:hidden"
                            :class="tickActive(tick.pd, i) ? 'text-charcoal dark:text-paper' : 'text-gravel'"
                            :style="{ left: `${tick.percent}%` }"
                        >
                            {{ tickLabels[i] }}
                        </button>
                        <button
                            type="button"
                            @click="setPerDay(PER_DAY_MAX)"
                            class="absolute right-0 top-0 translate-x-1/2 cursor-pointer transition-colors"
                            :class="perDay >= PER_DAY_MAX ? 'text-charcoal dark:text-paper' : 'text-gravel hover:text-charcoal dark:hover:text-paper'"
                        >
                            {{ maxLabel }}
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
