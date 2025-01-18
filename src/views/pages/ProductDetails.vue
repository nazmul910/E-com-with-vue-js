<script setup>
import Header from '@/components/shared/Header.vue';
import Hero from '@/components/product-details/Hero.vue'
import ProductCategory from '@/components/landing-page/hero/job-categories/section.vue';
import Product from '@/components/landing-page/hero/product/Section.vue'
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            <Hero/>
            <!-- <section class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 ">
                <ProductCategory />
            </section>
            <Product/> -->
        </div>
    </div>
</template>
