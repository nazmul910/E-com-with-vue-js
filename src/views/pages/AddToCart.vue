<script setup>
import Header from '@/components/shared/Header.vue';
import { useState } from '../../composables/store.js';
import { onMounted, reactive } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirestore } from 'vuefire';
const db = useFirestore();
const router = useRouter();

import { addDoc, collection } from 'firebase/firestore';

const { state } = useState();

const localState = reactive({
    atToCart: [],
    nextClicked: false,
    userData: {}
});

const picked = ref('');

console.log('state', state);
const quantityIncrease = (e, product) => {
    const localQuantity = e.target.value;
    if (Number(localQuantity) <= 0) {
        alert('You cant give nagetive quantity');
        e.target.value = 1;
        return;
    }

    if (Number(localQuantity) > Number(product.quantity)) {
        alert('You cant give the quantity more than ' + product.quantity);
        e.target.value = 1;
        return;
    }

    const updateTheQuantity = localState.atToCart.find((pd) => pd.id === product.id);

    updateTheQuantity.totalOrderQuantity = localQuantity;

    // updateTheQuantity.quantity = updateTheQuantity.quantity - localQuantity;


};

const next = () => {
    const quantityFlag = localState.atToCart.find((pd) => pd.totalOrderQuantity === '');
    if (quantityFlag) {
        alert('Please give product quantity of all products');
        return;
    }
    // console.log('Local  Ordered Product', localState.atToCart);
    // console.log('State Ordered Product', state.atToCart);
    localState.nextClicked = true;
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData.email) {
        console.log('userData:', userData);
        localState.userData = userData;
    } else {
        alert('Please logged in otherwise you can not order');
    }
};

const deletCartProduct = (product) => {
    if (product) {
        if (confirm('are you sure you want to delete this product?')) {
            const filterCartProduct = localState.atToCart.filter((prd) => prd.id !== product.id);
            localState.atToCart = filterCartProduct;
            state.atToCart = filterCartProduct;
        }
    }
};

const cashOnDelivery = async () => {
    const orderObject = {
        email: localState.userData?.email,
        name: localState.userData?.name,
        address: localState.userData?.address,
        phone: localState.userData?.phone,
        orderproduct: state.atToCart,
        payment: false,
        paymentId: ''
    };
    try {
        const docRef = await addDoc(collection(db, 'Order'), { ...orderObject });

        alert('Order Add successfully , Please wait till than get your product');
        state.atToCart = [];
        localState.atToCart = [];
        router.push('/');
    } catch (err) {
        alert('error occurred while creating account');
    }

    
};

onMounted(() => {
    localState.atToCart = [...state.atToCart];
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            <section class="py-6 px-6 mx-0 md:mx-12 lg:mx lg:px-20 lg:static">
                <section class="grid">
                    <section>
                        <section v-if="localState.atToCart && localState.atToCart.length > 0">
                            <div class="w-full border mt-2 border-gray-300 py-10 px-8" v-for="product in localState.atToCart" :key="product.id">
                                <section class="xm:grid xm:gap-y-3 sm:flex items-center justify-between">
                                    <section class="capitalize">
                                        <p>Name: {{ product.name }}</p>
                                        <p>description:{{ product.description }}</p>
                                        <p>price:{{ product.price }}</p>
                                    </section>
                                    <section class="flex items-center xm:space-x-7 sm:space-x-2">
                                        <section class="md:mx-10">
                                            <img :src="product.productUrl" class="w-[100px]" />
                                        </section>
                                        <section class="xm:grid">
                                            <label class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Quantity({{ product.quantity }})</label>
                                            <input value="1" type="number" placeholder="Quantity" @blur="(e) => quantityIncrease(e, product)" class="w-1/3 xm:w-full md:w-[10rem] mb-0 border py-2 px-4" />
                                            <Button label="Delete" @click="deletCartProduct(product)" severity="danger" class="mt-2 md:mt-3" />
                                        </section>
                                    </section>
                                </section>
                            </div>
                        </section>
                        <section v-else>
                            <p>there is no product in cart</p>
                        </section>
                    </section>
                    <section v-if="localState.nextClicked" class="w-full md:mx-10 mt-2 border-gray-300 py-10">
                        <p class="py-8 text-[24px]">Shipping details</p>
                        <section class="md:flex">
                            <section class="md:me-4">
                                <label for="" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
                                <input type="text" placeholder="Name" class="w-full cursor-not-allowed md:w-[10rem] mb-8 border py-2 px-4" :value="localState.userData.name" readonly />
                            </section>
                            <section class="md:mx-4">
                                <label for="" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                                <input type="email" placeholder="Name" class="w-full cursor-not-allowed md:w-[10rem] mb-8 border py-2 px-4" :value="localState.userData.email" readonly />
                            </section>
                            <section class="md:mx-4">
                                <label for="" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Phone</label>
                                <input type="phone" placeholder="Phone" class="w-full md:w-[10rem] mb-8 border py-2 px-4" :value="localState.userData.phone" />
                            </section>
                            <section class="md:mx-4">
                                <label for="" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Address</label>
                                <input type="text" placeholder="Address" class="w-full md:w-[10rem] mb-8 border py-2 px-4" :value="localState.userData.address" />
                            </section>
                        </section>
                        <section>
                            <p class="py-8 text-[24px]">Delevery Option</p>
                            <section class="grid md:flex">
                                <div>
                                    <input type="radio" class="px-4" id="one" value="One" v-model="picked" />
                                    <label for="one" class="px-4">Cash on delivery</label>
                                </div>
                                <div>
                                    <input type="radio" class="px-4" id="two" value="Two" v-model="picked" />
                                    <label for="two" class="px-4">Payment Gateway</label>
                                </div>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="py-4 flex justify-end" v-if="localState?.atToCart.length > 0">
                    <Button v-if="!localState.nextClicked" label="Next" @click="next" severity="help" class="mx-4" />
                    <Button v-if="picked === 'One'" label="Place Order" severity="" class="mx-4" @click="cashOnDelivery" />
                    <Button v-if="picked === 'Two'" label="Maintenance Break..." severity="" disabled class="mx-4" @click="cashOnDelivery" />

                </section>
            </section>
        </div>
    </div>
</template>
