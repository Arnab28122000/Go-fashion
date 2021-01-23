import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: `${process.env.REACT_APP_UNSPLASH_KEY}`,
    authDomain: `${process.env.REACT_APP_authDomain}`,
    projectId: `${process.env.REACT_APP_projectId}`,
    storageBucket: `${process.env.REACT_APP_storageBucket}`,
    messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
    appId: `${process.env.REACT_APP_appId}`,
    measurementId: `${process.env.REACT_APP_measurementId}`
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
