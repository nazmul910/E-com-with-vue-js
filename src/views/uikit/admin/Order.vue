<script setup>
import { onMounted, reactive } from 'vue';
import { useFirestore } from 'vuefire';
const db = useFirestore();

import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
const state = reactive({
    orderData: []
});

const courierOder = async (id, order) => {
    try {
        const specificOrderRef = await doc(db, 'Order', id);
        await updateDoc(specificOrderRef, {
            ...order,
            courier: true
        });
        alert('Order Update successfully');
        reFatch();
    } catch (e) {
        console.log('Erorr getting products document: ', e);
    }
};
const reFatch = async () => {
    const orderArray = [];
    const querySnapShot = await getDocs(collection(db, 'Order'));
    querySnapShot.forEach((doc) => {
        orderArray.push({ ...doc.data(), id: doc.id });
    });

    state.orderData = [...orderArray];
    
};

onMounted(async () => {
    try {
        await reFatch();
    } catch (e) {
        console.log('Erorr getting products document: ', e);
    }
});
</script>

<template>
    <h1>Hellow</h1>
    <div class="w-full">
        <div v-if="state.orderData.length > 0" class=" ">
            <div>
                <p class="text-green-500 font-bold">Your order list in your inventory</p>
                <div v-for="order in state.orderData" :key="order.id" class="w-full my-1 border border-gray-300 py-6 px-2 md:px-8">
                    <section class="md:flex justify-between items-center">
                        <section class="capitalize">
                            <p>Name: {{ order?.name }}</p>
                            <p>Address: {{ order?.address }}</p>
                            <p>Phone: {{ order?.phone }}</p>
                        </section>
                        <section class="">
                            <div class="md:flex" v-for="product in order?.orderproduct" :key="product.id">
                                <div class="my-4 grid grid-cols-2 gap-x-5 border p-3">
                                    <div>
                                        <p>Name:{{ product.name }}</p>
                                        <p>Price:{{ product.price }}</p>
                                        <p>Total Quantity:{{ product.totalOrderQuantity }}</p>
                                    </div>
                                    <div>
                                        <img :src="product.productUrl" alt="" class="w-[100px] h-[70px]" />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <Button v-if="!order?.courier" label="Complate" severity="warn" class="w-full" @click="courierOder(order?.id, order)" />
                            <Button v-else label="Order Complated" severity="primary" class="w-full" disabled />
                        </section>
                    </section>
                </div>
            </div>
        </div>
        <div v-else class="card flex justify-center items-center">
            <p class="text-red-500">You have no order in your inventory</p>

            <div>
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </div>
        </div>
    </div>
</template>
