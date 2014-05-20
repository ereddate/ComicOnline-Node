var express = require('express');
var router = express.Router();
var basePath = './comic/';
var staticFilePrefix = 'comic-';

var MangaStaticFile = require('../utils/mangaStaticFile');
var ms = new MangaStaticFile();

//{id:1, comic_name:'ddd', total_page:99, prefix:'xxx'}

router.get('/:comic_id/:page', function(req, res){
    var comicID = req.params.comic_id;
    var page = req.params.page;
    // 0. params check
    if (isNaN(comicID) || isNaN(page)) {
        response404(res);
    }
    // 1. check catch for static file
    if (ms.exists(page, comicID)) {
        ms.readFile(page, comicID, function(html){
            res.send(html);
        });
        return;
    }
    // 2. query database
    var DB = require('../utils/db');
    var db = new DB();
    db.initialize();
    db.signal().once('query_success', function(rows) {
        var mangaData = rows[0];
        // 3. check totalPage
        if (page > mangaData.total_page) {
            response404(res);
            return;
        }
        // 4. render html
        res.render('comic', formatResponseData(mangaData, page), function(err, html){
            ms.writeFile(page, comicID, html);
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
    var option;
    for(var i = 0; i < totalPage; i++) {
        option = {
            page: i + 1,
        };
        if (i + 1 == currentPage) option.current = true;
        optionList.push(option);
    }
    data.currentPage = currentPage;
    data.pageOptions = optionList
    data.filePath = 'comic-' + data.ID + '/' + data.prefix_name + polishingPage(currentPage) + '.png';
    getNextPage(currentPage, data);
    getPrevioousPage(currentPage, data);
    return data;
}

function getNextPage(currentPage, data) {
    console.log("getNextPage currentPage: " + currentPage);
    data.hasNextPage = false;
    if (currentPage < data.total_page) {
        data.hasNextPage = true;
        data.nextPage = Number(currentPage) + 1;
    }
}

function getPrevioousPage(currentPage, data) {
    console.log("getPrevioousPage currentPage: " + currentPage);
    data.hasPreviousPage = false;
    if (currentPage > 1) {
        data.hasPreviousPage = true;
        data.previousPage = Number(currentPage) - 1;
    }
}

function response404(res) {
    res.render('404');
}

function polishingPage(page) {
    var length = 4 - String(page).length;
    while(--length) {
        page = "0" + page;
    }
    return page;
}

module.exports = router;