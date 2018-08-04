//获取用户ID
var userID = window.location.search.substring(8) === ''? '0' : window.location.search.substring(8).toString();
window.userID = userID;
/**
 * 切换显示
 */

var switchButton = document.getElementsByClassName('info-ul')[0].getElementsByTagName('li'),
    container = document.getElementsByClassName('container'),
    userUl = document.getElementsByClassName('user-ul')[0],
    ul = document.getElementsByClassName('ul'),
    commentUl = ul[0],
    historyUl = ul[1],
    collectUl = ul[2],
    historyList = historyUl.getElementsByTagName('li'),
    collectList = collectUl.getElementsByTagName('li'),
    commentList = commentUl.getElementsByTagName('li');
   
/**
 * 导航栏切换
 */
(function() {
    for(var i = 0; i < switchButton.length; i++) {
        (function(i) {
            EventUtil.addHandler(switchButton[i],'click', function () {
                for (var j = 0; j < container.length; j++) {
                    removeClass(container[j], 'show');
                    removeClass(switchButton[j], 'active-li');
                }
                addClass(container[i], 'show');
                addClass(switchButton[i], 'active-li');
            })
        })(i);
    };
})();

/**
 * 移除父元素全部的子节点
 * @param {Element} parentNode 
 * @param {Element} childNode 
 */
function refreshNode(parentNode, childNode) {
    var realLength = childNode.length;

    for (var i = 0; i < realLength; i++) {
        parentNode.removeChild(childNode[0]);
    }
}
//历史记录的模板
var historyModel =  '<a href="javascript:" class="history-link">'
                 +  '<img src="" class="history-movie-pic">'
                 +  '<span class="history-movie-name" data-h=""></span>'
                 +  '<span class="view-time"></span>'
                 +  '</a>';
//评论的模板
var commentModel = '<div class="comment-header">'
                 + '<p>您在<span class="comment-movie" data-c=""></span>评论了：</p><button class="delete-button">删除</button></div>'
                 + '<div class="comment-container"></div><div class="comment-bottom">'
                 + '<span class="comment-time"></span>'
                 + '</div>';
//收藏的模板
var collectionModel = '<a href="javascript:" class="collect-link">'
                    + '<img src="" class="collect-movie-pic">'
                    + '<span class="collect-movie-name"></span>'
                    + '<span class="collect-time"></span>'
                    + '</a>';


var editP= document.getElementsByClassName('can-edit-user'); //允许修改按钮
    userName = document.getElementById('user-name-input'), //用户名
    userDetail = userUl.getElementsByTagName('input'), //用户表单
    commitButton = document.getElementsByClassName('commit-button')[0], //确认修改按钮
    userPic = document.getElementById('user-pic'), //用户头像
    introdution = document.getElementById('introdution'); //个人简介

/**
 * 根据返回的个人信息初始化个人信息页面
 * @param {object} userData //个人信息
 */
function addUserDetail(userData) {
    userDetail[0].value = userData.userName;
    userDetail[1].value = userData.sex;
    userDetail[2].value = userData.birthday;
    userDetail[3].value = userData.qq;
    userDetail[4].value = userData.school;
    userDetail[5].value = userData.job;
    if (userData.headPic != '') {
        //如果src是空的就保留默认头像
        userPic.setAttribute('src', userData.headPic);
    }
    introdution.value = userData.introduction;
};

/**
 * 初始化个人主页
 */

(function start() {
    $.ajax({
        url: 'http://' + window.ip + ':8080/qgmovie/user/info',
    	type: 'POST',
        data: JSON.stringify({
            "userID": userID
        }),
        dataType: 'json',
    	   processData: false,
        success: successCallback,
        error: errorCallback   
    });
    function successCallback(xhr) {
        if (xhr.state == 5) {
            showPop('请先登录', function() {
                window.location = 'login.html' //跳转到登陆页面
            });
        } else if (xhr.state == 1) {
            addUserDetail(xhr.data); //填充个人信息
        } 
    };   
    function errorCallback() {
        //错误  
    };
})();

/**
 * 修改个人信息
 */
