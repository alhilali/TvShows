import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD88JBHlcP8qIqFFcxDvckfmEuYfWGxpxo",
    authDomain: "tvtracker-8f869.firebaseapp.com",
    databaseURL: "https://tvtracker-8f869.firebaseio.com",
    projectId: "tvtracker-8f869",
    storageBucket: "tvtracker-8f869.appspot.com",
    messagingSenderId: "155087385939"
  };

firebase.initializeApp(config)

export const database = firebase.database();

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
