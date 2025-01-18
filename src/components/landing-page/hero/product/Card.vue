<script setup>

import { useState } from '@/composables/store';
import router from '@/router';
import { ref, onMounted } from 'vue';
const props = defineProps(['title', 'price', 'description', 'image', 'product']);
const { state } = useState();

const validUser = ref(false)

const addToCard = (product) => {
    if (state.atToCart.length !== 0) {
       

        const findProductFromAtToCart = state.atToCart.find((pd) => pd.id === product.id);

        if (findProductFromAtToCart === undefined) {
            state.atToCart = [...state.atToCart, product];
        }
        if (findProductFromAtToCart) {
            alert(`${findProductFromAtToCart.name} is already added!!`);
        }
    } else {
        state.atToCart = [...state.atToCart, product];
    }

    // state.atToCart = [...state.atToCart, product];
    // const checkItem = state.atToCart.find((item) => item.id === product.id);

    // if (checkItem) {
    //     alert(`${product.name}is already added`);
    // } else {
    //     state.atToCart = [...state.atToCart, product];
    // }

    // state.atToCart = product;

    // const sessionProduct = JSON.parse(sessionStorage.getItem('cartProduct'));

    // const productArray = sessionProduct ? [...sessionProduct] : [];

    // if (sessionProduct && sessionProduct.length > 0) {
    //     productArray.push(product);
    //     state.atCartProducts++;
    //     sessionStorage.setItem('cartProduct', JSON.stringify([productArray]));
    // } else {
    //     sessionStorage.setItem('cartProduct', JSON.stringify([product]));
    //     state.atCartProducts++;
    // }
};

const buyNow = (product) => {
    state.buyNowProduct = product;

    router.push(`/product/details?productId=${product.id}`);
};

const signIn = () =>{

    alert('Please Sign in Or Resitration !!!')
}


onMounted(() => {
    const email = sessionStorage.getItem('userEmail');
    if (email) {
        validUser.value = true;
    }
});
</script>

<template>
    <div class="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 lg:pb-8 mt-6 lg:mt-0 group">
        <div style="padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
            <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full overflow-hidden" style="border-radius: 8px">
                <div class="flex items-center justify-center h-[200px] overflow-hidden">
                    <img :src="image ? image : ''" class="w-full object-cover h-auto transition ease-in duration-300 hover:scale-125" />
                </div>
                <h5 class="mb-2 text-surface-900 dark:text-surface-0 text-[20px] md:text-[30px] lg:text-[35px] font-bold">{{ title ? title : '' }}</h5>
                <span class="text-surface-600 dark:text-surface-200">{{ description ? description : '' }}</span>
                <section class="md:flex justify-between md:pb-10">
                    <h5 class="mb-2 text-surface-900 dark:text-surface-0 text-[15px] md:text-[20px]">{{ price ? price : '' }}</h5>
                    <section class="md:flex grid gap-y-4">
                        <div class="md:transition md:mx-1 md:translate-x-72 md:ease-linear md:duration-300 md:group-hover:-translate-x-0">
                            <Button v-if="!validUser" icon="pi pi-heart" class="w-full text-xs sm:text-xs md:text-base" label="Cart" severity="help" @click="signIn()" rounded aria-label="Favorite" />
                            <Button v-else icon="pi pi-heart" class="w-full text-xs sm:text-xs md:text-base" label="Cart" severity="help" @click="addToCard(props.product)" rounded aria-label="Favorite" />
                            <!-- <Button icon="pi pi-heart" label="Dect" severity="help" @click="descres()" rounded aria-label="Favorite" /> -->
                        </div>
                        <div class="md:transition md:mx-2 md:translate-x-72 md:ease-linear md:duration-300 md:group-hover:-translate-x-1">
                            <Button class="text-xs sm:text-xs md:text-base w-full" icon="pi pi-check" label="Buy Now" severity="info" rounded aria-label="Favorite" @click="buyNow(props.product)" />
                        </div>
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped>



</style>
