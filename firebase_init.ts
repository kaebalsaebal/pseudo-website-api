// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

var serviceAccount = require("./firebase_admin_key.json");

var dburl = serviceAccount.database_url;

delete serviceAccount.database_url;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dburl,
};

// Initialize Firebase
export const app = admin.initializeApp(firebaseConfig);
export const fs = getFirestore(app);
