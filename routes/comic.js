var express = require('express');
var router = express.Router();
var basePath = './comic/';
var staticFilePrefix = 'comic-';

//{id:1, comic_name:'ddd', total_page:99, prefix:'xxx'}

router.get('/:comic_id/:page', function(req, res){
    var comicID = req.params.comic_id;
    var page = req.params.page;
    // 0. params check
    if (isNaN(comicID) || isNaN(page)) {
        response404(res);
    }
    // 1. check catch for static file
    var fs = require('fs');
    var filePath = basePath + 'comic-' + comicID + '/' + staticFilePrefix + comicID + '-' + page + '.html';
    if (fs.existsSync(filePath)) {
        console.log('file is exists!!');
        res.send(fs.readFileSync(filePath));
        return;
    }
    // 2. query database
    var DB = require('../utils/db');
    var db = new DB();
    db.initialize();
    db.signal().once('query_success', function(rows) {
        var mangaData = rows[0];
        console.log(rows);
        // 3. check totalPage
        if (page > mangaData.total_page) {
            response404(res);
            return;
        }
        // 4. render html
        res.render('comic', formatResponseData(mangaData, page), function(err, html){
            saveStaticFile(comicID, page, html);
            res.send(html);
        });
    });
    db.signal().once('query_empty', function(){
        response404(res);
    });
    db.queryComicByID(comicID);
});

function formatResponseData(data, currentPage) {
    var optionList = [];
    var totalPage = data.total_page;
//    currentPage = 3;
    var option;
    for(var i = 0; i < totalPage; i++) {
        option = {
            page: i + 1,
        };
        if (i + 1 == currentPage) option.current = true;
        optionList.push(option);
    }
    data.pageOptions = optionList
    data.filePath = 'comic-' + data.ID + '/' + data.prefix_name + polishingPage(currentPage) + '.png';
    return data;
}

function saveStaticFile(comicID, page, content) {
    var folderPath = basePath + 'comic-' + comicID + '/';
    var fileName = staticFilePrefix + comicID + '-' + page + '.html';
    var fs = require('fs');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
    fs.writeFile(folderPath + fileName, content, function(err){
        if (err) {
            console.log(err);
            return;
        }
        console.log('save file success');
    });
}

function response404(res) {
    res.render('404');
}

function polishingPage(page) {
    var length = String(page).length;
    while(--length) {
        page = "0" + page;
    }
    console.log(page);
    return page;
}

module.exports = router;