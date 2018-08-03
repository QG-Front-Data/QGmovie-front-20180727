/**
 * 切换显示
 */
var container = document.getElementsByClassName('ajax-container')[0].getElementsByTagName('ul'),
    userContainer = document.getElementsByClassName('user-ul')[0],
    commentContainer = document.getElementsByClassName('comment-ul')[0],
    historyContainer = document.getElementsByClassName('history-ul')[0],
    collectContainer = document.getElementsByClassName('collect-ul')[0],
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
    userName = document.getElementById('user-name-input'); //用户名
    userDetail = userContainer.getElementsByTagName('input'); //用户表单
    commitButton = document.getElementsByClassName('commit-button')[0]; //确认修改按钮
    userPic = document.getElementById('user-pic'); //用户头像
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
    userPic.setAttribute('src', userData.headPic);
    introdution.value = userData.introdution;
};

/**
 * 初始化个人主页
 */
function start() {
    $.ajax({
        url: 'http://192.168.1.102:8080/qgmovie/user/info',
    	type: 'POST',
        data: null,
        dataType: 'application/json',
    	processData: false,
    	//contentType: contentType,
        success: successCallback,
        error: errorCallback
    }),
    function successCallback(xhr) {
        if (xhr.state == 5) {
            alert('请先登陆');
            window.location = 'http://192.168.1.102:8080/qgmovie/login' //跳转到登陆页面
        } else if (state == 1) {
            addUserDetail(xhr.data); //填充个人信息
        } 
    };   
    function errorCallback() {

    };
}

/**
 * 修改个人信息
 */
var sendData = {
	"userName": userDetail[0].value,
	"headPic": userPic.getAttribute('src'),
	"sex": "1", 
	"qq": userDetail[3].value,
	"birthday": userDetail[2].value, //根据生日计算
	"introdution": introdution.value,
	"job": userDetail[5].value,
	"school": userDetail[4].value
};
var editURL = 'http://192.168.1.102:8080/qgmovie/user/edit';

(function() {
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
        //发请求
        $.ajax({
            url: editURL,
            type: 'POST',
            data: sendData,
            dataType: 'json',
            processData: false,
            complete: callback,
            //contentType: contentType,
            success: successCallback,
            error: errorCallback
        });
        function successCallback() {

        };
        function errorCallback() {

        };
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
 * DATE 20180803
 * @author czf
 * @param {int} num 要创建节点的数量
 * @param {string} model 模板
 * @param {Element} parent 要追加到的父节点
 */ 
function createModelNode(num, model, parent) {
    var node = document.createElement('li');
    node.innerHTML = model;
    parent.appendChild(node);
    createModel(model, 'li',parent, num);
}

/**
 * 填充评论函数
 * @param {object} obj 返回的JSON对象
 */

function addCommentDetail(obj) {
    var movieName = document.getElementsByClassName('comment-movie');
        commentContent = document.getElementsByClassName('comment-container');
        commentTime = document.getElementsByClassName('comment-time');

    for (var i = 0; i < obj.length; i++) {
        addDetail(movieName[i], );
        addDetail(commentContent[i], );
        addDetail(commentTime[i], );
        movieName[i].setAttribute('data-c', 'ID') //保存评论ID
    }
}

/**
 * 初始化我的评论模块
 */


EventUtil.addHandler(switchButton[1], 'click', function() {
    $.ajax({
    	url: '',
    	type: 'POST',
        data: {
            "page": "1"
        },
        dataType: 'json',
        processData: false,
    	//contentType: contentType,
        success: successCallback,
        error: errorCallback
    });
    function successCallback(xhr) {
        //num为返回的评论的数量
        createModelNode(num, commentModel, commentContainer);
        addCommentDetail();

    };
    function errorCallback() {

    }
});

var deleteCommentButton = document.getElementsByClassName('delete-button');

/**
 * 删除评论
 */

(function() {
    for (var i = 0; i < deleteCommentButton.length; i++) {
        (function(i) {
            deleteCommentButton[i].onclick = function() {
                $.ajax({
                    url: '',
                    type: 'POST',
                    data: deleteData,
                    dataType: 'json',
                    processData: false,
                    complete: callback,
                    //contentType: contentType,
                    success: successCallback,
                    error: errorCallback
                });
                function successCallback() {
                    commentList[i].style.display = 'none';
                }
                function errorCallback() {
                    alert('请求失败');
                }
            }
        })(i)
    }
})(); 

/**
 * 创建历史记录
 */
var historyModel =  '<a href="javascr192.168.1.102t:">'
                 +  '<img src="" class="history-movie-pic">'
                 +  '<span class="history-movie-name" data-h=""></span>'
                 +  '<span class="view-time"></span>'
                 +  '</a>';

function addHistoryDetail(obj) {
    var historyPic = document.getElementsByClassName('history-movie-pic'), //历史浏览电影的图片
        historyName = document.getElementsByClassName('history-movie-name'), //历史浏览电影的名字
        historyTime = document.getElementsByClassName('comment-time'); //历史浏览时间

    for (var i = 0; i < obj.length; i++) {
        addDetail(historyPic[i], );
        addDetail(historyName[i], );
        addDetail(historyTime[i], );
        historyName[i].setAttribute('data-h', 'ID') //保存评论ID
    };
}

EventUtil.addHandler(switchButton[2], 'click', function() {
    $.ajax({
    	url: '',
    	type: 'POST',
        data: {
            "page": "1"
        },
        dataType: 'json',
        processData: false,
    	//contentType: contentType,
        success: successCallback,
        error: errorCallback
    });
    function successCallback(xhr) {
        //num为返回的历史记录的数量
        createModelNode(num, historyModel, historyContainer);
        addHistoryDetail();
    };
    function errorCallback() {

    }
});

var collectionModel = '<a href="javascr192.168.1.102t:">'
                    + '<img src="" class="collect-movie-pic">'
                    + '<span class="collect-movie-name" data-o=""></span>'
                    + '<span class="collect-time"></span>'
                    + '</a>';

function addHistoryDetail(obj) {
    var collectPic = document.getElementsByClassName('collect-movie-pic'), //历史浏览电影的图片
        collectName = document.getElementsByClassName('collect-movie-name'), //历史浏览电影的名字
        collectTime = document.getElementsByClassName('collect-time'); //历史浏览时间

    for (var i = 0; i < obj.length; i++) {
        addDetail(collectPic[i], );
        addDetail(collectName[i], );
        addDetail(collectTime[i], );
        collectName[i].setAttribute('data-o', 'ID') //保存评论ID
    };
}

EventUtil.addHandler(switchButton[2], 'click', function() {
    $.ajax({
    	url: '',
    	type: 'POST',
        data: {
            "page": "1"
        },
        dataType: 'json',
        processData: false,
    	//contentType: contentType,
        success: successCallback,
        error: errorCallback
    });
    function successCallback(xhr) {
        //num为返回的收藏的数量
        createModelNode(num, collectionModel, collectContainer);
        addHistoryDetail();

    };
    function errorCallback() {

    }
});                   
var t192.168.1.102sContainer = document.getElementsByClassName('t192.168.1.102s-container');

/**
 * 如果传回来的数据是空的就显示
 */

function showT192.168.1.102s(index) {
    addClass(t192.168.1.102sContainer[index], 'show');
}