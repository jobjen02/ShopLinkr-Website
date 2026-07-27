<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslations } from '../../i18n/ui';
import type { Locale } from '../../i18n/routes';
import { track, EVENTS } from '../../lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const props = withDefaults(defineProps<{ locale?: Locale }>(), { locale: 'nl' });
const t = computed(() => useTranslations(props.locale).newsletter);

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;

// Maps raw server error strings to a dictionary key; anything unknown is generic.
type ErrorKey = 'tooShort' | 'invalidEmail' | 'notConfigured' | 'timeout' | 'generic' | 'tooManyRequests';

const ERROR_KEYS: Record<string, ErrorKey> = {
    'First name too short': 'tooShort',
    'Invalid email': 'invalidEmail',
    'Newsletter is niet juist geconfigureerd': 'notConfigured',
    'Aanmelden lukte niet': 'generic',
    'Aanmelden duurde te lang': 'timeout',
    'Onverwachte fout bij aanmelden': 'generic',
    'Too many requests': 'tooManyRequests',
    'Invalid content type': 'generic',
    'Payload too large': 'generic',
    'Invalid JSON': 'generic',
    'Invalid payload': 'generic',
};

const firstName = ref('');
const email = ref('');
const honeypot = ref('');
const status = ref<Status>('idle');
const errorMessage = ref('');

const isValid = computed(() => {
    return firstName.value.trim().length >= 2
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
});

function friendlyError(raw: string | undefined): string {
    const errors = t.value.errors;
    const key: ErrorKey = (raw && ERROR_KEYS[raw]) || 'generic';
    return errors[key];
}

async function handleSubmit(): Promise<void> {
    if (!isValid.value || status.value === 'submitting') {
        return;
    }

    if (honeypot.value.length > 0) {
        status.value = 'success';
        return;
    }

    status.value = 'submitting';
    errorMessage.value = '';

    try {
        const payload = {
            firstName: firstName.value.trim().slice(0, MAX_NAME_LENGTH),
            email: email.value.trim().slice(0, MAX_EMAIL_LENGTH),
            website: honeypot.value,
            source: 'website-footer',
        };

        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            const rawError = typeof data?.error === 'string' ? data.error : undefined;
            throw new Error(rawError ?? 'unknown');
        }

        status.value = 'success';
        track(EVENTS.newsletterSignup, {
            form_id: 'newsletter',
            source: 'website-footer',
        });
    } catch (error) {
        status.value = 'error';
        const raw = error instanceof Error ? error.message : undefined;
        errorMessage.value = friendlyError(raw);
    }
}
</script>

<template>
    <div class="bg-paper dark:bg-charcoal rounded-xl ring-1 ring-chalk-dark dark:ring-flint p-6">
        <div
            v-if="status === 'success'"
            role="status"
            aria-live="polite"
            class="text-center py-2"
        >
            <div class="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-sunstone-mist dark:bg-sunstone/10 text-sunstone-deep ring-1 ring-sunstone-soft/40 dark:ring-sunstone/30 mb-3">
                <i class="fa-solid fa-check text-sm" aria-hidden="true"></i>
            </div>
            <p class="text-sm font-semibold text-charcoal dark:text-paper mb-1">
                {{ t.successTitle }}
            </p>
            <p class="text-xs text-steel dark:text-gravel">
                {{ t.successBody }}
            </p>
        </div>

        <div v-else>
            <p class="text-sm font-semibold text-charcoal dark:text-paper mb-1">
                {{ t.heading }}
            </p>
            <p class="text-xs text-steel dark:text-gravel mb-4 leading-relaxed">
                {{ t.body }}
            </p>

            <form
                class="space-y-2"
                novalidate
                @submit.prevent="handleSubmit"
            >
                <div
                    aria-hidden="true"
                    style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;"
                >
                    <label for="newsletter-website">Website</label>
                    <input
                        id="newsletter-website"
                        v-model="honeypot"
                        type="text"
                        tabindex="-1"
                        autocomplete="off"
                        name="website"
                    />
                </div>

                <div class="relative">
                    <input
                        v-model="firstName"
                        type="text"
                        required
                        autocomplete="given-name"
                        :maxlength="MAX_NAME_LENGTH"
                        :placeholder="t.firstNamePlaceholder"
                        :aria-label="t.firstNameAria"
                        class="w-full rounded-md ring-1 ring-chalk-dark dark:ring-flint bg-chalk-light dark:bg-graphite px-3.5 py-3 text-sm text-charcoal dark:text-paper placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
                        :disabled="status === 'submitting'"
                    />
                </div>

                <div class="relative">
                    <input
                        v-model="email"
                        type="email"
                        required
                        autocomplete="email"
                        :maxlength="MAX_EMAIL_LENGTH"
                        inputmode="email"
                        :placeholder="t.emailPlaceholder"
                        :aria-label="t.emailAria"
                        class="w-full rounded-md ring-1 ring-chalk-dark dark:ring-flint bg-chalk-light dark:bg-graphite px-3.5 py-3 text-sm text-charcoal dark:text-paper placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
                        :disabled="status === 'submitting'"
                    />
                </div>

                <button
                    type="submit"
                    :disabled="!isValid || status === 'submitting'"
                    :aria-busy="status === 'submitting'"
                    class="btn btn-sunstone btn-sm w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span v-if="status === 'submitting'" class="inline-flex items-center gap-2">
                        <i class="fa-solid fa-circle-notch fa-spin text-xs" aria-hidden="true"></i>
                        {{ t.submitting }}
                    </span>
                    <span v-else class="inline-flex items-center gap-2">
                        {{ t.submit }}
                        <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                    </span>
                </button>

                <p
                    v-if="status === 'error'"
                    role="alert"
                    aria-live="assertive"
                    class="text-xs text-red mt-2"
                >
                    {{ errorMessage }}
                </p>

                <p v-else class="text-xs text-steel dark:text-gravel mt-2 leading-relaxed">
                    {{ t.noSpam }}
                </p>
            </form>
        </div>
    </div>
</template>
