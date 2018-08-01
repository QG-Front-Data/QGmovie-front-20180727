
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

/**
 * 建立树状图
 */
(function typeTree() {
    var data = {"value":["root","根节点"], "children":[{"name":"类型", "value":["root"], "children":[{ "name":"剧情", "value":["leave"], },{ "name":"喜剧", "value":["leave"], },{ "name":"动作", "value":["leave"], },{ "name":"爱情", "value":["leave"], },{ "name":"科幻", "value":["leave"], },{ "name":"悬疑", "value":["leave"], },{ "name":"惊悚", "value":["leave"], },{ "name":"恐怖", "value":["leave"], },{ "name":"犯罪", "value":["leave"], },{ "name":"同性", "value":["leave"], },{ "name":"音乐", "value":["leave"], },{ "name":"歌舞", "value":["leave"], },{ "name":"传记", "value":["leave"], },{ "name":"历史", "value":["leave"], },{ "name":"战争", "value":["leave"], },{ "name":"西部", "value":["leave"], },{ "name":"奇幻", "value":["leave"], },{ "name":"冒险", "value":["leave"], },{ "name":"灾难", "value":["leave"], },{ "name":"武侠", "value":["leave"], },{ "name":"情色", "value":["leave"], },], }, { "name":"地区", "value":["root"], "children":[{ "name":"中国大陆", "value":["leave"] },{ "name":"美国", "value":["leave"] },{ "name":"香港", "value":["leave"] },{ "name":"台湾", "value":["leave"] },{ "name":"日本", "value":["leave"] },{ "name":"韩国", "value":["leave"] },{ "name":"英国", "value":["leave"] },{ "name":"法国", "value":["leave"] },{ "name":"德国", "value":["leave"] },{ "name":"意大利", "value":["leave"] },{ "name":"西班牙", "value":["leave"] },{ "name":"印度", "value":["leave"] },{ "name":"泰国", "value":["leave"] },{ "name":"俄罗斯", "value":["leave"] },{ "name":"伊朗", "value":["leave"] },{ "name":"加拿大", "value":["leave"] },{ "name":"澳大利亚", "value":["leave"] },{ "name":"爱尔兰", "value":["leave"] },{ "name":"瑞典", "value":["leave"] },{ "name":"巴西", "value":["leave"] },{ "name":"丹麦", "value":["leave"] }] }, { "name":"评分", "value":["root"], "children":[{ "name":"0~1", "value":["leave"] },{ "name":"1~2", "value":["leave"] },{ "name":"2~3", "value":["leave"] },{ "name":"3~4", "value":["leave"]},{"name":"4~5", "value":["leave"]}]}] },
        myChart = echarts.init(document.getElementsByClassName('type-tree')[0]),
        option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
        },
        series:[
            {
                type: 'tree',

                data: [data],

                left: '2%',
                right: '2%',
                top: '8%',
                bottom: '20%',

                symbol: 'emptyCircle',

                orient: 'vertical',
                symbolSize: 50,
                symbolColor: 'red',
                
                expandAndCollapse: true,
                initialTreeDepth:1,

                label: {
                    normal: {
                        position: 'inside',
                        verticalAlign: 'middle',
                        align: 'middle',
                        fontSize: 16,
                    }
                },

                leaves: {

                    label: {
                        normal: {
                            position: 'inside',
                            verticalAlign: 'middle',
                            align: 'middle',
                        }
                    },
                },
                animationDurationUpdate: 750
            }
        ],
    };

    myChart.showLoading();
    myChart.setOption(option);
    myChart.hideLoading();

    myChart.on("click", function(param) {
        if (param.value[0] === "leave") {
            /**
             * 进行下一步操作
             */
        }
    });
})();

/**
 * 搜索页面初始化函数
 */
function searchRequest() {
    // var param = window.location.search,
    //     key = param.split('&')[0].split('=')[1],
    //     page = param.split('&')[1].split('=')[1],
    //     jsonObj = {};

    // jsonObj.key = key;
    // jsonObj.page = page;
    /* 添加搜索框内容 */
    var key = 
        jsonObj = {};

    jsonObj.key = key;
    jsonObj.page = window.page;

    $.ajax({
    	url: 'http://ip:8080/qgmovie/search/key',
    	type: 'post',
        data: JSON.stringify(jsonObj),
        dataType: 'json',
    	processData: false,
    	//contentType: contentTypes,
        success: successCallback,
        error: errorCallback
    	});
}

