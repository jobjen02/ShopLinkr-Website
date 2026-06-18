<script setup lang="ts">
import { computed, ref } from 'vue';

interface FormState {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    consent: boolean;
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 40;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const FRIENDLY_ERRORS: Record<string, string> = {
    'Name too short': 'Vul je naam in, minstens 2 letters.',
    'Invalid email': 'Het e-mailadres ziet er niet helemaal goed uit.',
    'Message too short': 'Je bericht is wat aan de korte kant, geef ons iets meer context.',
    'Consent required': 'Vink eerst akkoord aan om door te kunnen.',
    'Server is niet juist geconfigureerd': 'We hebben hier iets om te fixen. Mail ons even op contact@shoplinkr.com.',
    'Mail kon niet verstuurd worden': 'Het versturen lukte niet. Probeer het zo nog eens of mail ons direct op contact@shoplinkr.com.',
    'Invalid content type': 'Er ging iets mis bij het versturen. Probeer het zo nog eens.',
    'Payload too large': 'Je bericht is te lang. Maak het wat korter en probeer het nog eens.',
    'Invalid JSON': 'Er ging iets mis bij het versturen. Probeer het zo nog eens.',
    'Invalid payload': 'Er ging iets mis bij het versturen. Probeer het zo nog eens.',
};

const FALLBACK_ERROR = 'Het versturen lukte niet. Probeer het zo nog eens of mail ons direct op contact@shoplinkr.com.';

const state = ref<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
});

const honeypot = ref<string>('');
const status = ref<SubmissionStatus>('idle');
const errorMessage = ref<string>('');

const isValid = computed(() => {
    return state.value.name.trim().length >= 2
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.value.email.trim())
        && state.value.message.trim().length >= 10
        && state.value.consent;
});

const characterCount = computed(() => state.value.message.length);

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
            name: state.value.name.trim().slice(0, MAX_NAME_LENGTH),
            email: state.value.email.trim().slice(0, MAX_EMAIL_LENGTH),
            phone: state.value.phone.trim().slice(0, MAX_PHONE_LENGTH),
            subject: state.value.subject.trim().slice(0, MAX_SUBJECT_LENGTH),
            message: state.value.message.trim().slice(0, MAX_MESSAGE_LENGTH),
            consent: state.value.consent,
            website: honeypot.value,
        };

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
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

function reset(): void {
    state.value = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false,
    };
    honeypot.value = '';
    status.value = 'idle';
    errorMessage.value = '';
}
</script>

