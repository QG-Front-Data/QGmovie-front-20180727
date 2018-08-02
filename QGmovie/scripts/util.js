/**
 * 对表单的输入字符个数进行限制，超出的话截取前number个字符作为这个表单的值
 * @func
 * @param {*} input 输入表单的对象
 * @param {*} number 输入的字数限制
 */
function inputLimit(input, number) {
    if (input.value.length > number) {
        return input.value.slice(0, number);
    }
    return input.value;
}

/**
 * 这是发送所有请求的方法，所有的servlet请求都要经过这个函数
 * @func
 * @param {String} serverAddress 服务器地址
 * @param {String} method 请求方式
 * @param {String} sendData 要发送的数据
 * @param {String} sendDataType 数据类型
 * @param {String} contentType 请求头
 * @param {Function} successCallback 请求成功后的执行函数。两个函数的第一个参数都是请求对象，第二个参数都是状态码
 * @param {Function} errorCallback 请求失败时候的执行函数。
 */
function ajaxRequest(serverAddress, method, sendData, sendDataType, contentTypes , successCallback, errorCallback) {
    $.ajax({
    	url: serverAddress,
    	type: method,
        data: sendData,
        dataType: sendDataType,
    	processData: false,
    	contentType: contentType,
        complete: callback,
    	//contentType: contentTypes,
        success: successCallback,
        error: errorCallback
    	});
};

/**
 * 当测试结果不为空，则返回true，当测试结果为空的时候，则返回false。
 * @func
 * @param {RegExp} pattern 正则表达式
 * @param {String} text 要验证的正则表达式
 */
function RegExpTest(pattern, text) {
    return pattern.exec(text) !== null ? true : false;
}

/**
 * 这是一个兼容性的监听事件。只需要直接用这个对象的方法就行。惰性加载函数，所以控制台输出只能是当前浏览器支持的监听事件
 * @event
 * @function EventUtil.addHandler 全局的添加事件的方法。
 * @function EventUtil.removeHandler 全局的删除事件的方法。
 * @param {Object} element 添加事件的对象
 * @param {String} type 事件类型
 * @param {Function} handler 事件监听函数
 */
var EventUtil = {
    
    addHandler: (function (element, type, handler) {
        if (element.addEventListener) {
            return function () {
                arguments[0].addEventListener(arguments[1], arguments[2], false);
            }
        } else if (element.attachEvent) {
            return function () {
                arguments[0].attachEvent("on" + arguments[1], arguments[2]);
            }
        } else {
            return function () {
                arguments[0]["on" + arguments[1]] = arguments[2];
            }
        }
    })(window),

    removeHandler: (function(element, type, handler) {
        if (element.addEventListener) {
            return function () {
                arguments[0].removeEventListener(arguments[1], arguments[2], false);
            }
        } else if (element.attachEvent) {
            return function () {
                arguments[0].detachEvent("on" + arguments[1], arguments[2]);
            }
        } else {
            return function () {
                arguments[0]["on" + arguments[1]] = null;
            }
        }
    })(window)
}; 

/**
 * 为元素添加一个CSS类
 * @param {*} elements 
 * @param {*} cName 
 */
function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    };
};

/**
 * 移除元素的一个CSS类 
 * @param {*} elements 
 * @param {*} cName 
 */
function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    };
}

/**
 * 查找元素节点函数
 * @param {*} node 
 */
function findElementNode(node) {
    var nodeArray = new Array();
    for (var i = 0; i < node.length; i++) {
        if (node[i].nodeType == 1) {
            nodeArray.push(node[i]);
        }
    }
    return nodeArray;
}

/**
 * 检查元素是否有某个CSS类
 * @param {*} elements 
 * @param {*} cName 
 */
function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
}

/**
 * 切换元素的类型
 * @param {*} elements 
 * @param {*} cName 
 */
function toogleClass(elements, cName) {
    if (hasClass(elements, cName)) {
        removeClass(elements, cName);
    } else {
        addClass(elements, cName);
    }
}

/**
 * 采用懒加载检测requestAnimationFrame兼容性
 * DATE 20180801
 * @author czf
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
/** 
 * 根据模板创建函数
 * DATE 20180802
 * @author czf
 * @param {*} model 模板
 * @param {*} tag 要创建的标签名
 * @param {*} parentNode 要追加的父节点
 * @param {*} num  要创建的数量
 */

function createModel(model, tag, parentNode, num) {
    for(var i = 0; i < num; i++) {
        var newNode = document.createElement(tag);
        newNode.innerHTML = model;
        parentNode.appendChild(newNode);
    }
}
/**
 * 填充数据函数
 * DATE 20180802
 * @author czf
 * @param {*} el 要填入数据的元素
 * @param {*} detail 要填入的数据
 */
function addDetail(el, detail) {
    el.innerHTML = detail;
}