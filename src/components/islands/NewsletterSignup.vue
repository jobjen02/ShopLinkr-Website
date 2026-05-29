<script setup lang="ts">
import { computed, ref } from 'vue';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const firstName = ref('');
const email = ref('');
const honeypot = ref('');
const status = ref<Status>('idle');
const errorMessage = ref('');

const isValid = computed(() => {
    return firstName.value.trim().length >= 2
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
});

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
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName.value.trim(),
                email: email.value.trim(),
                website: honeypot.value,
                source: 'website-footer',
            }),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data?.error ?? 'Submission failed');
        }

        status.value = 'success';
    } catch (error) {
        status.value = 'error';
        errorMessage.value = error instanceof Error && error.message
            ? `Aanmelden lukte niet. ${error.message}.`
            : 'Aanmelden lukte niet. Probeer het zo nog eens.';
    }
}
</script>

<template>
    <div class="bg-paper rounded-2xl ring-1 ring-chalk-dark p-6">
        <div v-if="status === 'success'" class="text-center py-2">
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
                        placeholder="naam@bedrijf.nl"
                        aria-label="E-mailadres voor newsletter"
                        class="w-full rounded-lg ring-1 ring-chalk-dark bg-paper px-3.5 py-2.5 text-sm text-charcoal placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
                        :disabled="status === 'submitting'"
                    />
                </div>

                <button
                    type="submit"
                    :disabled="!isValid || status === 'submitting'"
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
