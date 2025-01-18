
import { reactive } from 'vue';

// export const store = reactive({
//     atCartProducts: 0,
// });

const state = reactive({
    atToCart: [],
    buyNowProduct:{},
})

export function useState() {
    return{
        state
    }
}