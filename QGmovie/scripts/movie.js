/**
 * @param {Number} window.page 当前的评论页数
 * @param {Number} window.commentNumber 当前的评论数量
 * @param {Number} window.maxPage 最大的评论页数
 * @param {Number} window.movieID 当前详情页的电影ID
 */





/**
 * 页面初始化，先从url拿到电影的id，打包并发送请求。
 */
(function() {
    var movieID = window.location.search.split('=')[1] || '',
        jsonObj = {};
    
    /* 当没有搜索内容的时候 */
    if (movieID === '') {
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1000);
    }

    jsonObj.movieID = movieID;

    $.ajax({
    	url: 'http://'+ window.ip +':8080/qgmovie/movie/detail',
    	type: 'post',
        data: JSON.stringify(jsonObj),
        dataType: 'json',
    	processData: false,
        success: function(xhr) {
            switch(xhr.state) {
                case '0': {

                    /* 访问出错 */
                    alert('访问失败，退回首页面');
                    window.location.href = 'index.html';
                    break;
                }

                case '1': {
                    /* 访问成功并放回 */
                    pageInit(xhr);
                    window.maxPage = Math.ceil(xhr.commandCount / 5);
                    window.page = 1;
                    console.log(xhr.data);
                    break;
                }
            }
        },

        error: function() {
            alert('连接失败');
        }
    	});
})();

/**
 * 对电影详情页进行页面初始化
 * @param {Object} jsonObj 传回电影数据的data对象部分
 */
function pageInit(jsonObj) {
    var movieData = jsonObj.data.movie; //请求得到的数据
    // console.log(jsonObj.data);

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
     * 填充电影详细信息
     */ 
    (function() {
        var movieDetailUl = document.getElementsByClassName('movie-detail')[0],
            moviePic = document.getElementById('movie-pic'),
            detail = movieDetailUl.getElementsByTagName('span'),
            descrition = document.getElementById('movie-descrition'),
            i,
            tag = '',
            timelong = '';

            /* 对标签进行显示 */
            switch('None') {
                case movieData.type1: {
                    tag = '无';
                    break;
                }

                case movieData.type2: {
                    tag += movieData.type1;
                    break;
                }

                case movieData.type3: {
                    tag += movieData.type1 + '|';
                    tag += movieData.type2;
                    break;
                }

                default: {
                    tag += movieData.type1 + '|';
                    tag += movieData.type2 + '|';
                    tag += movieData.type3 ;
                }
            }

        /* 对电影部分进行初始化 */
        addDetail(detail[0], movieData.director); //导演
        addDetail(detail[1], movieData.star); //主演
        addDetail(detail[2], tag); //标签
        addDetail(detail[3], movieData.place); //地区
        addDetail(detail[4], movieData.year || '无');  // 上映时间
        addDetail(detail[5], movieData.timelong + '分钟'); //时长
        addDetail(detail[6], movieData.score.toString().slice(0,3)); //评分
        addDetail(descrition, movieData.introduction); //电影简介
        addDetail(moviePic, movieData.picture); //电影海报
        $('.movie-pic-container img')[0].setAttribute('src', 'http://'+ window.ip +':8080/qgmovie/img/' + movieData.picture);

        commentInit(jsonObj.data.comment);
    })();

}



// var commentUl = document.getElementsByClassName('comment-list-container')[0],
//     commentList = commentUl.getElementsByTagName('li'),
//     commentUserPic = document.getElementsByClassName('user-pic'),
//     commentUserName = document.getElementsByClassName('user-name'),
//     commentCreatTime = document.getElementsByClassName('create-time'),
//     commentContent = document.getElementsByClassName('comment-content'); //评论内容
    
// var commentData = jsonObj.data.comment;

<<<<<<< HEAD
=======
    
    
>>>>>>> 4d337992012374c165b60fc9ab758f1e00c1a169

//评论模板
var commentModel = '<div class="comment-header">'
                 + '<a href="javascript:" class="user-head-container"><img src="" class="user-pic"></a>'   
                 + '<span class="user-name"></span>'          
                 + '<i class="create-time"></i>'          
                 + ' </div>'     
                 + '<div class="comment-content"></div>';   
//评论总数                    
// addDetail(document.getElementById('comment-number'), json.commentNum);

/**
 * 初始化评论
 * @param {数量} num 评论的数量
 */
function commentInit(commentObjArr) {
    var i,
        container = $('.comment-list-container')[0];
        /* 容器初始化 */
        container.innerHTML = '';

    for (i = 0; i < commentObjArr.length; i++) {
        var newNode = document.createElement('li');
        newNode.innerHTML = '<div class="comment-header">'
                            + '<a href="javascript:" class="user-head-container"><img src="" class="user-pic"></a>'   
                            + '<span class="user-name">'+ commentObjArr[i].userName +'</span>'          
                            + '<i class="create-time">'+ commentObjArr[i].commandTime +'</i>'          
                            + '</div>'     
                            + '<div class="comment-content">'+ commentObjArr[i].content +'</div>'; 
        container.appendChild(newNode);
    }
}

