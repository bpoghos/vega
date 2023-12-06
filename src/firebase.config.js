import { initializeApp } from 'firebase/app';
import Firestore from 'firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDAqSIXEjcxEmdNwru5XzDO_irk4GrwZh0",
    authDomain: "vega-project-6890c.firebaseapp.com",
    projectId: "vega-project-6890c",
    storageBucket: "vega-project-6890c.appspot.com",
    messagingSenderId: "269747098127",
    appId: "1:269747098127:web:f9b22b4fd0875944ab097a"
};

const app = initializeApp(firebaseConfig)

const db = Firestore(app)

export { app, db }