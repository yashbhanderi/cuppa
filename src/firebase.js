// firestore

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJKt_rK1Y2nHkAxepvSeKeS1GtykND74c",
    authDomain: "cuppa-home-page.firebaseapp.com",
    databaseURL: "https://cuppa-home-page-default-rtdb.firebaseio.com",
    projectId: "cuppa-home-page",
    storageBucket: "cuppa-home-page.appspot.com",
    messagingSenderId: "957670161184",
    appId: "1:957670161184:web:7da37a9f388cc62761b545",
    measurementId: "G-4STCX9SC1K"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

// real-time

// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// function startFirebase() {
//     const firebaseConfig = {
//         apiKey: "AIzaSyCJKt_rK1Y2nHkAxepvSeKeS1GtykND74c",
//         authDomain: "cuppa-home-page.firebaseapp.com",
//         databaseURL: "https://cuppa-home-page-default-rtdb.firebaseio.com",
//         projectId: "cuppa-home-page",
//         storageBucket: "cuppa-home-page.appspot.com",
//         messagingSenderId: "957670161184",
//         appId: "1:957670161184:web:7da37a9f388cc62761b545",
//         measurementId: "G-4STCX9SC1K",
//     };

//     const app = initializeApp(firebaseConfig);
//     return getDatabase(app);
// }

// export default startFirebase;
