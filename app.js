var firebase = require("firebase");

var express = require('express');

var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies

    extended: true

}));

firebase.initializeApp({

      apiKey: "AIzaSyAWD7noPfQsrc0mjq9KJgGRvqJWWYXQ7TI",
            authDomain: "campus-trends.firebaseapp.com",
            databaseURL: "https://campus-trends.firebaseio.com",
            storageBucket: "campus-trends.appspot.com",
            messagingSenderId: "425903145524"

});

var fireRef = firebase.database().ref('todos');

var port = process.env.PORT || 3000;

app.listen(port, function () {

    console.log('Example app listening on port ' + port);

});
