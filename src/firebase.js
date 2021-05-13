import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDrMtfmS_v0Ckvx3VIxeCHKDakHuRFgoVw",
    authDomain: "disneyplus-142a7.firebaseapp.com",
    projectId: "disneyplus-142a7",
    storageBucket: "disneyplus-142a7.appspot.com",
    messagingSenderId: "12717281267",
    appId: "1:12717281267:web:abd79d868fcf81075d4c86",
    measurementId: "G-MG3CN8R0L1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();
  
  export { auth, provider, storage };
  export default db;