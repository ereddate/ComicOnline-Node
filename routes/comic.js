var express = require('express');
var router = express.Router();

router.get('/comic/:comic_id/:page', function(req, res){
    res.send('this is comic online page!');
});