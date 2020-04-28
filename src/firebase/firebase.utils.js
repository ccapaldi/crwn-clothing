
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';




const config =  {
    apiKey: "AIzaSyA1Rm6V6uc40w1aBhT19Q4HcvhdwcZfeFw",
    authDomain: "crwnpdb.firebaseapp.com",
    databaseURL: "https://crwnpdb.firebaseio.com",
    projectId: "crwnpdb",
    storageBucket: "crwnpdb.appspot.com",
    messagingSenderId: "1059437374543",
    appId: "1:1059437374543:web:5d89963d725f98132b4e3a",
    measurementId: "G-QM12DGPR6H"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  console.log("I am here");

const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get(); 

  console.log(snapShot);
  if(!snapShot.exists) {
    console.log('creating');
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch(error){

      console.log('error creating user', error.message);
    }
  }
  console.log("Done");
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
