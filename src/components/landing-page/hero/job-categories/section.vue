<script setup>
import { reactive } from 'vue';
import category from './category.vue';
const state = reactive({
    categoies: [
        { id: 1, name: 'Women' },
        { id: 2, name: 'Man' },
        { id: 3, name: 'Baby' },
        { id: 4, name: 'Electronics'}
    ]
});
</script>

<template>
    <section class="container mx-auto px-6">
        <section class="sm:pb-10 border-b-2 pb-4">
            <span v-for="category in state.categoies" :key="`${category}-key`">
                <category :name="category.name" :total-vacancy="category.totalVacancy" />
            </span>
        </section>
    </section>
</template>
