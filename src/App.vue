<script setup>
// import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// const router = useRouter();
// import { useFirestore } from 'vuefire';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// const db = useFirestore();


// onMounted(async () => {
//     const email = sessionStorage.getItem('email');
//     const password = sessionStorage.getItem('password');
//     console.log('email and password: ', email, password);

//     const q = query(collection(db, 'users'), where('email', '==', email), where('password', '==', password));

//     let flag = false;

//     const querySnapShot = await getDocs(q);
//     if (querySnapShot) {
//         querySnapShot.forEach((doc) => {
//             console.log(doc.id, ' => ', doc.data);
//             flag = true;
//         });
//     }
//     if (!flag) {
//         router.push('/auth/login');
//     }
// });
</script>

<template>
    <router-view />
</template>

<style scoped></style>
