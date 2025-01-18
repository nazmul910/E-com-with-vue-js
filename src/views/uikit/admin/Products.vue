<script setup>
import { onMounted, reactive } from 'vue';
import { useFirestore } from 'vuefire';
const db = useFirestore();

import { doc, addDoc, collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

const state = reactive({
    id: '',
    name: '',
    price: 0,
    quantity: 0,
    productUrl: '',
    description: '',
    productData: [],
    visibleAddProduct: true
});

const addProductInDb = async () => {
    console.log('Product: ', state);

    const docRef = await addDoc(collection(db, 'products'), {
        name: state.name,
        price: state.price ,
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

onMounted(async () => {

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
});
</script>

<template>
    <Fluid>
        <div class="flex flex-col md:flex-row w-full">
            <div class="md:w-full card flex xm:flex-col-reverse lg:grid grid-cols-2">
                <div class="xl:w-1/2">
                    <div v-if="state.productData.length > 0" class="flex justify-end">
                        <div class="">
                            <p class="text-green-500 font-bold">Your product list in your inventory</p>
                            <div v-for="product in state.productData" :key="product" class="m-4">
                                <div class="grid grid-cols-1 border rounded-md p-4" >
                                    <div>
                                        <img :src="product.productUrl" alt="" class="w-full h-[200px] object-cover" />
                                    </div>
                                    <div class="grid grid-cols-1 mt-1">
                                        <h1 class="text-xl font-bold">{{ product.name }}</h1>
                                        <p>{{ product.description }}</p>
                                        <p>{{ product.price }} - Quantity-{{ product.quantity }}</p>
                                        <div class="flex gap-4 mt-1">
                                            <Button @click="deleteProduct(product)" label="Delete" severity="secondary" outlined class="w-full" />
                                            <Button @click="updateStateProductData(product)" label="Update" class="w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="card flex justify-center items-center">
                        <p class="text-red-500">Your have no product in your inventory</p>

                        <div>
                            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                        </div>
                    </div>
                </div>
                <div class="">
                    <section v-if="state.visibleAddProduct">
                        <div class="font-semibold text-xl">Product Add</div>
                        <div class="flex flex-col gap-2">
                            <label for="name1">Name</label>
                            <InputText id="name1" type="text" v-model="state.name" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Price</label>
                            <InputText id="email1" type="number" min="0" v-model="state.price" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Quantity</label>
                            <InputText id="email1" type="number" min="0" v-model="state.quantity" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Product Url</label>
                            <InputText id="email1" type="url" v-model="state.productUrl" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Description</label>
                            <textarea id="email1" type="text" class="border" v-model="state.description" />
                        </div>
                        <Button label="Submit" icon="pi pi-check" iconPos="right" @click="addProductInDb" class="my-5" />
                    </section>
                    <section v-else>
                        <div class="font-semibold text-xl">Product Update</div>
                        <div class="flex flex-col gap-2">
                            <label for="name1">Name</label>
                            <InputText id="name1" type="text" v-model="state.name" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Price</label>
                            <InputText id="email1" type="number" min="0" v-model="state.price" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Quantity</label>
                            <InputText id="email1" type="number" min="0" v-model="state.quantity" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Product Url</label>
                            <InputText id="email1" type="url" v-model="state.productUrl" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Description</label>
                            <textarea id="email1" type="text" class="border" v-model="state.description" />
                        </div>
                        <Button label="Udate" icon="pi pi-check" iconPos="right" severity="warn" @click="updateProduct()" class="my-5" />
                    </section>
                </div>
            </div>
        </div>
    </Fluid>
</template>