<template>
    <div
        v-if="status === 'success'"
        role="status"
        aria-live="polite"
        class="bg-paper rounded-3xl ring-1 ring-chalk-dark shadow-[0_3px_10px_rgba(0,0,0,0.05)] p-8 md:p-10 text-center"
    >
        <div class="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-sunstone-mist text-sunstone-deep ring-1 ring-sunstone-soft/40 mb-5">
            <i class="fa-solid fa-check text-xl" aria-hidden="true"></i>
        </div>
        <h2 class="text-2xl md:text-3xl font-semibold text-charcoal tracking-tight mb-3">
            Bericht verzonden!
        </h2>
        <p class="text-steel leading-relaxed max-w-md mx-auto">
            Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op, doorgaans binnen 2 uur tijdens kantooruren.
        </p>
        <button
            type="button"
            class="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold text-charcoal hover:text-sunstone-deep transition-colors"
            @click="reset"
        >
            <i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i>
            Nieuw bericht sturen
        </button>
    </div>

    <div
        v-else
        class="bg-paper rounded-3xl ring-1 ring-chalk-dark shadow-[0_3px_10px_rgba(0,0,0,0.05)] p-8 md:p-10"
    >
        <p class="eyebrow mb-3">Formulier</p>
        <h2 class="text-2xl md:text-3xl font-semibold text-charcoal tracking-tight mb-2">
            Stuur een bericht!
        </h2>
        <p class="text-steel text-[15px] leading-relaxed mb-8">
            Vul je gegevens in en we nemen snel contact met je op.
        </p>

        <form
            class="space-y-5"
            novalidate
            aria-describedby="contact-form-help"
            @submit.prevent="handleSubmit"
        >
            <div
                aria-hidden="true"
                style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;"
            >
                <label for="contact-website">Website</label>
                <input
                    id="contact-website"
                    v-model="honeypot"
                    type="text"
                    tabindex="-1"
                    autocomplete="off"
                    name="website"
                />
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label for="contact-name" class="block text-sm font-medium text-charcoal mb-2">
                        Naam <span class="text-sunstone-deep">*</span>
                    </label>
                    <input
                        id="contact-name"
                        v-model="state.name"
                        type="text"
                        required
                        autocomplete="name"
                        :maxlength="MAX_NAME_LENGTH"
                        placeholder="Jouw naam"
                        class="w-full rounded-lg ring-1 ring-chalk-dark bg-paper px-4 py-3 text-[15px] text-charcoal placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
                    />
                </div>

                <div>
                    <label for="contact-email" class="block text-sm font-medium text-charcoal mb-2">
                        E-mail <span class="text-sunstone-deep">*</span>
                    </label>
                    <input
                        id="contact-email"
                        v-model="state.email"
                        type="email"
                        required
                        autocomplete="email"
                        :maxlength="MAX_EMAIL_LENGTH"
                        inputmode="email"
                        placeholder="naam@bedrijf.nl"
                        class="w-full rounded-lg ring-1 ring-chalk-dark bg-paper px-4 py-3 text-[15px] text-charcoal placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
                    />
                </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label for="contact-phone" class="block text-sm font-medium text-charcoal mb-2">
                        Telefoon
                        <span class="text-gravel text-xs font-normal">(optioneel)</span>
                    </label>
                    <input
                        id="contact-phone"
                        v-model="state.phone"
                        type="tel"
                        autocomplete="tel"
                        :maxlength="MAX_PHONE_LENGTH"
                        inputmode="tel"
                        placeholder="+31 6 12 34 56 78"
                        class="w-full rounded-lg ring-1 ring-chalk-dark bg-paper px-4 py-3 text-[15px] text-charcoal placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
                    />
                </div>

                <div>
                    <label for="contact-subject" class="block text-sm font-medium text-charcoal mb-2">
                        Onderwerp
                        <span class="text-gravel text-xs font-normal">(optioneel)</span>
                    </label>
                    <input
                        id="contact-subject"
                        v-model="state.subject"
                        type="text"
                        :maxlength="MAX_SUBJECT_LENGTH"
                        placeholder="Waar gaat het over?"
                        class="w-full rounded-lg ring-1 ring-chalk-dark bg-paper px-4 py-3 text-[15px] text-charcoal placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-end justify-between mb-2">
                    <label for="contact-message" class="block text-sm font-medium text-charcoal">
                        Bericht <span class="text-sunstone-deep">*</span>
                    </label>
                    <span class="text-xs text-gravel" aria-live="polite">
                        {{ characterCount }} / {{ MAX_MESSAGE_LENGTH }}
                    </span>
                </div>
                <textarea
                    id="contact-message"
                    v-model="state.message"
                    required
                    rows="5"
                    minlength="10"
                    :maxlength="MAX_MESSAGE_LENGTH"
                    placeholder="Waar kunnen we je mee helpen?"
                    class="w-full rounded-lg ring-1 ring-chalk-dark bg-paper px-4 py-3 text-[15px] text-charcoal placeholder-gravel focus:outline-none focus:ring-2 focus:ring-sunstone-deep transition resize-y min-h-[140px]"
                ></textarea>
            </div>

            <label class="flex items-start gap-3 cursor-pointer">
                <input
                    v-model="state.consent"
                    type="checkbox"
                    required
                    class="mt-1 h-4 w-4 rounded ring-1 ring-chalk-dark text-sunstone-deep focus:ring-2 focus:ring-sunstone-deep"
                />
                <span class="text-sm text-steel leading-relaxed">
                    Ik ga ermee akkoord dat ShopLinkr mijn gegevens gebruikt om contact met mij op te nemen. <span class="text-sunstone-deep">*</span>
                </span>
            </label>

            <div
                v-if="status === 'error'"
                role="alert"
                aria-live="assertive"
                class="rounded-lg bg-paper ring-1 ring-red-200 px-4 py-3 text-sm text-red-700"
            >
                {{ errorMessage }}
            </div>

            <button
                type="submit"
                :disabled="!isValid || status === 'submitting'"
                :aria-busy="status === 'submitting'"
                class="btn btn-sunstone text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span v-if="status === 'submitting'" class="inline-flex items-center gap-2">
                    <i class="fa-solid fa-circle-notch fa-spin text-sm" aria-hidden="true"></i>
                    Versturen...
                </span>
                <span v-else class="inline-flex items-center gap-2">
                    Verstuur je bericht
                    <i class="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                </span>
            </button>

            <p id="contact-form-help" class="text-xs text-gravel mt-3">
                We reageren doorgaans binnen 2 uur tijdens kantooruren (ma-vr 08:30-17:00).
            </p>
        </form>
    </div>
</template>
