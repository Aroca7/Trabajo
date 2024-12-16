const firebaseConfig = {
    apiKey: "AIzaSyDlONId6HOJVbW3EUmbdMSRZxb9LzOUvM8",
    authDomain: "formularios-d6e70.firebaseapp.com",
    databaseURL: "https://formularios-d6e70-default-rtdb.firebaseio.com",
    projectId: "formularios-d6e70",
    storageBucket: "formularios-d6e70.firebasestorage.app",
    messagingSenderId: "766538634455",
    appId: "1:766538634455:web:01a6444cca0b7e80598c92",
    measurementId: "G-3RLTJK7L6H"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();