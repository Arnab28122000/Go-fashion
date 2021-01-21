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


export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();
    if(!snapshot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
               displayName,
               email,
               createdAt,
               ...addtionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef= collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapShotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map( docSnapshot => {
        const { title, items } = docSnapshot.data();

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        };
    });
    
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
