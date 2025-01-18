<script setup>
import Header from '@/components/shared/Header.vue';
import { useState } from '@/composables/store';
import { computed, reactive } from 'vue';
// import { ref } from 'firebase/database';
// import { reactive } from 'vue';
const { state } = useState();

console.log('state1: ', state.atToCart);

state.atToCart = state.atToCart.map((item) => ({
    ...item,
    quantity: item.quantity || 1,
    unitPrice: item.unitPrice || item.price
}));

// const incre = (id) => {
//     const item = state.atToCart.find((item) => item.id === id);
//     if (item) {
//         item.quantity++;
//         item.price = item.quantity * item.unitPrice;
//     }
// };

// const decre = (id) => {
//     const item = state.atToCart.find((item) => item.id === id);
//     if (item.quantity > 1) {
//         item.quantity--;
//         item.price = item.quantity * item.unitPrice;
//     }
// };

// const totalPrice = computed(() => {
//     let toPrice = state.atToCart.reduce((total, item) => total + item.price);
//     return toPrice;
// });
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
        </div>
    </div>
    <div class="mt-5 mb-5">
        <h1 class="text-center font-extrabold text-5xl">Your Selected Items</h1>
    </div>
    <hr />
    <div v-for="states in state.atToCart" :key="states.id" class="flex justify-evenly items-center mb-2 mt-5 bg-white">
        <div class="flex justify-between items-center">
            <img :src="states.productUrl" alt="" class="w-[150px] h-[100px] object-cover" />
        </div>
        <div>
            <p class="text-xl font-bold">{{ states.name }}</p>
        </div>
        <div class="flex justify-between items-center">
            <button class="font-bold text-5xl px-12 rounded" @click="decre(states.id)">-</button>
            <p class="text-xl font-bold" id="quantity">{{ states.quantity }}</p>
            <button class="font-bold text-4xl px-12 rounded" @click="incre(states.id)">+</button>
        </div>

        <div>
            <p class="text-xl font-bold">{{ states.price }} BDT</p>
        </div>
    </div>
    <hr class="container mx-auto mt-28 border border-green-700">
    <div class="mt-10">
        <h2 class="container mx-auto text-center font-extrabold text-3xl">Total Price: {{ totalPrice.price }} BDT</h2>
    </div>
</template>
