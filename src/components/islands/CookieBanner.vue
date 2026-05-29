<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface CookieConsent {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
    timestamp: number;
    version: number;
}

const STORAGE_KEY = 'shoplinkr-cookie-consent';
const REOPEN_EVENT = 'cookie-banner-reopen';
const UPDATED_EVENT = 'cookie-consent-updated';
const CONSENT_VERSION = 1;

const isVisible = ref(false);
const showDetails = ref(false);
const analyticsEnabled = ref(false);
const marketingEnabled = ref(false);
let initialOpenTimer: number | null = null;

function readConsent(): CookieConsent | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return null;
        }

        const parsed = JSON.parse(raw) as CookieConsent;

        if (parsed.version !== CONSENT_VERSION) {
            return null;
        }

        return parsed;
    } catch {
        return null;
    }
}

function writeConsent(consent: CookieConsent): boolean {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
        window.dispatchEvent(new CustomEvent(UPDATED_EVENT, {
            detail: consent,
        }));
        return true;
    } catch {
        return false;
    }
}

function closeWith(consent: CookieConsent): void {
    writeConsent(consent);
    isVisible.value = false;
}

function acceptAll(): void {
    closeWith({
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
    });
}

function rejectAll(): void {
    closeWith({
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
    });
}

function saveCustom(): void {
    closeWith({
        necessary: true,
        analytics: analyticsEnabled.value,
        marketing: marketingEnabled.value,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
    });
}

function toggleDetails(): void {
    showDetails.value = !showDetails.value;
}

const summary = computed(() => {
    if (analyticsEnabled.value && marketingEnabled.value) {
        return 'Je accepteert alle cookies.';
    }

    if (!analyticsEnabled.value && !marketingEnabled.value) {
        return 'Je accepteert alleen noodzakelijke cookies.';
    }

    if (analyticsEnabled.value && !marketingEnabled.value) {
        return 'Je accepteert noodzakelijke en analytische cookies.';
    }

    return 'Je accepteert noodzakelijke en marketing cookies.';
});

function onReopen(): void {
    const existing = readConsent();

    if (existing) {
        analyticsEnabled.value = existing.analytics;
        marketingEnabled.value = existing.marketing;
    }

    showDetails.value = true;
    isVisible.value = true;
}

onMounted(() => {
    const existing = readConsent();

    if (existing) {
        analyticsEnabled.value = existing.analytics;
        marketingEnabled.value = existing.marketing;
        isVisible.value = false;
    } else {
        initialOpenTimer = window.setTimeout(() => {
            isVisible.value = true;
        }, 600);
    }

    window.addEventListener(REOPEN_EVENT, onReopen);
});

onBeforeUnmount(() => {
    if (initialOpenTimer !== null) {
        window.clearTimeout(initialOpenTimer);
    }

    window.removeEventListener(REOPEN_EVENT, onReopen);
});
</script>

