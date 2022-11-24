// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAq7nWtBjTvfQHZvKH1bzo9ZGZW_hfGHnE",
  authDomain: "qwikcart-7739.firebaseapp.com",
  databaseURL: "https://qwikcart-7739-default-rtdb.firebaseio.com",
  projectId: "qwikcart-7739",
  storageBucket: "qwikcart-7739.appspot.com",
  messagingSenderId: "287769443598",
  appId: "1:287769443598:web:ed35f501a4d21ea02ceb5f",
  measurementId: "G-NXF3VDKTD8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const db = getFirestore(app.databaseURL);


export const db = getDatabase(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}


//console.log(db);

// Get a list of cities from your database
export async function getFireStoreProducts(db) {
    console.log("test");
    const productsCol = collection(db, '/products');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map(doc => doc.data());
    let products = [];
    products.push({"products": productList});
    console.log(products);
    return products;
  }

//const analytics = getAnalytics(app);