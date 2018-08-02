// var movieData = json.data.movie; //请求得到的数据
//     commentData = json.data.comment;

/**
 * 填充函数
 */
function addDetail(el, detail) {
    el.innerHTML = detail;
}

// /**
//  * 填充用户名
//  */

// (function() {
//     var movieName = document.getElementsByClassName('movie-name-container');
//         for (var i = 0; i < movieName.length; i++) {
//             addDetail(movieName[i], movieData.moviename);
//         };
// })();

// /**
//  * 填充电影详细信息
//  */

// (function() {
//     var movieDetailUl = document.getElementsByClassName('movie-detail')[0],
//         moviePic = document.getElementById('movie-pic'),
//         detail = movieDetailUl.getElementsByTagName('span'),
//         tag = movieData.type1 + '|' +  movieData.type2 + '|' + movieData.type3,
//         descrition = document.getElementById('movie-descrition');
    
//     addDetail(li[0], movieData.director); //导演
//     addDetail(li[1], star); //主演
//     addDetail(li[2], tag); //标签
//     addDetail(li[3], movieData.place); //地区
//     addDetail(li[4], movieData.longtime); //时长
//     addDetail(li[5], movieData.score); //评分
//     addDetail(descrition, movieData.descrition); //电影简介
//     addDetail(moviePic, movieData.picture); //电影海报
// })();

/**
 *  创建评论
 */

//评论总数
//addDetail(document.getElementById('comment-number'), json.commentNum);




var commentUl = document.getElementsByClassName('comment-list-container')[0],
    commentModel = commentUl.getElementsByTagName('li')[0], //评论模板
    commentList = commentUl.getElementsByTagName('li'),
    commentUserPic = document.getElementsByClassName('user-pic'),
    commentUserName = document.getElementsByClassName('user-name'),
    commentCreatTime = document.getElementsByClassName('create-time'),
    commentContent = document.getElementsByClassName('comment-content'); //评论内容
    
    
    
        var json = {
            "comment": [
                {
                    "commentID": "评论ID",
                    "content": "评论内容",
                    "commentTime": "评论时间",
                    "userID": "评论者的ID",
                    "userName": "评论者的名字"
                },
                {
                    "commentID": "评论ID",
                    "content": "评论内容",
                    "commentTime": "评论时间",
                    "userID": "评论者的ID",
                    "userName": "评论者的名字"
                },
                {
                    "commentID": "评论ID",
                    "content": "评论内容",
                    "commentTime": "评论时间",
                    "userID": "评论者的ID",
                    "userName": "评论者的名字"
                },
                {
                    "commentID": "评论ID",
                    "content": "评论内容",
                    "commentTime": "评论时间",
                    "userID": "评论者的ID",
                    "userName": "评论者的名字"
                },
                {
                    "commentID": "评论ID",
                    "content": "评论内容",
                    "commentTime": "评论时间",
                    "userID": "评论者的ID",
                    "userName": "评论者的名字"
                },
            ]
        };
(function createComment(num) {
        //先清空再创建新的
        for (var j = commentList.length; j > 1; j--) {
            commentUl.removeChild(commentUl.lastElementChild);
        }
        for (var i = 0; i < num; i++) {
            var newComment = commentModel.cloneNode(true);
            addDetail(commentContent[i], json.comment[i].content);
            addDetail(commentUserName[i], json.comment[i].userName); //用户名
            addDetail(commentCreatTime[i], json.comment[i].commentTime); //评论时间
            //commentUserPic[0].setAttribute('src', json.comment[i].userPic)); //设置头像
            commentUl.appendChild(newComment);
        }
        
})(5);

var pageButton = document.getElementsByClassName('page-button'),
    pageUl = document.getElementsByClassName('page-ul')[0],
    pageList = pageUl.getElementsByTagName('li'),
    pageModel = pageUl.getElementsByTagName('li')[0],
    pageA = document.getElementsByClassName('page-a');

/**
 * 获取页数
 */
var page = 4;
//评论总数
addDetail(document.getElementById('comment-number'), json.commentNum);
(function() {
    //如果评论数为0
    if (json.commentNum === 0) {
        //不显示翻页
        pageUl.style.display = 'none';
    } else if (json.commentNum <= 5) {
        //评论不足5条
        page = 1;
    } else {
        //向上取整
        page = Math.ceil(json.commentNum / 5);
    }
})();

(function() {
    var index = 1;

    if (page <= 5) {
        for (var i = 1; i < page; i++) {
            var newPage = pageModel.cloneNode(true);
            pageA[i-1].innerHTML = i;
            pageUl.appendChild(newPage);
            }
        //最后那个页码
        pageA[page-1].innerHTML = page;
    } else {
        //页数太多的情况
    }
    //点击切换页数
    addClass(pageList[index-1], 'active-page');
    function swithPage() {
        for (var i = 0; i < pageList.length; i++) {
            removeClass(pageList[i], 'active-page');
        }
        addClass(pageList[index-1], 'active-page');
    };
    //点击发送请求
    for (var k = 0; k < pageList.length; k++) {
        (function(k) {
            pageList[k].onclick =function() {
                index = k + 1;
                swithPage();
                //发送请求
            }
        })(k);
    }
    //后退
    pageButton[0].onclick = function() {
        if (index = 1) {
            index = 1;
        } else {
            index--;
            //发送请求
        }
        swithPage();
    }
    //前进
    pageButton[1].onclick = function() {
        if (index == page) {
            index = page;
        } else {
            index++;
            //发请求
        }
        swithPage();
    }   

})();

/**
 * 发表评论
 */
var commentText = document.getElementById('comment-textarea'),
    commentButton = document.getElementById('comment-button');

commentButton.onclick = function() {
    console.log(commentText.innerHTML);
}