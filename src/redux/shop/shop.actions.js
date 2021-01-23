import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH__COLLECTIONS_START,
});

export const fetchCollectionSuccess = collectionsMap =>  ({
    type: ShopActionTypes.FETCH__COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH__COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionsStart());

        collectionRef.get().then((snapshot) => {
            const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
            dispatch(fetchCollectionSuccess(collectionsMap));
        }).catch(error => 
            dispatch(fetchCollectionsFailure(error.message)));
    };
}