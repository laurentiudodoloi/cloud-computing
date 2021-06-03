import {createApp} from 'vue'
import firebase from "firebase";

import App from './App.vue'

import {store} from './store'
import router from './router';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')

var firebaseConfig = {
    apiKey: "AIzaSyBGvyifp9SdhghXtIgwkXqVM_Fv0_Jdx80",
    authDomain: "cc-project-cf34c.firebaseapp.com",
    projectId: "cc-project-cf34c",
    storageBucket: "cc-project-cf34c.appspot.com",
    messagingSenderId: "360827555764",
    appId: "1:360827555764:web:db8e7e8bff09508c85ece1",
    measurementId: "G-LZV7VXW8X1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let app;

firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if (!app) {
        app = new createApp({
            router,
            render: h => h(App)
        }).$mount('#app')
    }
})
