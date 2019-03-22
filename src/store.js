import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers

const firebaseConfig = {
    apiKey: "AIzaSyCdyoGGG0JG781S3Dxca6pYoHh7TuHjj8I",
    authDomain: "client-pannel-7cb3f.firebaseapp.com",
    databaseURL: "https://client-pannel-7cb3f.firebaseio.com",
    projectId: "client-pannel-7cb3f",
    storageBucket: "client-pannel-7cb3f.appspot.com",
    messagingSenderId: "218098336554"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Check for settings in localStorage


// Create initial state
const initialState = { };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  enhancer
);



const composeEnhancers =
  typeof window === 'object' &&
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : compose;

const enhancer = composeEnhancers(
  reactReduxFirebase(firebase),
    // other store enhancers if any
);    

export default store;