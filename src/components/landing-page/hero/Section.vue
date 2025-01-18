<template>
    <div
        id="hero"
        class="grid grid-cols-1 md:grid-cols-2 pt-6 px-6 lg:px-20 overflow-hidden h-[100vh]"
        style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
    >
        <div class="mx-6 md:mx-20 mt-0 md:mt-6 flex items-center">
            <div>
                <h1 class="xl:text-5xl lg:text-4xl md:text-2xl sm:text-4xl text-xl font-bold text-gray-900 leading-tight">
                    <span class="font-light block">Welcome to s-Shop - Quality Products at Your Fingertips!</span>Discover the best deals,handpicked products, and fast delivery,all in one place.
                </h1>
                <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">Shop Now" | "Explore Categories"</p>
               
                <Button label="All Products" as="router-link" to="/products" rounded class="!text-xl mt-8 !px-4"></Button>
            </div>
        </div>
        <div class="flex justify-center md:justify-end md:items-center">
            <!-- <img src="/demo/images/landing/screen-1.png" alt="Hero Image" class="w-9/12 md:w-auto" /> -->
            <img src="https://www.pngall.com/wp-content/uploads/4/Headphone-Transparent-PNG.png" alt="Hero Image" class="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-full 2xl:h-full object-contain" />
        </div>
    </div>
</template>
