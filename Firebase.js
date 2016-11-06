var firebase = require('firebase');



var config = {
  apiKey: "AIzaSyCc0DrjEewFUDFjBReud_oWXW-WChiGzoA",
  authDomain: "otimizacaoimagem.firebaseapp.com",
  databaseURL: "https://otimizacaoimagem.firebaseio.com",
  storageBucket: "otimizacaoimagem.appspot.com",
  messagingSenderId: "217900485453"
};


var app = firebase.initializeApp(config);

var  database = app.database();

database.ref("/").set({'1':'1'});
