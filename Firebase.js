var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCQPghWQJJ6Rrc2iSZBo6PxXyGfhaOpeJw",
    authDomain: "conectando-arduino.firebaseapp.com",
    databaseURL: "https://conectando-arduino.firebaseio.com",
    storageBucket: "conectando-arduino.appspot.com",
    messagingSenderId: "916937028700"
  };


var app = firebase.initializeApp(config);

var  database = app.database();
module.exports = database;
