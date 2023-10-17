import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsVC3cr7bxVUYKkZ0z_o4C8T9O1QLfk3E",
  authDomain: "shard-ba2df.firebaseapp.com",
  projectId: "shard-ba2df",
  storageBucket: "shard-ba2df.appspot.com",
  messagingSenderId: "712346273864",
  appId: "1:712346273864:web:615c240b80c5acf55fb07d"
};

firebase.initializeApp(firebaseConfig);

export { firebase };