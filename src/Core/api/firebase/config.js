import { decode, encode } from 'base-64'
import './timerConfig'
global.addEventListener = x => x
if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}

import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
  // apiKey: 'AIzaSyBVQpzMdtbRIhI0JsjrFwqGK0NmuKmIAXM',
  // authDomain: 'testnewchat-e659e.firebaseapp.com',
  // databaseURL: 'https://testnewchat-e659e.firebaseio.com',
  // projectId: 'testnewchat-e659e',
  // storageBucket: 'testnewchat-e659e.appspot.com',
  // // appId: '1:547557644237:ios:6b8d6993f9850301441684',
  // messagingSenderId: '547557644237',
  // appId: '1:547557644237:web:3747802542822ba3441684',
  // measurementId: 'G-D733PBTEVZ',
  apiKey: "AIzaSyB-kgM5eAVY2VXXUVnY_SQDebhufT7z7YE",
  authDomain: "melinda-60bbf.firebaseapp.com",
  databaseURL: "https://melinda-60bbf.firebaseio.com",
  projectId: "melinda-60bbf",
  storageBucket: "melinda-60bbf.appspot.com",
  messagingSenderId: "576394780151",
  appId: "1:576394780151:web:b99cf7b4cf3f6010f762f2",
  measurementId: "G-1N0XV36JW6"
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export { firebase }
