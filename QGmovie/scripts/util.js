/**
 * 对表单的输入字符个数进行限制，超出的话截取前number个字符作为这个表单的值
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
 * @param {String} serverAddress 服务器地址
 * @param {String} method 请求方式
 * @param {String} sendData 要发送的数据
 * @param {String} sendDataType 数据类型
 * @param {String} contentType 请求头
 * @param {Function} callback 完成后的执行内容，第一个参数是请求对象，第二个参数是状态码 
 */
function ajaxRequest(serverAddress, method, sendData, sendDataType, contentType , callback) {
    $.ajax({
    	url: serverAddress,
    	type: method,
        data: sendData,
        dataType: sendDataType,
    	processData: false,
    	contentType: contentType,
        complete: callback
    	});
}

/**
 * 当测试结果不为空，则返回true，当测试结果为空的时候，则返回false。
 * @param {RegExp} pattern 正则表达式
 * @param {String} text 要验证的正则表达式
 */
function RegExpTest(pattern, text) {
    return pattern.exec(text) !== null ? true : false;
}

/**
 * 这是一个兼容性的监听事件。只需要直接用这个对象的方法就行
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
                element.attachEvent("on" + type, handler);
            }
        } else {
            return function () {
                element["on" + type] = handler;
            }
        }
    })(window),

    removeHandler: (function(element, type, handler) {
        if (element.addEventListener) {
            return function () {
                element.removeEventListener(type, handler, false);
            }
        } else if (element.attachEvent) {
            return function () {
                element.detachEvent("on" + type, handler);
            }
        } else {
            return function () {
                element["on" + type] = null;
            }
        }
    })(window)
}; 


// var EventUtil = {

//     addHandler: function(element, type, handler){
//     if (element.addEventListener){
//     element.addEventListener(type, handler, false);
//     } else if (element.attachEvent){
//     element.attachEvent("on" + type, handler);
//     } else {
//     element["on" + type] = handler;
//     }
//     },
//     removeHandler: function(element, type, handler){
//     if (element.removeEventListener){
//     element.removeEventListener(type, handler, false);
//     } else if (element.detachEvent){
//     element.detachEvent("on" + type, handler);
//     } else {
//     element["on" + type] = null;
//     }
//     }
//    }; 
