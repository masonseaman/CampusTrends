var express = require('express');
var gcloud = require('google-cloud');
var firebase = require('firebase');
var multer = require("multer");
var uploader = multer({ storage: multer.memoryStorage({}) });
var app = express();
var port = process.env.PORT || 3000;
var Twit = require('twit');
// app.use(uploader.single("img"));
firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://campus-trends.firebaseio.com"
});

//twitter
var T = new Twit({		
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});	
var gmu = [ '-122.75', '36.8', '-121.75', '37.8'];
var stream = T.stream('statuses/filter', {locations: GMU, q:'#test', count: 10})

stream.on('tweet', function (tweet){
	console.log(tweet)
	}
)
//end twitter


/**
 * Google cloud storage part
 */
var CLOUD_BUCKET="campus-trends.appspot.com"; //From storage console, list of buckets
var gcs = gcloud.storage({
    projectId: '425903145524', //from storage console, then click settings, then "x-goog-project-id"
    keyFilename: 'privkey.json' //the key we already set up
});

function getPublicUrl (filename) {
    return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
}

var bucket = gcs.bucket(CLOUD_BUCKET);

//From https://cloud.google.com/nodejs/getting-started/using-cloud-storage
function sendUploadToGCS (req, res, next) {
    if (!req.file) {
        return next();
    }

    var gcsname = Date.now() + req.file.originalname;
    var file = bucket.file(gcsname);


    var stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', function (err) {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', function () {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        var options = {
            entity: 'allUsers',
            role: gcs.acl.READER_ROLE
        };
        file.acl.add(options, function(a,e){next();});//Make file world-readable; this is async so need to wait to return OK until its done
    });

    stream.end(req.file.buffer);
}

var fireRef = firebase.database().ref('image');


//Make a new one
app.post('/todo', uploader.single("img"), sendUploadToGCS, function (req, res, next) {
    var data = {"text" : req.body.todoText};
    if(req.file)
        data.img = getPublicUrl(req.file.cloudStorageObject);
    fireRef.push(data, function () {
        res.send("OK!");
    }).catch(function(){
        res.status(403);
        res.send();
    });
});
//Delete one
app.delete('/todo', function (req, res) {
    console.log("Client wants to delete todo: '" +req.body.key);
    fireRef.child(req.body.key).once("value", function(item){
        if(item.val().text.toLowerCase().includes("lasagna"))
            res.status(403);
        else
        {
            fireRef.child(req.body.key).remove();
            res.send("OK!");
        }
    }).catch(function(){
        res.status(403);
    });
});

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