function createComment() {
    var commentValue = $('#comment-textarea')[0].value,
        movieID = window.location.search.split('=')[1],
        jsonObj = {};

        if (commentValue.length == 0) {
            alert('评论不能为空');
            break;
        }
        jsonObj.content = commentValue;
        jsonObj.movieID = movieID;
        jsonObj.commentTime = getNowTime();

        $.ajax({
            url: 'http://' + window.ip + ':8080/qgmovie/movie/comment',
            type: 'post',
            data: JSON.stringify(jsonObj),
            dataType: 'json',
            processData: false,
            success: function(xhr) {
                switch(xhr.state) {
                    case '0': {
                        alert('访问出错');
                        break;
                    }

                    case '1': {
                        /* 评论成功后的操作,翻到评论的那一页 */
                        alert('评论成功');
                        break;
                    }

                    case '5': {
                        alert('未登录，请先登录');
                        window.location.href = 'login.html';
                        break;
                    }
                }
            },
    
            error: function() {
                alert('连接失败');
            }
            });
}





function commentTurnPage() {
    var jsonObj = {};
    /* 左右标签的消失 */
    switch(window.page) {
        case 1 : {
            $('.page-button:eq(0)').css('display', 'none');
            break;
        }

        case 2: {
            $('.page-button:eq(1)').css('display', 'none');
            break;
        }
    }

    jsonObj.page = window.page;
    jsonObj.movieID = window.location.search.split('=')[1]
    $.ajax({
        url: 'http://' + window.ip + ':8080/qgmovie/movie/commit',
        type: 'post',
        data: JSON.stringify(jsonObj),
        dataType: 'json',
        processData: false,
        success: function(xhr) {
            switch(xhr.state) {
                case '0': {
                    alert('访问出错');
                    break;
                }

                case '1': {
                    commentInit(xhr.data.comment);
                    break;
                }
            }
        },

        error: function() {
            alert('连接失败');
        }
        });

    /* 更改页数标志 */
    $('.page-a')[0].innerText = window.page;
    $('.comment-number')[0].innerHTML = window.commentNumber;
}



function pageClick(event) {
    console.log(event.target);
    switch(event.target) {
        case $('.page-button a img ')[0] || $('.page-button a')[0]: {
            console.log('向前翻页')
            window.page--;
            if (window.page != window.maxPage) {
                $('.page-button:eq(1)').css('display', 'block');
            }
            commentTurnPage();
            break;
        }

        case $('.page-button')[1]: {
            window.page++;
            if (window.page != 1) {
                $('.page-button:eq(0)').css('display', 'block');
            }
            commentTurnPage();
            break;
        }

        case $('#comment-button')[0]: {
            createComment();
            break;
        }

        // case 
    }
}

EventUtil.addHandler(document, 'click', pageClick);




































// var pageButton = document.getElementsByClassName('page-button'),
//     pageUl = document.getElementsByClassName('page-ul')[0],
//     pageList = pageUl.getElementsByTagName('li'),
//     pageModel = pageUl.getElementsByTagName('li')[0],
//     pageA = document.getElementsByClassName('page-a');

// /**
//  * 获取页数
//  */
// var page = 4;
// //评论总数
// // addDetail(document.getElementById('comment-number'), json.commentNum);
// (function() {
//     //如果评论数为0
//     if (window.commandCount === 0) {
//         //不显示翻页
//         pageUl.style.display = 'none';
//     } else if (json.commentNum <= 5) {
//         //评论不足5条
//         window.page = 1;
//     } else {
//         //向上取整
//         page = Math.ceil(json.commentNum / 5);
//     }
// })();

// (function() {
//     var index = 1;

//     if (page <= 5) {
//         for (var i = 1; i < page; i++) {
//             var newPage = pageModel.cloneNode(true);
//             pageA[i-1].innerHTML = i;
//             pageUl.appendChild(newPage);
//             }
//         //最后那个页码
//         pageA[page-1].innerHTML = page;
//     } else {
//         //页数太多的情况
//     }
//     //点击切换页数
//     addClass(pageList[index-1], 'active-page');
//     function swithPage() {
//         for (var i = 0; i < pageList.length; i++) {
//             removeClass(pageList[i], 'active-page');
//         }
//         addClass(pageList[index-1], 'active-page');
//     };
//     //点击发送请求
//     for (var k = 0; k < pageList.length; k++) {
//         (function(k) {
//             pageList[k].onclick =function() {
//                 index = k + 1;
//                 swithPage();
//                 //发送请求
//             }
//         })(k);
//     }
//     //后退
//     pageButton[0].onclick = function() {
//         if (index = 1) {
//             index = 1;
//         } else {
//             index--;
//             //发送请求
//         }
//         swithPage();
//     }
//     //前进
//     pageButton[1].onclick = function() {
//         if (index == page) {
//             index = page;
//         } else {
//             index++;
//             //发请求
//         }
//         swithPage();
//     }   

// })();

// /**
//  * 发表评论
//  */
// var commentText = document.getElementById('comment-textarea'),
//     commentButton = document.getElementById('comment-button');

// commentButton.onclick = function() {
//     console.log(commentText.innerHTML);
// }