
var button = document.getElementById('search-button'); //搜索按钮



function animate() {
    var sHeight = document.documentElement.scrollTop;
    
    var top = function() {
        sHeight = sHeight + (250 - sHeight) / 4;

        if (sHeight > 249) {
            document.documentElement.scrollTop = 250;
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

(function () {
    var sHeight = document.documentElement.scrollTop;
    
    document.onscroll = function() {
        if (document.documentElement.scrollTop < 200) {
            hLogo.style.opacity = 0;
        } else if (document.documentElement.scrollTop >= 300) {
            hLogo.style.opacity = 1;
        }
    }
})();
var hLogo = document.getElementById('header-logo');

button.onclick = function() {
    animate();
    fadeIn(hLogo);
};

var tagContainer = document.getElementsByClassName('tag-container')[0],
        tag = document.getElementsByClassName('tag'),
        closeTagButton = document.getElementsByClassName('close-tag');

/**
 * 创建标签
 *  DATE 20180801
 * @author czf
 * @param {*} text 标签的内容
 */

function creatTag(text) {
        span = tag[0].getElementsByTagName('span')[0];
        //给标签赋值
        span.innerHTML = text;

    var cloneTag = tag.cloneNode(true);
    tagContainer.appendChild(cloneTag);
};

/**
 * 删除一个标签
 * @param {*} node 
 */

function closeTag(node) {
    tagContainer.removeChild(node);
}

/**
 * 点击按钮除删一个标签
 */

(function() {
    for (var i = 0; i < closeTagButton.length; i++) {
        (function(i) {
            closeTagButton[i].onclick = function() {
                closeTag(tag[i]);
            }
        })(i);
    }
})();


/**
 * 分类树
 */

function typeTree() {
    var data = {
        "value": ["root", "根节点"],
        "children": [
            {
                "name": "类型", "value": ["root"],
                "children": [
                    { "name": "剧情", "value": ["leave"], },
                    { "name": "喜剧", "value": ["leave"], },
                    { "name": "动作", "value": ["leave"], },
                    { "name": "爱情", "value": ["leave"], },
                    { "name": "科幻", "value": ["leave"], },
                    { "name": "悬疑", "value": ["leave"], },
                    { "name": "惊悚", "value": ["leave"], },
                    { "name": "恐怖", "value": ["leave"], },
                    { "name": "犯罪", "value": ["leave"], },
                    { "name": "同性", "value": ["leave"], },
                    { "name": "音乐", "value": ["leave"], },
                    { "name": "歌舞", "value": ["leave"], },
                    { "name": "传记", "value": ["leave"], },
                    { "name": "历史", "value": ["leave"], },
                    { "name": "战争", "value": ["leave"], },
                    { "name": "西部", "value": ["leave"], },
                    { "name": "奇幻", "value": ["leave"], },
                    { "name": "冒险", "value": ["leave"], },
                    { "name": "灾难", "value": ["leave"], },
                    { "name": "武侠", "value": ["leave"], },
                    { "name": "情色", "value": ["leave"], },
                ],
            },
            {
                "name": "评分", "value": ["root"],
                "children": [
                    { "name": "0~2", "value": ["leave"] },
                    { "name": "2~4", "value": ["leave"] },
                    { "name": "4~6", "value": ["leave"] },
                    { "name": "6~8", "value": ["leave"] },
                    { "name": "8~10", "value": ["leave"] }
                ]
            },
            {
                "name": "地区", "value": ["root"],
                "children": [
                    { "name": "中国大陆", "value": ["leave"] },
                    { "name": "美国", "value": ["leave"] },
                    { "name": "香港", "value": ["leave"] },
                    { "name": "台湾", "value": ["leave"] },
                    { "name": "日本", "value": ["leave"] },
                    { "name": "韩国", "value": ["leave"] },
                    { "name": "英国", "value": ["leave"] },
                    { "name": "法国", "value": ["leave"] },
                    { "name": "德国", "value": ["leave"] },
                    { "name": "意大利", "value": ["leave"] },
                    { "name": "西班牙", "value": ["leave"] },
                    { "name": "印度", "value": ["leave"] },
                    { "name": "泰国", "value": ["leave"] },
                    { "name": "俄罗斯", "value": ["leave"] },
                    { "name": "伊朗", "value": ["leave"] },
                    { "name": "加拿大", "value": ["leave"] },
                    { "name": "澳大利亚", "value": ["leave"] },
                    { "name": "爱尔兰", "value": ["leave"] },
                    { "name": "瑞典", "value": ["leave"] },
                    { "name": "巴西", "value": ["leave"] },
                    { "name": "丹麦", "value": ["leave"] }]
            },
        ]
    },
        myChart = echarts.init(document.getElementsByClassName('type-tree')[0]),
        option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
            },
            series: [
                {
                    type: 'tree',
                    color: ['#000','#000', '#000', '#000', '#000','#000',  '#000', '#000','#000', '#000', '#000'],
                    data: [data],
                    left: '1%',
                    right: '1%',
                    top: '-15%',

                    symbol: 'circle',
                    orient: 'vertical',
                    symbolSize: 45,
                    
                    //关闭跟随提示
                    tooltip: {
                        show: false
                    },

                    expandAndCollapse: true,
                    
                    initialTreeDepth: 1,

                    label: {
                        position: 'inside',
                        verticalAlign: 'middle',
                        align: 'middle',
                        fontSize: 12,
                        color: '#fff'
                    },
                    itemStyle: {
                        color: '#000',
                        borderColor: '#000'
                    },
     
                    animationDurationUpdate: 750
                }
            ],
        };

    myChart.showLoading();
    myChart.setOption(option);
    myChart.hideLoading();

    myChart.on("click", function (param) {
        if (param.value[0] === "leave") {
            console.log(param.color)
        }

    });
}
window.onload = function() {
    typeTree()
}
