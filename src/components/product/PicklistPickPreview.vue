<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

interface PickItem {
    product: string;
    sku: string;
    location: string;
    quantity: number;
    image: string;
}

const items: Array<PickItem> = [
    {
        product: 'Omega 3 capsules',
        sku: 'SUP-OMG3-120',
        location: 'A.1.1',
        quantity: 1,
        image: '/products/omega_3.png',
    },
    {
        product: 'Magnesium tabletten',
        sku: 'SUP-MGT-90',
        location: 'A.1.2',
        quantity: 5,
        image: '/products/magnesium_tauraat.png',
    },
    {
        product: 'Vitamine D3',
        sku: 'SUP-VD3-60',
        location: 'A.2.1',
        quantity: 2,
        image: '/products/vitamin_d3.png',
    },
    {
        product: 'Vitamine bundel',
        sku: 'SUP-BNDL-04',
        location: 'A.3.1',
        quantity: 4,
        image: '/products/vitamin_bundle.jpeg',
    },
    {
        product: 'Vogelvoer 1 kg',
        sku: 'BIRD-1000',
        location: 'B.1.1',
        quantity: 3,
        image: '/products/bird-food-1kg.png',
    },
    {
        product: 'Vogelvoer 500 gram',
        sku: 'BIRD-500',
        location: 'B.1.2',
        quantity: 2,
        image: '/products/bird-food-500g.png',
    },
];

const currentIndex = ref(0);
const currentPicked = ref(0);
const animating = ref(false);

const currentItem = computed(() => items[currentIndex.value]);
const totalItems = computed(() => items.length);
const completedItems = computed(() => currentIndex.value);
const progressPercent = computed(
    () => (completedItems.value / totalItems.value) * 100,
);
const isComplete = computed(() => currentIndex.value >= items.length);

const advanceToNext = () => {
    animating.value = true;
    window.setTimeout(() => {
        if (currentIndex.value < items.length - 1) {
            currentIndex.value++;
            currentPicked.value = 0;
        } else {
            currentIndex.value = items.length;
            currentPicked.value = 0;
        }
        animating.value = false;
    }, 300);
};

const decrease = () => {
    if (isComplete.value || animating.value) {
        return;
    }
    if (currentPicked.value > 0) {
        currentPicked.value--;
    }
};

const increase = () => {
    if (isComplete.value || animating.value) {
        return;
    }
    if (currentPicked.value < currentItem.value.quantity) {
        currentPicked.value++;
    }
    if (currentPicked.value === currentItem.value.quantity) {
        advanceToNext();
    }
};

const reset = () => {
    currentIndex.value = 0;
    currentPicked.value = 0;
    animating.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') {
        return;
    }
    const target = event.target as HTMLElement | null;
    const tag = target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) {
        return;
    }
    reset();
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div class="relative bg-paper dark:bg-charcoal rounded-2xl ring-1 ring-chalk-dark dark:ring-flint shadow-[0_12px_32px_-20px_rgba(25,25,25,0.12)] max-w-md mx-auto px-6 sm:px-8 pt-5 pb-8">
        <div class="h-1 bg-chalk dark:bg-flint rounded-full overflow-hidden">
            <div
                class="h-full bg-green rounded-full transition-all duration-500 ease-out"
                :style="{
                    width: `${progressPercent}%`,
                }"
            ></div>
        </div>

        <div class="flex items-center justify-between mt-4 mb-7">
            <p class="text-sm font-medium text-gravel tabular-nums">
                {{ completedItems }} / {{ totalItems }}
            </p>

            <button
                type="button"
                class="inline-flex items-center gap-2 px-2.5 py-1.5 ring-1 ring-chalk-dark dark:ring-flint rounded-md text-sm text-charcoal dark:text-paper hover:ring-chalk-darker dark:hover:ring-steel transition-colors"
                @click="reset"
            >
                <i class="fa-solid fa-xmark text-gravel" aria-hidden="true"></i>
                <span>Opnieuw</span>
                <kbd class="ml-0.5 px-1.5 py-0.5 text-[10px] ring-1 ring-chalk-dark dark:ring-flint rounded text-steel dark:text-gravel font-medium font-mono uppercase tracking-wide leading-none">
                    Esc
                </kbd>
            </button>
        </div>

        <div v-if="isComplete" role="status" aria-live="polite" class="flex flex-col items-center text-center py-8">
            <div class="h-16 w-16 rounded-full bg-green/10 dark:bg-green/15 flex items-center justify-center mb-5">
                <i class="fa-solid fa-circle-check text-green text-4xl" aria-hidden="true"></i>
            </div>
            <p class="text-xl font-semibold text-charcoal dark:text-paper mb-1">Picklijst voltooid</p>
            <p class="text-sm text-gravel mb-7">Breng de containers naar de inpakker.</p>
            <button
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 bg-flint dark:bg-graphite text-paper text-sm font-medium rounded-md hover:bg-charcoal transition-colors"
                @click="reset"
            >
                <i class="fa-solid fa-rotate-right text-xs" aria-hidden="true"></i>
                Opnieuw beginnen
            </button>
        </div>

        <div
            v-else
            class="transition-opacity duration-200"
            :class="animating ? 'opacity-40' : 'opacity-100'"
        >
            <h3 class="text-xl text-charcoal dark:text-paper font-normal leading-snug text-center line-clamp-2 min-h-[3.5rem]">
                {{ currentItem.product }}
            </h3>

            <div class="flex justify-center mt-5">
                <div class="h-32 w-32 rounded-lg bg-chalk-light dark:bg-graphite ring-1 ring-chalk-dark dark:ring-flint flex items-center justify-center overflow-hidden">
                    <img
                        :src="currentItem.image"
                        :alt="currentItem.product"
                        class="h-full w-full object-contain p-2"
                        loading="lazy"
                    />
                </div>
            </div>

            <p class="text-sm text-gravel text-center font-mono mt-3">
                {{ currentItem.sku }}
            </p>

            <p class="text-xl font-bold text-center text-charcoal dark:text-paper mt-8">
                {{ currentItem.location }}
            </p>

            <p class="text-2xl font-bold text-center text-charcoal dark:text-paper mt-3">
                {{ currentItem.quantity }}x
            </p>

            <div class="flex items-center justify-center gap-2 mt-6">
                <button
                    type="button"
                    class="h-10 w-10 bg-flint dark:bg-graphite text-paper rounded-md flex items-center justify-center hover:bg-charcoal active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Verlaag aantal gepickt"
                    :disabled="currentPicked === 0 || animating"
                    @click="decrease"
                >
                    <i class="fa-solid fa-minus text-sm" aria-hidden="true"></i>
                </button>

                <div class="h-10 px-4 min-w-[3rem] ring-1 ring-chalk-dark dark:ring-flint rounded-md flex items-center justify-center text-charcoal dark:text-paper tabular-nums font-medium" aria-live="polite">
                    {{ currentPicked }}
                </div>

                <span class="text-charcoal dark:text-paper tabular-nums px-1">/ {{ currentItem.quantity }}</span>

                <button
                    type="button"
                    class="h-10 w-10 bg-flint dark:bg-graphite text-paper rounded-md flex items-center justify-center hover:bg-charcoal active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Verhoog aantal gepickt"
                    :disabled="animating"
                    @click="increase"
                >
                    <i class="fa-solid fa-plus text-sm" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
</template>
