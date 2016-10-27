var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
