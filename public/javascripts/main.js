var hentai = (function(){
    
    var mangaID;
    var currentPage;
    var pageCount;
    var hasNextPage;
    var hasPreviousPage;
    
    var addDomEvent = function() {
        $(".page-selector").change(function(){
            pageSelectedHandler(this.value);
        });
        $("body").keyup(function(evt){
            if (evt.keyCode == 39) {
                goNextPage();
            }
            if (evt.keyCode == 37) {
                goPreviousPage();
            }
        });
        $("#manga").click(function(){
            goNextPage();
        });
    };
    
    var pageSelectedHandler = function(targetPage) {
        window.location.href = "/manga/" + mangaID + "/" + targetPage + "/";
    };
    
    var goNextPage = function() {
        if (hasNextPage) {
            pageSelectedHandler(Number(currentPage) + 1);
            return;
        }
        alert("已经到最后一页了哦!");
    };
    
    var goPreviousPage = function() {
        if (hasPreviousPage) {
            pageSelectedHandler(Number(currentPage) - 1);
            return;
        }
        alert("这里是第一页哦!");
    };
    
    return {
        initialize: function(id, curPage, totalPage, hasNext, hasPrevious) {
            mangaID = id;
            currentPage = curPage;
            pageCount = totalPage;
            hasNextPage = hasNext;
            hasPreviousPage = hasPrevious;
            //console.log(currentPage, pageCount, hasNext, hasPrevious);
            addDomEvent();
        }
    };
})();
