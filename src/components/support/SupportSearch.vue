<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useTranslations } from '../../i18n/ui';
import { localizeHref, type Locale } from '../../i18n/routes';

interface SearchItem {
    title: string;
    summary: string;
    category: string;
    categoryLabel: string;
    subcategory: string | null;
    subcategoryLabel: string | null;
    href: string;
}

const props = withDefaults(defineProps<{
    articles: Array<SearchItem>;
    locale?: Locale;
}>(), { locale: 'nl' });

const t = computed(() => useTranslations(props.locale).supportSearch);
const contactHref = computed(() => localizeHref('/contact', props.locale));

const query = ref('');
const isFocused = ref(false);
const blurTimer = ref<number | null>(null);
const selectedIndex = ref(-1);
const dropdownRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const DIACRITICS_REGEX = /[̀-ͯ]/g;

function stripDiacritics(input: string): string {
    return input.toLowerCase().normalize('NFD').replace(DIACRITICS_REGEX, '');
}

function tokenize(input: string): Array<string> {
    return stripDiacritics(input)
        .split(/[\s,.!?\-_/]+/)
        .filter((t) => t.length > 0);
}

interface ScoredItem {
    item: SearchItem;
    score: number;
}

function scoreItem(item: SearchItem, tokens: Array<string>): number {
    const titleNorm = stripDiacritics(item.title);
    const titleWords = titleNorm.split(/\s+/);
    const summary = stripDiacritics(item.summary);
    const categoryLabel = stripDiacritics(item.categoryLabel);
    const subcategoryLabel = stripDiacritics(item.subcategoryLabel ?? '');
    const subcategorySlug = stripDiacritics(item.subcategory ?? '');

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

        if (subcategoryLabel.includes(token) || subcategorySlug.includes(token)) {
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
    if (event.key === 'Escape') {
        if (query.value.length > 0) {
            event.preventDefault();
            clearQuery();
            return;
        }
        (event.target as HTMLInputElement)?.blur();
        return;
    }

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
        const idx = selectedIndex.value >= 0 ? selectedIndex.value : 0;

        if (idx < results.value.length) {
            event.preventDefault();
            const target = results.value[idx];
            window.location.href = target.href;
        }
    }
};

onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');

    if (q && q.trim().length > 0) {
        query.value = q.trim().slice(0, 200);

        nextTick(() => {
            if (inputRef.value) {
                inputRef.value.focus();
                isFocused.value = true;
            }
        });
    }
});

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
                ref="inputRef"
                v-model="query"
                type="search"
                role="combobox"
                :placeholder="t.placeholder"
                :aria-label="t.ariaLabel"
                :aria-expanded="showDropdown"
                aria-haspopup="listbox"
                aria-autocomplete="list"
                aria-controls="support-search-results"
                :aria-activedescendant="selectedIndex >= 0 ? `support-search-result-${selectedIndex}` : undefined"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                enterkeyhint="search"
                class="search-input w-full pl-12 pr-12 py-4 bg-paper dark:bg-charcoal ring-1 ring-chalk-dark dark:ring-flint rounded-2xl text-base text-charcoal dark:text-paper placeholder:text-gravel focus:ring-2 focus:ring-sunstone-deep focus:outline-none transition shadow-[0_8px_30px_-15px_rgba(25,25,25,0.12)]"
                @focus="onFocus"
                @blur="onBlur"
                @keydown="onKeydown"
            />
            <button
                v-if="query.length > 0"
                type="button"
                :aria-label="t.clear"
                class="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full text-gravel hover:text-charcoal dark:hover:text-paper hover:bg-chalk-light dark:hover:bg-graphite transition"
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
            class="absolute top-full mt-3 left-0 right-0 bg-paper dark:bg-charcoal rounded-2xl ring-1 ring-chalk-dark dark:ring-flint shadow-[0_20px_60px_-20px_rgba(25,25,25,0.25)] overflow-hidden z-50 text-left"
        >
            <div
                v-if="hasResults"
                class="divide-y divide-chalk-dark dark:divide-flint max-h-[26rem] overflow-y-auto"
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
                        selectedIndex === i ? 'bg-sunstone-mist/60 dark:bg-sunstone/10' : 'hover:bg-chalk-light dark:hover:bg-graphite',
                    ]"
                    @mouseenter="selectedIndex = i"
                >
                    <p class="text-[0.6875rem] text-sunstone-deep font-semibold uppercase tracking-wider mb-1.5">
                        {{ r.categoryLabel }}<span v-if="r.subcategoryLabel"> &middot; {{ r.subcategoryLabel }}</span>
                    </p>
                    <p class="text-sm font-semibold text-charcoal dark:text-paper mb-1 tracking-tight">
                        {{ r.title }}
                    </p>
                    <p class="text-xs text-gravel line-clamp-1 leading-relaxed">
                        {{ r.summary }}
                    </p>
                </a>
            </div>
            <div
                v-else
                role="status"
                aria-live="polite"
                class="px-5 py-8 text-center"
            >
                <p class="text-sm text-charcoal dark:text-paper font-medium mb-1">
                    {{ t.noResults }}
                </p>
                <p class="text-xs text-gravel mb-3">
                    {{ t.noResultsHint }}
                </p>
                <a
                    :href="contactHref"
                    class="inline-flex items-center gap-1.5 text-xs font-semibold text-sunstone-deep hover:text-sunstone transition-colors"
                >
                    {{ t.contactCta }}
                    <i class="fa-solid fa-arrow-right text-[10px]" aria-hidden="true"></i>
                </a>
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