(function() {
    //更换为可以修改的状态
    for (var i = 0; i < editP.length; i++) {
        (function(i) {
            editP[i].onclick = function () {
                userDetail[i].setAttribute('placeholder', userDetail[i].value);
                userDetail[i].value = "";
                userDetail[i].removeAttribute('readonly');
            }
        })(i);
    }
    commitButton.onclick = function() {
        var sendData = JSON.stringify({
            "userName": userDetail[0].value + ' ',
            "headPic": userPic.getAttribute('src') + ' ',
            "sex": userDetail[1].value + ' ', 
            "qq": userDetail[3].value + ' ',
            "birthday": userDetail[2].value + ' ', 
            "introduction": introdution.value + ' ',
            "job": userDetail[5].value + ' ',
            "school": userDetail[4].value + ' '
        });
        showPop('确认修改个人信息？', function(){
            var editURL = 'http://' + window.ip + ':8080/qgmovie/user/edit';
            //发请求
            $.ajax({
                url: editURL,
                type: 'POST',
                data: sendData,
                dataType: 'json',
                processData: false,
                success: successCallback,
                error: errorCallback
            });
            function successCallback() {
                showPop('修改成功！');
            };
            function errorCallback() {
               
            };
        });
    }
})();

/**
 * 填充评论函数
 * @param {object} commentData 返回的JSON对象
 */
function addCommentDetail(commentData) {
    var commentMovieName = document.getElementsByClassName('comment-movie');
        commentContent = document.getElementsByClassName('comment-container');
        commentTime = document.getElementsByClassName('comment-time');

    for (var i = 0; i < commentData.length; i++) {
        addDetail(commentMovieName[i], commentData[i].movieName);
        addDetail(commentContent[i], commentData[i].content);
        addDetail(commentTime[i], commentData[i].addTime);
        commentMovieName[i].setAttribute('data-c', commentData[i].movieId) //保存评论ID
    }
}

/**
 * 初始化我的评论模块
 */
function ajaxComment() {
    $.ajax({
    	url: 'http://' + window.ip + ':8080/qgmovie/user/comment/show',
    	type: 'POST',
        data:  JSON.stringify({
            "userID": userID
        }),
        dataType: 'json',
        processData: false,
        success: successCallback,
        error: errorCallback
    });
    function successCallback(xhr) {
        if (xhr.state === '1') {
            if (xhr.commentCount === 0) {
                showTips(0);
            } else {
                createModelNode(commentModel, 'li', commentUl, xhr.commentCount);
                addCommentDetail(xhr.comment);
                deleteComment();
            }
        }
    };
    function errorCallback() {
        //请求失败
    }
}
EventUtil.addHandler(switchButton[1], 'click', function() {
    refreshNode(commentUl, commentList);
    ajaxComment();
});

/**
 * 删除评论
 */
function deleteComment() {
    var deleteCommentButton = document.getElementsByClassName('delete-button'),
        commentMovieName = document.getElementsByClassName('comment-movie');

    console.log(deleteCommentButton.length);
    for (var i = 0; i < deleteCommentButton.length; i++) {
        (function(i) {
            deleteCommentButton[i].onclick = function() {
                showPop('确认删除？', function() {
                    $.ajax({
                        url: 'http://' + window.ip + ':8080/qgmovie/comment/delete',
                        type: 'POST',
                        data: JSON.stringify({
                            "userID": userID, //用户ID
                            "movieID": commentMovieName[i].getAttribute('data-c') //电影ID
                        }),
                        dataType: 'json',
                        success: successCallback,
                        error: errorCallback
                    });
                    function successCallback(xhr) {
                        if (xhr.state === '1') {
                            commentUl.removeChild(commentList[i]);
                        }
                    };
                    function errorCallback() {
                        alert('请求失败');
                    };
                });
            }
        })(i);
    }
}; 

/**
 * 翻页
 */
var changePage = document.getElementsByClassName('more-container'),
    historyPage = 1,
    collectPage = 1,
    commentPage = 1;

(function() {
    for (var i = 0; i < changePage.length; i++) {
        (function(i) {
            changePage[0].onclick = function() {
                ajaxHistory(historyPage);
            }
            changePage[1].onclick = function() {
                ajaxCollect(collectPage);
            }
        })(i);
    }
})();

/**
 * 初始化历史记录
 */
function addHistoryDetail(historyIndex, historyData) {
    var historyPic = document.getElementsByClassName('history-movie-pic'), //历史浏览电影的图片
        historyName = document.getElementsByClassName('history-movie-name'), //历史浏览电影的名字
        historyTime = document.getElementsByClassName('view-time'), //历史浏览时间
        historyLink = document.getElementsByClassName('history-link');
        
    for (var i = historyIndex, j = 0; i < historyData.length + historyIndex; i++, j++) {
        var src = 'http://'+ window.ip +':8080/qgmovie/img/' + historyData[j].moviePic,
            link =  'movie.html?movieID=' + historyData[j].movieID;

        historyPic[i].setAttribute('src', src);
        addDetail(historyName[i], historyData[j].movieName);
        addDetail(historyTime[i],  historyData[j].time);
        historyLink[i].setAttribute('href', link);
    };
    
}

var historyIndex = 0;
function ajaxHistory(page) {
    $.ajax({
    	url: 'http://' + window.ip + ':8080/qgmovie/user/history',
    	type: 'POST',
        data: JSON.stringify({
            "page": page,
            "userID": userID
        }),
        dataType: 'json',
        processData: false,
        success: successCallback,
        error: errorCallback
    });
    function successCallback(xhr) {
        if (xhr.state === '1') {
            //num为返回的历史记录的数量
            if (xhr.data.length === 0) {
                showTips(); //空就显示提示
            }
            createModelNode(historyModel, 'li', historyUl, xhr.data.length);
            addHistoryDetail(historyIndex, xhr.data);
            historyIndex += xhr.data.length;
            historyPage++;
        } else if (xhr.state === '2') {
            showPop('没有更多浏览记录了~');
        }
    };
    function errorCallback() {
        //请求失败
    }
}

/**
 * 初始化历史记录
 */
EventUtil.addHandler(switchButton[2], 'click', function() {
    refreshNode(historyUl, historyList);
    ajaxHistory(1);
});

/**
 * 初始化收藏
 */
var collcetIndex = 0;

function ajaxCollect(page) {
    $.ajax({
    	url: 'http://' + window.ip + ':8080/qgmovie/user/favlist',
    	type: 'POST',
        data: JSON.stringify({
            "page": page,
            "userID": userID
        }),
        dataType: 'json',
        processData: false,
        success: successCallback,
        error: errorCallback
    });
    function successCallback(xhr) {
        //num为返回的收藏的数量
        if (xhr.state === '1') {
            if (xhr.data.length === 0) {
                showTips(); //空就显示提示
            }
            createModelNode(collectionModel, 'li', collectUl, xhr.data.length);
            addcollectDetail(collcetIndex, xhr.data);
            collcetIndex += xhr.data.length; //记录上次的位置
            collectPage++;
        }
    };
    function errorCallback() {
        //请求失败
    }
}
function addcollectDetail(collcetIndex, collectData) {
    var collectPic = document.getElementsByClassName('collect-movie-pic'), //收藏电影的图片
        collectName = document.getElementsByClassName('collect-movie-name'), //收藏电影名
        collectTime = document.getElementsByClassName('collect-time'); //收藏时间
        collectLink = document.getElementsByClassName('collect-link');
        

        console.log(collcetIndex);
    for (var i = collcetIndex, j = 0; i < collectData.length + collcetIndex; i++, j++) {
        var src = 'http://'+ window.ip +':8080/qgmovie/img/' + collectData[j].moviePic,
            link =  'movie.html?movieID=' + collectData[j].movieID + '&userID=' + userID;

        addDetail(collectName[i], collectData[j].movieName);
        addDetail(collectTime[i], collectData[j].time);
        collectPic[i].setAttribute('src', src);
        collectLink[i].setAttribute('href', link);
    };
}

EventUtil.addHandler(switchButton[3], 'click', function() {
    refreshNode(collectUl, collectList);
    ajaxCollect(1);
});                   

/**
 * 如果传回来的数据为空就显示
 */
var tipsContainer = document.getElementsByClassName('tips-container');

function showTips(index) {
    addClass(tipsContainer[index], 'show');
}
EventUtil.addHandler($('#header-logo img')[0], 'click', function() {
    window.location.href = 'collcetIndex.html?userID=' + window.userID;
})