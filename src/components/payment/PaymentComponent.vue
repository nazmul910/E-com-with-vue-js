<script>
import { loadStripe } from '@stripe/stripe-js';

export default {
    data() {
        return {
            stripe: null,
            cardElement: null,
            errorMessage: '',
            loading: false
        };
    },
    async mounted() {
        this.stripe = await loadStripe('pk_test_51QJh0iGaKHwZltrkJ6Qi5TnTIfGZRruhF6zDZ4uWofeZyfVNZJP1i5gNsNj6pzIIkijaLFXPguqEb2imEaQzsMVi00isLLHIUe'); // Replace with your own Publishable key
        const elements = this.stripe.elements();
        this.cardElement = elements.create('card');
        this.cardElement.mount('#card-element');
    },
    methods: {
        async handlePayment() {
            this.loading = true;
            try {
                const { clientSecret } = await this.createPaymentIntent(3000); // Call server function to create a PaymentIntent
                const { paymentIntent, error } = await this.stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: this.cardElement,
                    }
                });

                if (error) {
                    this.errorMessage = error.message;
                } else if (paymentIntent.status === 'succeeded') {
                    this.$emit('paymentSuccess', paymentIntent); // Optional: emit success event to parent component
                }
            } catch (error) {
                this.errorMessage = error.message || 'Payment failed. Please try again.';
            } finally {
                this.loading = false;
            }
        },
        async createPaymentIntent(amount) {
            // Here, you’ll call your backend server’s endpoint to create a PaymentIntent
            // Replace `/create-payment-intent` with your actual server endpoint.
            const response = await fetch('http://localhost:3000/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }) // Set the amount in cents
            });
            const data = await response.json();
            return data;  //  .clientSecret is added after
        }
    }

};
</script>

<template>
    <div>
        <form @submit.prevent="handlePayment">
            <div id="card-element" class="my-3">Stripe Card Element will be inserted here</div>
            <button type="submit" :disabled="loading" class="bg-green-500 py-2 px-4 rounded-3xl my-3 text-white font-extrabold">
                {{ loading ? 'Processing...' : 'Pay Now' }}
            </button>
        </form>
        <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
</template>

<style>
/* Customize the card input style */
#card-element {
    padding: 10px;
    border: 1px solid #ccc;
    width: 400px;
}
</style>
