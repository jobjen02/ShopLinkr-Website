<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const channels = [
    { key: 'bol', name: 'Bol', logo: '/assets/marketplaces/bol.jpeg' },
    { key: 'shopify', name: 'Shopify', logo: '/assets/webshops/Shopify.jpg' },
    { key: 'woo', name: 'WooCommerce', logo: '/assets/webshops/WooCommerce.png' },
    { key: 'kaufland', name: 'Kaufland', logo: '/assets/marketplaces/kaufland.jpg' },
];

const steps = ['Besteld', 'Gepikt', 'Ingepakt', 'Verzonden'];

const done = ref(0); // completed steps (0..5)
const stock = ref(10);
const synced = ref(false);
const stockShown = ref(false);
const scanShown = ref(false);
const labelShown = ref(false);
const ttShown = ref(false);
const paused = ref(false);
const reduced = ref(false);
const visible = ref(true); // whole card fade for a clean loop restart
const instant = ref(false); // kill child transitions during the reset snap

const fillWidth = computed(() => {
    const segs = Math.max(0, done.value - 1);
    return `${(segs / (steps.length - 1)) * 100}%`;
});

const reset = () => {
    done.value = 0;
    stock.value = 10;
    synced.value = false;
    stockShown.value = false;
    scanShown.value = false;
    labelShown.value = false;
    ttShown.value = false;
};

const settle = () => {
    done.value = 4;
    stock.value = 9;
    synced.value = true;
    stockShown.value = true;
    labelShown.value = true;
    ttShown.value = true;
    visible.value = true;
};

// Each beat waits `dur` ms (from the previous beat) then runs `fn`. The runner
// loops forever and can freeze/continue in place on pause.
const seq: Array<{ dur: number; fn: () => void }> = [
    { dur: 350, fn: () => (done.value = 1) }, // Besteld
    { dur: 1150, fn: () => (stockShown.value = true) },
    { dur: 700, fn: () => { stock.value = 9; synced.value = true; } },
    { dur: 1300, fn: () => (scanShown.value = true) }, // barcode gescand op locatie
    { dur: 400, fn: () => (done.value = 2) }, // Gepikt
    { dur: 1400, fn: () => (scanShown.value = false) },
    { dur: 600, fn: () => (done.value = 3) }, // Ingepakt
    { dur: 400, fn: () => (labelShown.value = true) }, // PostNL-label klaar
    { dur: 1500, fn: () => { done.value = 4; ttShown.value = true; } }, // Verzonden + T&T
    { dur: 4000, fn: () => (visible.value = false) }, // hold, dan fade out
    { dur: 600, fn: () => { instant.value = true; reset(); } }, // snap-reset onzichtbaar
    { dur: 150, fn: () => { instant.value = false; visible.value = true; } }, // fade in, loop
];

let idx = 0;
let stepTimer: number | undefined;
let stepStart = 0;
let stepRemaining = 0;

const now = () => (typeof performance !== 'undefined' ? performance.now() : 0);

const runFrom = (wait: number) => {
    stepStart = now();
    stepRemaining = wait;
    stepTimer = window.setTimeout(() => {
        seq[idx].fn();
        idx = (idx + 1) % seq.length;
        runFrom(seq[idx].dur);
    }, wait);
};

const startLoop = () => {
    window.clearTimeout(stepTimer);
    reset();
    visible.value = true;
    idx = 0;
    runFrom(seq[0].dur);
};

const pauseAnim = () => {
    if (paused.value || reduced.value) {
        return;
    }
    paused.value = true;
    window.clearTimeout(stepTimer);
    stepRemaining = Math.max(0, stepRemaining - (now() - stepStart));
    // Never freeze on the invisible loop-transition: snap to the finished frame.
    if (!visible.value) {
        settle();
    }
};

const resumeAnim = () => {
    if (!paused.value || reduced.value) {
        return;
    }
    paused.value = false;
    runFrom(stepRemaining);
};

const togglePause = () => {
    if (paused.value) {
        resumeAnim();
    } else {
        pauseAnim();
    }
};

onMounted(() => {
    const prefersReduced =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        reduced.value = true;
        settle();
        return;
    }
    startLoop();
});

onUnmounted(() => window.clearTimeout(stepTimer));
</script>

