<script setup>
import { onMounted, reactive } from 'vue';
import { useFirestore } from 'vuefire';
const db = useFirestore();

import { doc, addDoc, collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

const state = reactive({
    // id: '',
    // name: '',
    // price: 0,
    // quantity: 0,
    // productUrl: '',
    // description: '',
    reviweData: []
    // visibleAddProduct: true
});

const addProductInDb = async () => {
    console.log('Product: ', state);

    const docRef = await addDoc(collection(db, 'products'), {
        name: state.name,
        price: state.price,
        quantity: state.quantity,
        productUrl: state.productUrl,
        description: state.description
    });
    console.log('Product Add Successfully', docRef);
    state.name = '';
    state.price = 0;
    state.quantity = 0;
    state.description = '';
    state.productUrl = '';

    const querySnapShot = await getDocs(collection(db, 'products'));
    const productArray = [];
    querySnapShot.forEach((doc) => {
        productArray.push(doc.data());
    });
    state.productData = productArray.reverse();
};

const deleteProduct = async (product) => {
    await deleteDoc(doc(db, 'products', product.id));
    console.log('delete PRoduct: ', product);
    const querySnapShot = await getDocs(collection(db, 'products'));
    const productArray = [];
    querySnapShot.forEach((doc) => {
        productArray.push(doc.data());
    });
    state.productData = [...productArray];
};

const updateStateProductData = (product) => {
    state.visibleAddProduct = false;
    state.name = product.name;
    state.id = product.id;
    state.price = product.price;
    state.quantity = product.quantity;
    state.description = product.description;
    // state.productUrl = product.productUrl;
    alert('Are you sure want to update this product');
};
const updateProduct = async () => {
    const specificProductRef = await doc(db, 'products', state.id);

    await updateDoc(specificProductRef, {
        name: state.name,
        price: state.price,
        quantity: state.quantity,
        description: state.description
    });
    alert('Product update successfully!');

    state.name = '';
    state.id = '';
    state.price = 0;
    state.quantity = 0;
    state.description = '';

    state.visibleAddProduct = true;
    try {
        const productArray = [];
        const querySnapShot = await getDocs(collection(db, 'products'));
        querySnapShot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
        });

        state.productData = [...productArray];
    } catch (e) {
        console.log('Erorr getting products document: ', e);
    }
};

const disableReview = async (review) => {
    const specificReviewRef = await doc(db, 'reviews', review.id);
    await updateDoc(specificReviewRef, {
        status: false
    });
    try {
        const reviewArray = [];
        const querySnapShot = await getDocs(collection(db, 'reviews'));
        querySnapShot.forEach((doc) => {
            reviewArray.push({ ...doc.data(), id: doc.id });
        });

        state.reviweData = [...reviewArray];
    } catch (e) {
        console.log('Erorr getting products document: ', e);
    }
};

const enableReview = async (review) => {
    const specificenableReviewRef = await doc(db, 'reviews', review.id);
    await updateDoc(specificenableReviewRef, {
        status: true
    });
    try {
        const reviewArray = [];
        const querySnapShot = await getDocs(collection(db, 'reviews'));
        querySnapShot.forEach((doc) => {
            reviewArray.push({ ...doc.data(), id: doc.id });
        });

        state.reviweData = [...reviewArray];
    } catch (e) {
        console.log('Erorr getting products document: ', e);
    }
};

onMounted(async () => {
    const docRef = doc(db, 'todos', '5678');

    // const todos = useCollection(collection(db, 'todos'));
    // console.log('todos', todos);
    try {
        const reviewArray = [];
        const querySnapShot = await getDocs(collection(db, 'reviews'));
        querySnapShot.forEach((doc) => {
            reviewArray.push({ ...doc.data(), id: doc.id });
        });
        
        state.reviweData = [...reviewArray];
    } catch (e) {
        console.log('Erorr getting products document: ', e);
    }
});
</script>

<template>
    <Fluid>
        <div class="flex md:flex-row gap-8 w-full">
            <section>
                <div class="card w-12/12 card">All reviews</div>
                <div v-if="state.reviweData.length > 0">
                    <div v-for="(item, index) in state.reviweData" :key="index" class="card">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                            <div class="md:w-40 relative">
                                <img
                                    class="block xl:block mx-auto rounded w-full"
                                    :src="
                                        item.status
                                            ? `data:image/png;base64,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`
                                            : `data:image/jpeg;base64,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`
                                    "
                                    :alt="item.userId"
                                />
                                <!-- <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag> -->
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.userId }}</span>
                                        <div class="text-lg font-medium mt-2">{{ item.description }}</div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-8">
                                    <!-- <span class="text-xl font-semibold">${{ item.price }}</span> -->
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button icon="pi pi-trash" severity="danger" @click="disableReview(item)" label="Disable Review" :disabled="!item.status" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                        <Button icon="pi pi-shopping-cart" @click="enableReview(item)" label="Keep Review" :disabled="item.status" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>You have no review</p>
                </div>
            </section>
        </div>
    </Fluid>
</template>
