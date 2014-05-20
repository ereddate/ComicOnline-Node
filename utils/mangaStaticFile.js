function MangaStaticFile() {
    
    var basePath = './manga-static/';
    var fs = require('fs');
    
    this.readFile = function(currentPage, mangaID, successFunc, failedFunc) {
        var filePath = basePath + getMangaFolderName(mangaID) + getFileName(currentPage, mangaID);
        fs.readFile(filePath, function(err, data){
            if (err) {
                console.log(err);
                return;
            }
            successFunc(data.toString());
        });
    };
    
    this.writeFile = function(currentPage, mangaID, content) {
        var folderPath = basePath + getMangaFolderName(mangaID);
        if(!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        console.log(content);
        fs.writeFile(folderPath + getFileName(currentPage, mangaID), content, function(err){
            if (err) {
                console.log(err);
            }
        });
    };
    
    this.exists = function(currentPage, mangaID) {
        var filePath = basePath + getMangaFolderName(mangaID) + getFileName(currentPage, mangaID);
        console.log(filePath);
        return fs.existsSync(filePath);
    };
    
    var getMangaFolderName = function(mangaID) {
        return 'manga-' + mangaID + '/';
    };
    
    var getFileName = function(currentPage, mangaID) {
        return 'manga-' + mangaID + '-' + currentPage + '.html';
    };
}

module.exports = MangaStaticFile;