<template>
    <div
        class="relative mx-auto w-full max-w-[30rem] pt-10 pb-16 transition-opacity duration-500 ease-out"
        :class="[visible ? 'opacity-100' : 'opacity-0', instant ? '[&_*]:!transition-none' : '']"
    >
        <!-- Pause / play toggle -->
        <button
            v-if="!reduced"
            type="button"
            @click="togglePause"
            :aria-label="paused ? 'Animatie afspelen' : 'Animatie pauzeren'"
            class="absolute top-1 left-1 z-40 h-7 w-7 rounded-full bg-paper/90 backdrop-blur ring-1 ring-chalk-dark text-gravel hover:text-charcoal hover:ring-chalk-darker flex items-center justify-center transition-colors"
        >
            <svg v-if="paused" viewBox="0 0 12 12" class="h-3 w-3 ml-0.5" aria-hidden="true">
                <path d="M3,2 L10,6 L3,10 Z" fill="currentColor" />
            </svg>
            <svg v-else viewBox="0 0 12 12" class="h-3 w-3" aria-hidden="true">
                <rect x="3" y="2.5" width="2.1" height="7" rx="0.6" fill="currentColor" />
                <rect x="6.9" y="2.5" width="2.1" height="7" rx="0.6" fill="currentColor" />
            </svg>
        </button>

        <!-- Main order card -->
        <div class="relative z-10 bg-paper rounded-2xl ring-1 ring-chalk-dark shadow-[0_18px_50px_-28px_rgba(25,25,25,0.22)] px-6 py-6">
            <div class="flex items-center gap-3">
                <span class="h-11 w-11 rounded-xl bg-paper ring-1 ring-chalk-dark flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="/assets/marketplaces/bol.jpeg" alt="Bol" class="h-7 w-7 object-contain" />
                </span>
                <div class="min-w-0">
                    <p class="text-[0.95rem] font-semibold text-charcoal leading-tight">Bestelling #1042</p>
                    <p class="text-xs text-gravel">via Bol</p>
                </div>
            </div>

            <div class="my-5 border-t border-chalk-dark"></div>

            <div class="flex items-center gap-3.5">
                <span class="h-14 w-14 rounded-xl bg-chalk-light ring-1 ring-chalk-dark flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="/products/omega_3.png" alt="Omega 3 capsules" class="h-11 w-11 object-contain" />
                </span>
                <div>
                    <p class="text-sm font-semibold text-charcoal">Omega 3 capsules</p>
                    <p class="text-xs text-gravel mt-0.5">SUP-OMG3-120 · 1 stuk</p>
                </div>
            </div>

            <!-- Steps -->
            <div class="relative mt-7">
                <div class="absolute top-[10px] left-[10px] right-[10px] h-0.5 bg-chalk-dark"></div>
                <div
                    class="absolute top-[10px] left-[10px] h-0.5 bg-green transition-[width] duration-700 ease-out"
                    :style="{ width: fillWidth }"
                ></div>
                <div class="relative flex justify-between">
                    <div v-for="(label, i) in steps" :key="label" class="flex flex-col items-center gap-2">
                        <span
                            class="h-5 w-5 rounded-full flex items-center justify-center transition-colors duration-300 border-[1.5px]"
                            :class="i < done ? 'bg-green border-green' : 'bg-paper border-chalk-darker'"
                        >
                            <svg v-if="i < done" viewBox="0 0 12 12" class="h-2.5 w-2.5" aria-hidden="true">
                                <path d="M2.5,6 l2.2,2.2 l4.2,-4.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span
                            class="text-[0.66rem] transition-colors duration-300"
                            :class="i < done ? 'text-steel font-semibold' : 'text-gravel'"
                        >{{ label }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating: stock chip -->
        <div
            class="absolute top-0 right-1 z-20 w-[12.5rem] bg-paper rounded-xl ring-1 ring-chalk-dark shadow-[0_16px_36px_-22px_rgba(25,25,25,0.28)] px-4 py-3 transition-all duration-500 ease-out"
            :class="stockShown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'"
        >
            <p class="text-[0.6rem] font-semibold tracking-[0.14em] text-gravel uppercase">Voorraad</p>
            <div class="flex items-center gap-2 mt-0.5">
                <span :key="stock" class="hero-pop text-3xl font-bold text-charcoal tabular-nums leading-none">{{ stock }}</span>
                <span
                    class="inline-flex items-center gap-1 px-2 h-5 rounded-full bg-green-mist text-[#15803d] text-[0.62rem] font-semibold transition-opacity duration-300"
                    :class="synced ? 'opacity-100' : 'opacity-0'"
                >
                    <span class="h-1.5 w-1.5 rounded-full bg-green"></span>
                    Overal gelijk
                </span>
            </div>
            <div class="flex items-center gap-1.5 mt-2.5">
                <span
                    v-for="ch in channels"
                    :key="ch.key"
                    class="h-5 w-5 rounded-md bg-paper ring-1 ring-chalk-dark flex items-center justify-center overflow-hidden"
                >
                    <img :src="ch.logo" :alt="ch.name" class="h-3.5 w-3.5 object-contain" />
                </span>
            </div>
        </div>

        <!-- Floating: scan chip (verschijnt bij Gepikt) -->
        <div
            class="absolute bottom-0 left-0 z-30 w-[13rem] bg-paper rounded-xl ring-1 ring-chalk-dark shadow-[0_16px_36px_-22px_rgba(25,25,25,0.28)] px-4 py-3 transition-all duration-500 ease-out"
            :class="scanShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'"
        >
            <div class="flex items-center gap-2.5">
                <span class="h-9 w-9 rounded-lg bg-sunstone-mist flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 22 22" class="h-5 w-5" aria-hidden="true">
                        <g fill="none" stroke="#d49d5e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2,6 V3.5 A1.5,1.5 0 0 1 3.5,2 H6" />
                            <path d="M16,2 H18.5 A1.5,1.5 0 0 1 20,3.5 V6" />
                            <path d="M20,16 V18.5 A1.5,1.5 0 0 1 18.5,20 H16" />
                            <path d="M6,20 H3.5 A1.5,1.5 0 0 1 2,18.5 V16" />
                        </g>
                        <g stroke="#191919" stroke-width="1.3">
                            <path d="M7,7.5 V14.5 M9.4,7.5 V14.5 M11.8,7.5 V14.5 M14.2,7.5 V14.5" />
                        </g>
                    </svg>
                </span>
                <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                        <p class="text-[0.82rem] font-semibold text-charcoal leading-tight">Gescand</p>
                        <span class="h-4 w-4 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 12 12" class="h-2.5 w-2.5" aria-hidden="true">
                                <path d="M2.5,6 l2.2,2.2 l4.2,-4.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <p class="text-[0.68rem] text-gravel mt-0.5">
                        Locatie <span class="font-semibold text-charcoal tabular-nums">A.1.4</span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Floating: label chip -->
        <div
            class="absolute bottom-0 left-0 z-20 w-[13.5rem] bg-paper rounded-xl ring-1 ring-chalk-dark shadow-[0_16px_36px_-22px_rgba(25,25,25,0.28)] px-4 py-3 transition-all duration-500 ease-out"
            :class="labelShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'"
        >
            <div class="flex items-center gap-2.5">
                <span class="h-9 w-9 rounded-lg bg-sunstone-mist flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 22 22" class="h-5 w-5" aria-hidden="true">
                        <path d="M5,7 V2 H17 V7" fill="none" stroke="#d49d5e" stroke-width="1.7" stroke-linejoin="round" />
                        <rect x="1.5" y="7" width="19" height="9" rx="2" fill="none" stroke="#d49d5e" stroke-width="1.7" />
                        <rect x="5.5" y="13" width="11" height="7" rx="1.3" fill="#fff" stroke="#d49d5e" stroke-width="1.7" />
                    </svg>
                </span>
                <div class="min-w-0">
                    <p class="text-[0.82rem] font-semibold text-charcoal leading-tight">Label klaar</p>
                    <p class="text-[0.64rem] text-gravel whitespace-nowrap">PostNL · 3SABCD1234567</p>
                </div>
            </div>
            <div class="flex items-end gap-[1.5px] h-4 mt-2">
                <span
                    v-for="(w, i) in [2,1,3,1,2,3,1,2,1,3,2,1,3,1,2,2,1,3,1,2,1,3,2,1]"
                    :key="i"
                    class="bg-charcoal"
                    :style="{ width: `${w}px`, height: '100%', opacity: i % 2 === 0 ? 1 : 0 }"
                ></span>
            </div>
        </div>

        <!-- Floating: track & trace chip -->
        <div
            class="absolute bottom-0 right-2 z-20 inline-flex items-center gap-2 bg-paper rounded-full ring-1 ring-chalk-dark shadow-[0_14px_30px_-20px_rgba(25,25,25,0.28)] pl-2 pr-3 py-1.5 transition-all duration-500 ease-out"
            :class="ttShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'"
        >
            <span class="h-6 w-6 rounded-md bg-paper ring-1 ring-chalk-dark flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src="/assets/marketplaces/bol.jpeg" alt="Bol" class="h-4 w-4 object-contain" />
            </span>
            <span class="text-[0.72rem] font-semibold text-charcoal leading-none">Track &amp; trace naar Bol</span>
            <span class="h-4 w-4 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 12 12" class="h-2.5 w-2.5" aria-hidden="true">
                    <path d="M2.5,6 l2.2,2.2 l4.2,-4.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </span>
        </div>
    </div>
</template>

<style scoped>
.hero-pop {
    animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop {
    0% {
        transform: translateY(4px) scale(0.8);
        opacity: 0;
    }
    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-pop {
        animation: none;
    }
}
</style>
