const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAMr2z9PlYuNdJa91stdNOk_RqYi2bTrg",
    authDomain: "chat-67597.firebaseapp.com",
    databaseURL: "https://chat-67597-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-67597",
    storageBucket: "chat-67597.appspot.com",
    messagingSenderId: "322624617573",
    appId: "1:322624617573:web:2bb20795193ee8ba13da8c",
    measurementId: "G-6BFBN0XKRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);