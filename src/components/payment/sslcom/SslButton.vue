<script>
import axios from 'axios';

export default {
    methods: {
        initiatePayment() {
            axios
                .get('http://localhost:3000/init')
                .then((response) => {
                    // Redirect user to the payment gateway URL received in the response
                    if (response.data && response.data.GatewayPageURL) {
                        window.location.href = response.data.GatewayPageURL;
                    }
                })
                .catch((error) => {
                    console.error('Error initiating payment:', error);
                });
        }
    }
};
</script>

<template>
    <div>
        <button @click="initiatePayment">Pay Now</button>
    </div>
</template>