<template>
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
    >
        <div
            v-if="isVisible"
            role="dialog"
            aria-modal="false"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-desc"
            class="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:max-w-md z-[100] bg-paper rounded-2xl ring-1 ring-chalk-dark shadow-[0_24px_60px_-20px_rgba(25,25,25,0.25)] overflow-hidden"
        >
            <div class="p-6">
                <div class="flex items-start gap-3 mb-3">
                    <span class="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-xl bg-sunstone-mist text-sunstone-deep ring-1 ring-sunstone-soft/40 mt-0.5">
                        <i class="fa-solid fa-cookie-bite text-sm" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="cookie-banner-title" class="text-base font-semibold text-charcoal tracking-tight">
                            Cookies
                        </h2>
                        <p id="cookie-banner-desc" class="mt-1 text-sm text-steel leading-relaxed">
                            We gebruiken cookies om de site te laten werken en je ervaring te verbeteren. Kies wat je accepteert.
                        </p>
                    </div>
                </div>

                <div
                    v-if="showDetails"
                    class="mt-4 space-y-3 border-t border-chalk-dark pt-4"
                >
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="text-sm font-semibold text-charcoal">
                                Noodzakelijk
                            </p>
                            <p class="text-xs text-gravel leading-relaxed mt-0.5">
                                Nodig om de site te laten functioneren. Altijd aan.
                            </p>
                        </div>
                        <span class="flex-shrink-0 text-xs font-medium text-gravel mt-1">
                            Altijd aan
                        </span>
                    </div>

                    <label class="flex items-start justify-between gap-4 cursor-pointer">
                        <div>
                            <p class="text-sm font-semibold text-charcoal">
                                Analytisch
                            </p>
                            <p class="text-xs text-gravel leading-relaxed mt-0.5">
                                Helpt ons begrijpen hoe je de site gebruikt, zodat we hem kunnen verbeteren.
                            </p>
                        </div>
                        <span
                            class="flex-shrink-0 inline-flex items-center mt-1 h-5 w-9 rounded-full transition-colors"
                            :class="analyticsEnabled ? 'bg-sunstone-deep' : 'bg-chalk-dark'"
                        >
                            <span
                                class="inline-block h-3.5 w-3.5 bg-paper rounded-full shadow transform transition-transform"
                                :class="analyticsEnabled ? 'translate-x-[1.125rem]' : 'translate-x-1'"
                            ></span>
                        </span>
                        <input
                            v-model="analyticsEnabled"
                            type="checkbox"
                            class="sr-only"
                            aria-label="Analytische cookies"
                        />
                    </label>

                    <label class="flex items-start justify-between gap-4 cursor-pointer">
                        <div>
                            <p class="text-sm font-semibold text-charcoal">
                                Marketing
                            </p>
                            <p class="text-xs text-gravel leading-relaxed mt-0.5">
                                Voor gepersonaliseerde content en advertenties.
                            </p>
                        </div>
                        <span
                            class="flex-shrink-0 inline-flex items-center mt-1 h-5 w-9 rounded-full transition-colors"
                            :class="marketingEnabled ? 'bg-sunstone-deep' : 'bg-chalk-dark'"
                        >
                            <span
                                class="inline-block h-3.5 w-3.5 bg-paper rounded-full shadow transform transition-transform"
                                :class="marketingEnabled ? 'translate-x-[1.125rem]' : 'translate-x-1'"
                            ></span>
                        </span>
                        <input
                            v-model="marketingEnabled"
                            type="checkbox"
                            class="sr-only"
                            aria-label="Marketing cookies"
                        />
                    </label>

                    <p class="text-xs text-gravel italic mt-3">
                        {{ summary }}
                    </p>
                </div>

                <p class="mt-4 text-xs text-gravel">
                    Lees meer in ons
                    <a href="/cookies" class="text-charcoal font-medium hover:text-sunstone-deep transition-colors">cookiebeleid</a>
                    en
                    <a href="https://shoplinkr.ams3.digitaloceanspaces.com/documents/Privacyverklaring%202026.pdf" target="_blank" rel="noopener noreferrer" class="text-charcoal font-medium hover:text-sunstone-deep transition-colors">privacyverklaring</a>.
                </p>

                <div class="mt-5 flex flex-col gap-2">
                    <button
                        type="button"
                        class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal text-paper text-sm font-semibold hover:bg-charcoal/90 transition-colors"
                        @click="acceptAll"
                    >
                        Accepteer alle
                    </button>

                    <div class="grid grid-cols-2 gap-2">
                        <button
                            v-if="!showDetails"
                            type="button"
                            class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg ring-1 ring-chalk-dark bg-paper text-charcoal text-sm font-medium hover:bg-chalk-light transition-colors"
                            @click="toggleDetails"
                        >
                            Instellen
                        </button>
                        <button
                            v-else
                            type="button"
                            class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg ring-1 ring-chalk-dark bg-paper text-charcoal text-sm font-medium hover:bg-chalk-light transition-colors"
                            @click="saveCustom"
                        >
                            Voorkeuren opslaan
                        </button>
                        <button
                            type="button"
                            class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg ring-1 ring-chalk-dark bg-paper text-steel text-sm font-medium hover:bg-chalk-light hover:text-charcoal transition-colors"
                            @click="rejectAll"
                        >
                            Alleen noodzakelijk
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
