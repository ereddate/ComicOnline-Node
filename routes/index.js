var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Welcome' }, function(err, html){
        /**
        var DB = require('../utils/db');
        var db = new DB();
        db.initialize();
        db.signal().once('query_success', function(rows) {  
            var mangaData = rows[0];
        });
        db.signal().once('query_empty', function(){
            response404(res);
        });
        //
        db.randomManga();
        **/
        
        res.send(html);
    });
});

module.exports = router;
