import firebase from "firebase/app";
import { firebaseConfig } from "../components/database/db";

let firebase;

if (!firebase) {
  firebase = firebase.initializeApp(firebaseConfig)
}