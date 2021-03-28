import firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';


    var firebaseConfig = {
        apiKey: "AIzaSyAhtYO-ciJ2yxU2tnpznx5fXYtZPcZiOxg",
        authDomain: "football-25167.firebaseapp.com",
        databaseURL: "https://football-25167-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "football-25167",
        storageBucket: "football-25167.appspot.com",
        messagingSenderId: "499924534115",
        appId: "1:499924534115:web:759b4011be558e0b2e4956",
        measurementId: "G-ZWBS8MGDS8"
    };
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);

    const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, timestamp }