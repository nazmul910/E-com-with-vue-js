import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: `${import.meta.API_KEY}`,
    authDomain: `${import.meta.AUTH_DOMAIN}`,
    projectId: "crud-dc496",
    storageBucket: `${import.meta.STORAGE_BUCKET}`,
    messagingSenderId: `${import.meta.MESSEAGING_SENDER_ID}`,
    appId: `${import.meta.APP_ID}`
});

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const todosRef = collection(db, 'todos');

//   apiKey: "AIzaSyAOijMrFk8SHq881eCRljLhNX-bLFvI4kE",
//   authDomain: "crud-dc496.firebaseapp.com",
//   projectId: "crud-dc496",
//   storageBucket: "crud-dc496.appspot.com",
//   messagingSenderId: "418447863010",
//   appId: "1:418447863010:web:c3c52a57e6596a436a02bb"

//     apiKey: `${import.meta.API_KEY}`,
//     authDomain: `${import.meta.AUTH_DOMAIN}`,
//     projectId: `${import.meta.PROJECT_ID}`,
//     storageBucket: `${import.meta.STORAGE_BUCKET}`,
//     messagingSenderId: `${import.meta.MESSEAGING_SENDER_ID}`,
//     appId: `${import.meta.APP_ID}`
