
var firebase = require("firebase");
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/emptyHtml.html', function (req, res) {
    console.log("Requested empty html");
    res.send("OK!");
});
app.use(express.static('public'));
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
