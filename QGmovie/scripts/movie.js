var movieData = json.data.movie; //请求得到的数据
    commentData = json.data.comment;

/**
 * 填充函数
 */
function addDetail(el, detail) {
    el.innerHTML = detail;
}

/**
 * 填充用户名
 */

(function() {
    var movieName = document.getElementsByClassName('movie-name-container');
        for (var i = 0; i < movieName.length; i++) {
            addDetail(movieName[i], movieData.moviename);
        };
})();

/**
 * 填充详细信息
 */

(function() {
    var movieDetailUl = document.getElementsByClassName('movie-detail')[0],
        moviePic = document.getElementById('movie-pic'),
        detail = movieDetailUl.getElementsByTagName('span'),
        tag = movieData.type1 + '|' +  movieData.type2 + '|' + movieData.type3,
        descrition = document.getElementById('movie-descrition');
    
    addDetail(li[0], movieData.director); //导演
    addDetail(li[1], star); //主演
    addDetail(li[2], tag); //标签
    addDetail(li[3], movieData.place); //地区
    addDetail(li[4], movieData.longtime); //时长
    addDetail(li[5], movieData.score); //评分
    addDetail(descrition, movieData.descrition); //电影简介
    addDetail(moviePic, movieData.picture); //电影海报
})();

/**
 *  创建评论
 */

    //评论总数
    addDetail(document.getElementById('comment-number'), json.commentNum);

function createComment(num) {
    var commentUl = document.getElementsByClassName('comment-list-container')[0],
        commentModel = commentUl.getElementsByClassName('li')[0],
        commentContent = document.getElementsByClassName('comment-content'); //评论内容

        for (var i = 0; i < num; i++) {
            var newComment = commentModel.cloneNode(true);
            
        }
};


/**
 * 获取页数
 */
var page = 0;
(function() {
    //如果评论数为0 
    if (json.commentNum === '0') {
        page = 1;
    } else if (json.commentNum <= 5) {
        //一页仅有五条评论
        page = 1;
    } else {
        page = Math.ceil(json.commentNum / 5);
    }
})();

(function() {
    var pageButton = document.getElementsByClassName('page-button'),
        pageUl = document.getElementsByClassName('page-ul')[0],
        pageModel = pageUl.getElementsByTagName('li')[0],
        a = li.getElementsByTagName('li')[0]; 
        var index = 1;

        if (page <= 5) {
            for (var i = 1; i <= page.length; i++) {
                a.innerHTML = i;
                var newPage = pageModel.cloneNode(true);
                pageUl.append(newPage);
            }
        } else {
            
        }
    //后退
    pageButton[0].onclick = function() {
        if (index = 1) {
            index = 1;
        } else {
            index--;
        }

    }
    //前进
    pageButton[1].onclick = function() {
        if (index == page) {
            index = page;
        } else {
            index++;
            //发请求
        }
    }   

})();

