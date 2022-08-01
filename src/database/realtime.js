const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyAhyYlaxSc6OxhCueIP02LVUqYbRo7g0g4",
    authDomain: "safetygrlrefactor.firebaseapp.com",
    databaseURL: "https://safetygrlrefactor-default-rtdb.firebaseio.com",
    projectId: "safetygrlrefactor",
    storageBucket: "safetygrlrefactor.appspot.com",
    messagingSenderId: "701015473036",
    appId: "1:701015473036:web:99d7ea2d94d6aaab4ef4a9",
    measurementId: "G-L2LE42HWGZ"
};

firebase.initializeApp(firebaseConfig);


/**
 * 
 * @webonly
 * 
 * @type Realtime {@link firebase.database.Database `Database`}
 * 
 * @returns {Database} The realtime database instance
 * 
 */
export function getDatabase() {
    return firebase.database();
}