<script setup lang="ts">
import { computed, ref } from 'vue';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;

const FRIENDLY_ERRORS: Record<string, string> = {
    'First name too short': 'Vul je voornaam in, minstens 2 letters.',
    'Invalid email': 'Het e-mailadres ziet er niet helemaal goed uit.',
    'Newsletter is niet juist geconfigureerd': 'Aanmelden lukt nu niet. Probeer het later nog eens.',
    'Aanmelden lukte niet': 'Aanmelden lukte niet. Probeer het zo nog eens.',
    'Aanmelden duurde te lang': 'Het duurde wat te lang. Probeer het zo nog eens.',
    'Onverwachte fout bij aanmelden': 'Aanmelden lukte niet. Probeer het zo nog eens.',
    'Invalid content type': 'Aanmelden lukte niet. Probeer het zo nog eens.',
    'Payload too large': 'Aanmelden lukte niet. Probeer het zo nog eens.',
    'Invalid JSON': 'Aanmelden lukte niet. Probeer het zo nog eens.',
    'Invalid payload': 'Aanmelden lukte niet. Probeer het zo nog eens.',
};

const FALLBACK_ERROR = 'Aanmelden lukte niet. Probeer het zo nog eens.';

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
    if (!raw) {
        return FALLBACK_ERROR;
    }

    return FRIENDLY_ERRORS[raw] ?? FALLBACK_ERROR;
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
    } catch (error) {
        status.value = 'error';
        const raw = error instanceof Error ? error.message : undefined;
        errorMessage.value = friendlyError(raw);
    }
}
</script>

<template>
    <div class="bg-paper rounded-2xl ring-1 ring-chalk-dark p-6">
        <div
            v-if="status === 'success'"
            role="status"
            aria-live="polite"
            class="text-center py-2"
        >
            <div class="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-sunstone-mist text-sunstone-deep ring-1 ring-sunstone-soft/40 mb-3">
                <i class="fa-solid fa-check text-sm" aria-hidden="true"></i>
            </div>
            <p class="text-sm font-semibold text-charcoal mb-1">
                Bedankt voor je aanmelding!
            </p>
            <p class="text-xs text-gravel">
                Je hoort snel van ons.
            </p>
        </div>

        <div v-else>
            <p class="text-sm font-semibold text-charcoal mb-1">
                Blijf op de hoogte
            </p>
            <p class="text-xs text-gravel mb-4 leading-relaxed">
                Maandelijks updates over nieuwe features, integraties en tips voor je magazijn.
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
                        placeholder="Je voornaam"
                        aria-label="Voornaam voor newsletter"
                        class="w-full rounded-lg ring-1 ring-chalk-dark bg-paper px-3.5 py-2.5 text-sm text-charcoal placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
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
                        placeholder="naam@bedrijf.nl"
                        aria-label="E-mailadres voor newsletter"
                        class="w-full rounded-lg ring-1 ring-chalk-dark bg-paper px-3.5 py-2.5 text-sm text-charcoal placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
                        :disabled="status === 'submitting'"
                    />
                </div>

                <button
                    type="submit"
                    :disabled="!isValid || status === 'submitting'"
                    :aria-busy="status === 'submitting'"
                    class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-charcoal text-paper text-sm font-semibold hover:bg-charcoal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span v-if="status === 'submitting'" class="inline-flex items-center gap-2">
                        <i class="fa-solid fa-circle-notch fa-spin text-xs" aria-hidden="true"></i>
                        Aanmelden...
                    </span>
                    <span v-else class="inline-flex items-center gap-2">
                        Aanmelden
                        <i class="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                    </span>
                </button>

                <p
                    v-if="status === 'error'"
                    role="alert"
                    aria-live="assertive"
                    class="text-xs text-red-600 mt-2"
                >
                    {{ errorMessage }}
                </p>

                <p v-else class="text-[11px] text-gravel mt-2 leading-relaxed">
                    We sturen je geen spam. Uitschrijven kan altijd.
                </p>
            </form>
        </div>
    </div>
</template>
