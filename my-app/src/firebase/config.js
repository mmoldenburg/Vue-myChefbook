import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBVqK37D2iH0HM7NX1wX4iCfbrPlxG70Tg",
    authDomain: "mychefbook-4ea36.firebaseapp.com",
    projectId: "mychefbook-4ea36",
    storageBucket: "mychefbook-4ea36.appspot.com",
    messagingSenderId: "558671995856",
    appId: "1:558671995856:web:0592e180e8d9435fc9cfd5"
  };
//   init firebase
firebase.initializeApp(firebaseConfig)
// init services
const auth = firebase.auth()
const db = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp


export { db, auth, timestamp }