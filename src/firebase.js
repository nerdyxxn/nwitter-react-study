import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnqnAMXQYNElp_IcF0lF6uueBA2crbpsA",
  authDomain: "nwitter-c4a62.firebaseapp.com",
  projectId: "nwitter-c4a62",
  storageBucket: "nwitter-c4a62.appspot.com",
  messagingSenderId: "927083265593",
  appId: "1:927083265593:web:118ceeed00016f209e57e8",
};

export default firebase.initializeApp(firebaseConfig);
