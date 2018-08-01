
var button = document.getElementById('search-button'); 

/**
 * 采用懒加载检测requestAnimationFrame兼容性
 * @param {*} fun 
 * @param {*} time 
 */
var requestAnimation = function (fun, time) {
    if (window.requestAnimationFrame) {
        return requestAnimationFrame(fun);
    } else {
        return setTimeout(fun, time);
    }
}

function animate() {
    var sHeight = document.documentElement.scrollTop;
    
    var top = function() {
        sHeight = sHeight + (300 - sHeight) / 4;

        if (sHeight > 299) {
            document.documentElement.scrollTop = 300;
            return;
        }
        document.documentElement.scrollTop = sHeight;
        requestAnimation(top);
    }
    top();
}

function fadeIn(el) {
    var opacity = 0;

    var op = function() {
        opacity = opacity + 0.1;
        
        if (opacity >= 1) {
            el.style.opacity = 1;
            return;
        } 
        
        el.style.opacity = opacity;

        requestAnimation(op);
    }
    op();
}

(function fadeOut() {
    var sHeight = document.documentElement.scrollTop;
    
    document.onscroll = function() {
        if (document.documentElement.scrollTop < 200) {
            hLogo.style.opacity = 0;
        }
    }
})();
var hLogo = document.getElementById('header-logo');

button.onclick = function() {
    animate();
    fadeIn(hLogo);
};