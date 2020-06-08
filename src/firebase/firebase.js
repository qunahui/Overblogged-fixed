const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence('session');
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { firebase, googleAuthProvider, storage, database as default };

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })

//child_removed, child_added, child_changed

// const onValueChange = database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });
// const expenses = [{
//     description: 'Gum',
//     note: '',
//     amount: 195,
//     createAt: 0
// },
// {
//     description: 'Rent',
//     note: '',
//     amount: 195000,
//     createAt: 1000
// },
// {
//     description: 'Credit',
//     note: '',
//     amount: 4500,
//     createAt: 2000
// }
// ];

// expenses.forEach((expense) => {
//     database.ref('expenses').push(expense);
// })

// const onValueChange = database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is an ${val.job.title} at ${val.job.company}`);
// }, (e) => {
//     console.log('Error with data fetching: ', e);
// });


// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('Error: ', e);
//     });


// database.ref().set({
//     name: 'Huii',
//     age: 20,
//     stressLevel: 9,
//     job: {
//         title: 'Unemployed',
//         company: 'Home'
//     },
//     isSingle: true,
//     location: {
//         city: 'Ho Chi Minh',
//         country: 'Vietnam'
//     }
// }).then(() => {
//     console.log('Data saved!');
// }).catch((e) => {
//     console.log('Something wrong !', e);
// });

// database.ref().update({
//     stressLevel: 10,
//     'location/city': 'Saigon'
// });

// database.ref('attributes').set({
//     height: '165cm',
//     weight: '65kg'
// }).then(() => {
//     console.log('Second set is saved!');
// }).catch((e) => {
//     console.log('Something wrong in second set, error: ', e);
// });

// database.ref('isSingle')
//     .remove() // remove === set(null)
//     .then(() => {
//         console.log('isSingle data removed!');
//     })
//     .catch((e) => {
//         console.log('Remove isSingle went wrong, error: ', e);
//     });