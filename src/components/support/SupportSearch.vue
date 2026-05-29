<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

interface SearchItem {
    title: string;
    summary: string;
    category: string;
    categoryLabel: string;
    subcategory: string | null;
    href: string;
}

const props = defineProps<{
    articles: Array<SearchItem>;
}>();

const query = ref('');
const isFocused = ref(false);
const blurTimer = ref<number | null>(null);
const selectedIndex = ref(-1);
const dropdownRef = ref<HTMLElement | null>(null);

function tokenize(input: string): Array<string> {
    return input
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .split(/[\s,\.\!\?\-_/]+/)
        .filter((t) => t.length > 0);
}

interface ScoredItem {
    item: SearchItem;
    score: number;
}

function scoreItem(item: SearchItem, tokens: Array<string>): number {
    const title = item.title.toLowerCase();
    const titleNorm = title.normalize('NFD').replace(/[̀-ͯ]/g, '');
    const titleWords = titleNorm.split(/\s+/);
    const summary = item.summary.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const categoryLabel = item.categoryLabel.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const subcategory = (item.subcategory ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
        let tokenScore = 0;

        if (titleWords.some((w) => w === token)) {
            tokenScore += 100;
        } else if (titleWords.some((w) => w.startsWith(token))) {
            tokenScore += 60;
        } else if (titleNorm.includes(token)) {
            tokenScore += 30;
        }

        if (summary.includes(token)) {
            tokenScore += 8;
        }

        if (categoryLabel.includes(token)) {
            tokenScore += 5;
        }

        if (subcategory.includes(token)) {
            tokenScore += 5;
        }

        if (tokenScore === 0) {
            matchedAll = false;
        }

        score += tokenScore;
    }

    if (!matchedAll) {
        score = Math.floor(score / 4);
    }

    if (tokens.length > 0 && titleNorm.startsWith(tokens[0])) {
        score += 20;
    }

    return score;
}

const results = computed(() => {
    const raw = query.value.trim();

    if (raw.length < 2) {
        return [];
    }

    const tokens = tokenize(raw);

    if (tokens.length === 0) {
        return [];
    }

    const scored: Array<ScoredItem> = [];

    for (const item of props.articles) {
        const s = scoreItem(item, tokens);
        if (s > 0) {
            scored.push({
                item,
                score: s,
            });
        }
    }

    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 8).map((s) => s.item);
});

const hasResults = computed(() => results.value.length > 0);
const showDropdown = computed(() => isFocused.value && query.value.trim().length >= 2);

watch(query, () => {
    selectedIndex.value = -1;
});

watch(selectedIndex, async (idx) => {
    if (idx < 0) {
        return;
    }

    await nextTick();

    if (!dropdownRef.value) {
        return;
    }

    const items = dropdownRef.value.querySelectorAll<HTMLElement>('[data-result]');
    const target = items[idx];

    if (target) {
        target.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
        });
    }
});

const onBlur = () => {
    blurTimer.value = window.setTimeout(() => {
        isFocused.value = false;
        selectedIndex.value = -1;
    }, 150);
};

const onFocus = () => {
    if (blurTimer.value !== null) {
        window.clearTimeout(blurTimer.value);
        blurTimer.value = null;
    }
    isFocused.value = true;
};

const clearQuery = () => {
    query.value = '';
    selectedIndex.value = -1;
};

const onKeydown = (event: KeyboardEvent) => {
    if (!showDropdown.value || !hasResults.value) {
        return;
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        const next = selectedIndex.value + 1;
        selectedIndex.value = next >= results.value.length ? 0 : next;
        return;
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault();
        const next = selectedIndex.value - 1;
        selectedIndex.value = next < 0 ? results.value.length - 1 : next;
        return;
    }

    if (event.key === 'Enter') {
        if (selectedIndex.value >= 0 && selectedIndex.value < results.value.length) {
            event.preventDefault();
            const target = results.value[selectedIndex.value];
            window.location.href = target.href;
        }
        return;
    }

    if (event.key === 'Escape') {
        event.preventDefault();
        clearQuery();
        (event.target as HTMLInputElement)?.blur();
    }
};

onBeforeUnmount(() => {
    if (blurTimer.value !== null) {
        window.clearTimeout(blurTimer.value);
    }
});
</script>

<template>
    <div class="relative w-full max-w-2xl mx-auto">
        <div class="relative">
            <i
                class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gravel pointer-events-none"
                aria-hidden="true"
            ></i>
            <input
                v-model="query"
                type="search"
                placeholder="Zoek in helpartikelen..."
                aria-label="Zoek in helpartikelen"
                aria-autocomplete="list"
                aria-controls="support-search-results"
                :aria-activedescendant="selectedIndex >= 0 ? `support-search-result-${selectedIndex}` : undefined"
                class="search-input w-full pl-12 pr-12 py-4 bg-paper ring-1 ring-chalk-dark rounded-2xl text-base text-charcoal placeholder:text-gravel focus:ring-2 focus:ring-sunstone-deep focus:outline-none transition shadow-[0_8px_30px_-15px_rgba(25,25,25,0.12)]"
                @focus="onFocus"
                @blur="onBlur"
                @keydown="onKeydown"
            />
            <button
                v-if="query.length > 0"
                type="button"
                aria-label="Wis zoekopdracht"
                class="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full text-gravel hover:text-charcoal hover:bg-chalk-light transition"
                @mousedown.prevent
                @click="clearQuery"
            >
                <i class="fa-solid fa-xmark text-sm" aria-hidden="true"></i>
            </button>
        </div>

        <div
            v-if="showDropdown"
            id="support-search-results"
            ref="dropdownRef"
            role="listbox"
            class="absolute top-full mt-3 left-0 right-0 bg-paper rounded-2xl ring-1 ring-chalk-dark shadow-[0_20px_60px_-20px_rgba(25,25,25,0.25)] overflow-hidden z-50 text-left"
        >
            <div
                v-if="hasResults"
                class="divide-y divide-chalk-dark max-h-[26rem] overflow-y-auto"
            >
                <a
                    v-for="(r, i) in results"
                    :id="`support-search-result-${i}`"
                    :key="r.href"
                    :href="r.href"
                    role="option"
                    data-result
                    :aria-selected="selectedIndex === i"
                    :class="[
                        'block px-5 py-4 transition-colors',
                        selectedIndex === i ? 'bg-sunstone-mist/60' : 'hover:bg-chalk-light',
                    ]"
                    @mouseenter="selectedIndex = i"
                >
                    <p class="text-[0.6875rem] text-sunstone-deep font-semibold uppercase tracking-wider mb-1.5">
                        {{ r.categoryLabel }}<span v-if="r.subcategory"> &middot; {{ r.subcategory }}</span>
                    </p>
                    <p class="text-sm font-semibold text-charcoal mb-1 tracking-tight">
                        {{ r.title }}
                    </p>
                    <p class="text-xs text-gravel line-clamp-1 leading-relaxed">
                        {{ r.summary }}
                    </p>
                </a>
            </div>
            <div
                v-else
                class="px-5 py-8 text-center"
            >
                <p class="text-sm text-charcoal font-medium mb-1">
                    Geen artikelen gevonden
                </p>
                <p class="text-xs text-gravel">
                    Probeer een ander zoekwoord of blader hieronder door de categorieen.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-decoration,
.search-input::-webkit-search-results-button,
.search-input::-webkit-search-results-decoration {
    -webkit-appearance: none;
    appearance: none;
    display: none;
}

.search-input::-ms-clear {
    display: none;
    width: 0;
    height: 0;
}
</style>
