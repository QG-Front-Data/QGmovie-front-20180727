/**
 * 首页的JS文件
 */
var header = document.getElementsByClassName('header')[0]; //顶部栏

/**
 * 粘性顶部栏
 */

(function() {
    document.onscroll = function() {
        if (document.documentElement.scrollTop >= 300) { 
            addClass(header, 'sticky-header');
        } else {
            removeClass(header, 'sticky-header');
        }
    }
})();

/**
 * 返回顶部
 */

var backToTopButton = document.getElementsByClassName('toTop-button')[0]; 

function backToTop() {
    var sHeight = document.documentElement.scrollTop;
    
    var top = function() {
        sHeight = sHeight + (0 - sHeight) / 8;

        if (sHeight < 1) {
            document.documentElement.scrollTop = 0;
            return;
        }
        document.documentElement.scrollTop = sHeight;
        requestAnimation(top);
    }
    top();
}

backToTopButton.onclick = function() {
    backToTop();
};

/**
 * 改变搜索栏样式
 */
var searchBar = document.getElementById('search-input');
(function() {
    searchBar.onclick = function() {
        addClass(this, 'active-search');
    }
    searchBar.onblur = function() {
        removeClass(this, 'active-search');
    }
})();

/**
 * 二级菜单
 */

(function() {
    var userHead = document.getElementsByClassName('user-head-container')[0]; //用户头像
        secondMenu = document.getElementsByClassName('second-menu')[0]; //二级菜单

    userHead.onmouseover = function() {
        addClass(header, 'active-header');
        secondMenu.onmouseleave = function() {
            removeClass(header, 'active-header');
        }
    };
})();


/**
 * 轮播图JS
 * @author czf
 * Date: 2018-07-30
 */

var slider = document.getElementsByClassName('slider')[0],
    control = document.getElementsByClassName('silder-control'),
    slide = document.getElementsByClassName('slide'),
    dotted = document.getElementsByClassName('dotted'),
    timer = setTimeout(autoPlay, 3000),
    index = 0; //索引

function activeAnimate() {
    clearTimeout(timer);
    showDotted();
    animate(index);
    timer = setTimeout(autoPlay, 4000);
 }

 /**
  * 点击小圆点切换
  */

(function clickDotted() {
    for (var i = 0; i < dotted.length; i++) {
        (function(i) {
            dotted[i].onclick = function () {
                index = i;
                activeAnimate();
            }
        })(i);
    }
})();

/**
 * 切换小圆点的样式
 */

function showDotted() {
    for (var i = 0; i < dotted.length; i++) {
        removeClass(dotted[i], 'dotted-active');
    }
    addClass(dotted[index], 'dotted-active');
}

/**
 * 切换动画
 * @param {*} index 
 */

function animate(index) {
    var left = {
        '0': '0%',
        '1': '-100%',
        '2': '-200%',
        '3': '-300%'
    }
    slider.style.transform = 'translateX(' + left[index] + ')';
    setTimeout(function () {
        for (var i = 0; i < slide.length; i++) {
            removeClass(slide[i], 'slide-active');
        }
        addClass(slide[index], 'slide-active');
    }, 500);
}

/**
 * 左右切换按钮
 */

control[1].onclick = function () {
    if (index == 3) {
        index = 0;
    } else {
        console.log(index);
        index++;
    }
    activeAnimate();
}
control[0].onclick = function () {
    if (index == 0) {
        index = 3;
    } else {
        console.log(index);
        index--;
    }
    activeAnimate();
}

/**
 * 自动播放
 */

function autoPlay() {
    if (index == 3) {
        index = 0;
    } else {
        console.log(index);
        index++;
    }
    activeAnimate();
}

