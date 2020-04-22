/* eslint-disable no-alert, no-console */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import * as CONFIG from "../env";

const firebaseApp = firebase.initializeApp(CONFIG.FIREBASE_CONFIG);
console.log(firebaseApp);

export const login = (email: string, password: string) => {
  return firebaseApp.auth().signInWithEmailAndPassword(email, password);
};
export const logout = () => {
  return firebaseApp.auth().signOut();
};
export const createAccount = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
};

export const authInit = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseApp
      .auth()
      .onAuthStateChanged((firebaseUser) => {
        unsubscribe();
        resolve(firebaseUser);
        return;
      });
  });
};

export default firebaseApp;
