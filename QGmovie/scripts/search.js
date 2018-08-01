
function typeTree() {
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
        if (param.value[0] === "leave")
        {
            console.log(param.color)
        }
        
    });
}
window.onload = function() {
    typeTree()
}