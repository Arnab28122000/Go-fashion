import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCxu4w_CpkKtZi_o8tuQ-LMkYRSor8aMio",
    authDomain: "crwn-db-c9d3f.firebaseapp.com",
    projectId: "crwn-db-c9d3f",
    storageBucket: "crwn-db-c9d3f.appspot.com",
    messagingSenderId: "469761612060",
    appId: "1:469761612060:web:d2f68f5a39d65d4da102d9",
    measurementId: "G-NVC52K366Y"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;