import { initializeApp } from "firebase/app";
import {
	getAuth,
	initializeAuth,
	getReactNativePersistence,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
	apiKey: "AIzaSyD2BqjwJzeIqznxjZccE4OiPiukj1PnFQI",
	authDomain: "todo-list-97737.firebaseapp.com",
	projectId: "todo-list-97737",
	storageBucket: "todo-list-97737.appspot.com",
	messagingSenderId: "30509127691",
	appId: "1:30509127691:web:198e7efb443c7a4923cf0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	db,
	doc,
	setDoc,
	getDoc,
	updateDoc,
	deleteDoc,
};

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }
