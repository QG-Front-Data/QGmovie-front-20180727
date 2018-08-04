//获取用户ID
var userID = window.location.search.substring(8) === ''? '0' : window.location.search.substring(8).toString();

/**
 * 切换显示
 */
var container = document.getElementsByClassName('ajax-container')[0].getElementsByTagName('ul'),
    userContainer = document.getElementsByClassName('user-ul')[0],
    commentContainer = document.getElementsByClassName('comment-ul')[0],
    historyContainer = document.getElementsByClassName('history-ul')[0],
    collectContainer = document.getElementsByClassName('collect-ul')[0],
    historyList = historyContainer.getElementsByTagName('li'),
    collectList = collectContainer.getElementsByTagName('li'),
    commentList = commentContainer.getElementsByTagName('li'),
    switchButton = document.getElementsByClassName('info-ul')[0].getElementsByTagName('li');
    

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

var editP= document.getElementsByClassName('can-edit-user'); //允许修改按钮
    userName = document.getElementById('user-name-input'), //用户名
    userDetail = userContainer.getElementsByTagName('input'), //用户表单
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
        //如果是空的就保留默认头像
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
 * 创建评论
 */
var commentList = commentContainer.getElementsByTagName('li'),
    commentModel = '<div class="comment-header">'
                   + '<p>您在<span class="comment-movie" data-c=""></span>评论了：</p><button class="delete-button">删除</button></div>'
                   + '<div class="comment-container"></div><div class="comment-bottom">'
                   + '<span class="comment-time"></span>'
                   + '</div>';

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
                showTips();
            } else {
                createModelNode(commentModel, 'li', commentContainer, xhr.commentCount);
                addCommentDetail(xhr.comment);
                deleteComment();
                commentPage++;
            }
        }
    };
    function errorCallback() {
        
    }
}

EventUtil.addHandler(switchButton[1], 'click', function() {
    refreshNode(commentContainer, commentList);
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
                alert();
                showPop('确认删除？', function() {
                    $.ajax({
                        url: 'http://' + window.ip + ':8080/qgmovie/comment/delete',
                        type: 'POST',
                        data: JSON.stringify({
                            "userID": userID, //用户ID
                            "movieID": commentMovieName[i].getAttribute('data-c') //电影ID
                        }),
                        dataType: 'json',
                        processData: false,
                        success: successCallback,
                        error: errorCallback
                    }),
                    function successCallback(xhr) {
                        if (xhr.state === '1') {
                            commentList[i].style.display = 'none';
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
 * 创建历史记录
 */
var historyModel =  '<a href="javascript:" class="history-link">'
                 +  '<img src="" class="history-movie-pic">'
                 +  '<span class="history-movie-name" data-h=""></span>'
                 +  '<span class="view-time"></span>'
                 +  '</a>';

function addHistoryDetail(historyData) {
    var historyPic = document.getElementsByClassName('history-movie-pic'), //历史浏览电影的图片
        historyName = document.getElementsByClassName('history-movie-name'), //历史浏览电影的名字
        historyTime = document.getElementsByClassName('view-time'), //历史浏览时间
        historyLink = document.getElementsByClassName('history-link');

    for (var i = 0; i < historyData.length; i++) {
        var src = 'http://'+ window.ip +':8080/qgmovie/img/' + historyData[i].moviePic,
            link =  'movie.html?movieID=' + historyData[i].movieID;

        historyPic[i].setAttribute('src', src);
        addDetail(historyName[i], historyData[i].movieName);
        addDetail(historyTime[i],  historyData[i].time);
        historyName[i].setAttribute('data-h', historyData[i].movieID);//保存评论ID
        historyLink[i].setAttribute('href', link);
    };
    
}


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
            createModelNode(historyModel, 'li', historyContainer, xhr.data.length);
            addHistoryDetail(xhr.data);
            historyPage++;
        } else if (xhr.state === '2') {
            showPop('没有更多浏览记录了~');
        }
    };
    function errorCallback() {
        
    }
}


/**
 * 移除节点
 */
function refreshNode(parentNode, childNode) {
    var realLength = childNode.length;

    for (var i = 0; i < realLength; i++) {
        parentNode.removeChild(childNode[0]);
    }
}

EventUtil.addHandler(switchButton[2], 'click', function() {
    refreshNode(historyContainer, historyList);
    ajaxHistory(1);
});

/**
 * 翻页
 */

var changePage = document.getElementsByClassName('more-container');
    historyPage = 1,
    collectPage = 1,
    commentPage = 1;

(function() {
    for (var i = 0; i < changePage.length; i++) {
        (function(i) {
            changePage[0].onclick = function() {
                //ajaxComment(commentPage);
                showPop('没有更多评论了~');
            }
            changePage[1].onclick = function() {
                ajaxHistory(historyPage);
            }
            changePage[2].onclick = function() {
                ajaxCollect(collectPage);
            }
        })(i);
    }
})();

var collectionModel = '<a href="javascript:" class="collect-link">'
                    + '<img src="" class="collect-movie-pic">'
                    + '<span class="collect-movie-name"></span>'
                    + '<span class="collect-time"></span>'
                    + '</a>';


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
            //var collectContainer = document.getElementById('collect-container');

            createModelNode(collectionModel, 'li', collectContainer, xhr.data.length);
            addcollectDetail(xhr.data);
            collectPage++;
        }
    };
    function errorCallback() {

    }
}
function addcollectDetail(collectData) {
    var collectPic = document.getElementsByClassName('collect-movie-pic'), //收藏电影的图片
        collectName = document.getElementsByClassName('collect-movie-name'), //收藏电影名
        collectTime = document.getElementsByClassName('collect-time'); //收藏时间
        collectLink = document.getElementsByClassName('collect-link');

    for (var i = 0; i < collectData.length; i++) {
        var src = 'http://'+ window.ip +':8080/qgmovie/img/' + collectData[i].moviePic,
            link =  'movie.html?movieID=' + collectData[i].movieID + '&userID=' + 3;

        addDetail(collectName[i], collectData[i].movieName);
        addDetail(collectTime[i], collectData[i].time);
        collectPic[i].setAttribute('src', src);
        collectLink[i].setAttribute('href', link);
    };

}

EventUtil.addHandler(switchButton[3], 'click', function() {
    refreshNode(collectContainer, collectList);
    ajaxCollect(1);
});                   

var tipsContainer = document.getElementsByClassName('tips-container');

/**
 * 如果传回来的数据是空的就显示
 */

function showTips(index) {
    addClass(tipsContainer[index], 'show');
}
