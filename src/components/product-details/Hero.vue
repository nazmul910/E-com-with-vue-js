<script setup>
import { useState } from '@/composables/store';
// import payment from '@/components/payment/PaymentComponent.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
const { state } = useState();
const router = useRouter();


const validUser = ref(false)

const addToCart = (product) => {
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

    router.push('/add-to-cart');
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
    <div
        id="hero"
        class="h-[100vh]"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="">
            <div class="py-10">
                <h1 class="text-6xl text-center my-10 md:px-10">
                    <span class="font-light block text-5xl sm:text-3xl md:text-7xl lgg:text-8xl lgg:px-12">Welcome to s-Shop - Quality Products at Your Fingertips!</span>
                </h1>

                <div class="flex xm:px-5 md:grid grid-cols-2 items-start md:px-10 gap-2 pt-10 lgg:px-12">
                    <div class="font-normal xm:text-xl md:text-4xl text-gray-700 lgg:text-5xl xl:flex flex-col items-center">
                        <p>{{ state.buyNowProduct.name }}</p>
                        <p>{{ state.buyNowProduct.price }}</p>
                        <p>{{ state.buyNowProduct.description }}</p>
                        <!-- <Button label="Buy Now" @click="buyNow(state.buyNowProduct.id)" rounded class="!text-xl mt-8 !px-4"></Button> -->

                        <!-- <div>

                            <button v-if="state.buyNowProduct.name">
                        <payment />
                    </button>
                        </div > -->

                        <div class="mt-4 space-y-4 md:space-x-5">
                            <div>
                                <Button label="All Products" as="router-link" to="/productpage" rounded></Button>

                                <div>
                                    <Button v-if="!validUser" label="Buy Now" @click="signIn()" severity="help" rounded class="" />
                                    <Button v-else label="Buy Now" @click="addToCart(state.buyNowProduct)" severity="help" rounded class="" />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div>
                        <img
                            :src="state.buyNowProduct.productUrl ? state.buyNowProduct.productUrl : 'https://www.pngall.com/wp-content/uploads/4/Headphone-Transparent-PNG.png'"
                            alt="Hero Image"
                            class="w-[200px] md:h-3/6 lgg:w-96 h-[200px] object-contain md:object-contain"
                        />
                    </div>
                </div>

            </div>
        </div>
        <!-- <div class="flex justify-center items-center md:justify-center md:items-center">
            <img src="/demo/images/landing/screen-1.png" alt="Hero Image" class="w-9/12 md:w-auto" />
            <img
                :src="state.buyNowProduct.productUrl ? state.buyNowProduct.productUrl : 'https://www.pngall.com/wp-content/uploads/4/Headphone-Transparent-PNG.png'"
                alt="Hero Image"
                class="w-[200px] md:w-full md:h-3/6 h-[200px] object-contain md:object-contain"
            />
        </div> -->
    </div>
</template>
