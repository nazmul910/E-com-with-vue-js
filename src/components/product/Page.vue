<script setup>
import { onMounted, reactive } from 'vue';
import { useFirestore } from 'vuefire';
import { collection, getDocs } from 'firebase/firestore';
const db = useFirestore();

import Header from '@/components/shared/Header.vue';
import Category from '@/components/landing-page/hero/job-categories/section.vue';
import ProductCard from '@/components/landing-page/hero/product/Card.vue';

const localState = reactive({
    productData: []
});
onMounted(async () => {
    try {
        const productArray = [];
        const querySnapShot = await getDocs(collection(db, 'products'));
        querySnapShot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
        });

        localState.productData = [...productArray];
    } catch (e) {
        console.log('Erorr getting products document: ', e);
    }
});
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            <div class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
                <Category />
            </div>
            <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
                <div class="grid grid-cols-12 gap-4 justify-center">
                    <div class="col-span-12 text-center mt-20 mb-6">
                        <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Top Picks for You</div>
                        <span class="text-muted-color text-2xl">Check out our latest and treding products curated just for you.</span>
                    </div>

                    <ProductCard v-for="product in localState.productData" :title="product.name" :image="product.productUrl" :price="product.price" :description="product.description" :product="product" :key="product" />
                </div>
            </div>
        </div>
    </div>
</template>
