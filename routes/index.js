var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' }, function(err, html){
        if (err) console.info(err);
        //console.log(html);
        var path = '/home/workspace/comic-online/comic';
        //var folderName = 'comic' + ;
        var fileName = '';
        var fs = require('fs');
        console.log(fs.existsSync(path));
        console.log(fs.statSync(path).isDirectory());
//        fs.writeFile('a.html', html, function(err){
//            if (err) {
//                console.log(err);
//                return;
//            }
//            console.log("saved!!");
//        });
        
        
        res.send(html);
    });
//    res.render('index', { title: 'Express' });
});

module.exports = router;
