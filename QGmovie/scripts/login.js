/**
 * 登录表单的输入事件处理
 */
function loginModel() {
    var loginContainer = $('.login-container')[0],
        signinContainer = $('.signin-container')[0],
        loginAccount = $('#login-account')[0],
        loginPassword = $('#login-password')[0],
        loginButton = $('#login-button')[0],
        loginInput = $('.login-container input'),
        switchButton = $('.switch-button')[0].getElementsByTagName('button'),
        filterPattern = /^[\u4E00-\u9FA5|￥……&*（）——|【】‘；：”“’。，、？]$/,     // 用于过滤掉输入密码
        /* JSON对象 */
        jsonObj = {},
        i,
        str;

    /* 这是登录模块的鼠标点击事件 */
    function loginClick(event) {
        switch (event.target) {
            case loginButton : {
                /*  */
                for (i = 0; i < 2; i++) {
                    jsonObj[loginInput[i].name] = loginInput[i].value;
                }
                /* 发送请求 */
                ajaxRequest('http://ip:8080/qgmovie/login', 
                            'post', 
                            JSON.stringify(jsonObj), 
                            'json', 
                            'application/json', 
                            function(xhr, status) {
                                switch(status) {
                                    /* 根据返回的状态码执行下一步 */ 
                                    
                                }
                            })
                break;
            }

            case switchButton[1]: {
                addClass(switchButton[0], 'button-active');
                removeClass(switchButton[1], 'button-active');
                loginContainer.style.display = 'none';
                signinContainer.style.display = 'block';
                break;
            }

            case $('.password-icon')[0]: {
                changePasswordView($('.password-icon:eq(0)').parent());
                break;
            }
        }
    }

    /* 这个是登录注册输入的监听事件函数 */
    function loginInputEvent(event) {
        switch (event.target) {
            case loginAccount : {
                loginAccount.value = inputLimit(loginAccount, 32);
                break;
            }

            case loginPassword : {
                loginPassword.value = inputLimit(loginPassword, 18);

                str = '';
                for (i = 0; i < loginPassword.value.length; i++) { 
                    str = str + loginPassword.value.substr(i, 1).replace(filterPattern, ''); 
                } 
                loginPassword.value = str;
                break;
            }
        }
    }

    /* 添加事件 */
    EventUtil.addHandler(loginContainer, 'input', loginInputEvent);
    EventUtil.addHandler(document, 'click', loginClick);
}

/**
 * 注册模块
 */
function registerModel() {
    var loginContainer = $('.login-container')[0],
        signinContainer = $('.signin-container')[0],
        username = $('#username')[0],
        account = $('#signin-account')[0],
        password = $('#signin-password')[0],
        commitpassword = $('#commit-password')[0],
        signinButton = $('#signin-button')[0],
        signInput = signinContainer.getElementsByTagName('input'),
        passwordIcon = signinContainer.getElementsByClassName('password-icon'),
        passwordType = signinContainer.getElementsByClassName('password-type')[0],
        passwordWord = passwordType.getElementsByTagName('b')[0],
        passwordStrengthIntro = passwordType.getElementsByTagName('i')[0],
        strengthColor = passwordType.getElementsByTagName('span'),
        switchButton = $('.switch-button')[0].getElementsByTagName('button'),
        weakPattern1 = /^[0-9]*$/,    // 密码是纯数字
        weakPattern2 = /^[a-zA-Z]+$/,    // 密码是纯英文
        weakPattern3 = /^[~!@#$%^&\s*\(\)\{\}\[\]"'|\\:;<,>.?\/`\-\=\_\+]+$/,    // 密码是纯字符
        mediumPattern1 = /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+$/,     // 密码是数字+字母
        mediumPattern2 = /^(?![a-zA-Z]+$)(?![~!@#$%^&\s*\(\)\{\}\[\]"'|\\:;<,>.?\/`\-\=\_\+]+$)[a-zA-Z~!@#$%^&\s*\(\)\{\}\[\]"'|\\:;<,>.?\/`\-\=\_\+]+$/,   // 密码是字母+特殊字符
        mediumPattern3 = /^(?!\d+$)(?![~!@#$%^&\s*\(\)\{\}\[\]"'|\\:;<,>.?\/`\-\=\_\+]+$)[\d~!@#$%^&\s*\(\)\{\}\[\]"'|\\:;<,>.?\/`\-\=\_\+]+$/,       // 密码是数字+特殊字符
        strongPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&\s*\(\)\{\}\[\]"'|\\:;<,>.?\/`\-\=\_\+])[\da-zA-Z~!@#$%^&\s*\(\)\{\}\[\]"'|\\:;<,>.?\/~`\-\=\_\+]+$/,  // 密码是数字+字母+特殊字符
        emailPattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        filterPattern = /^[\u4E00-\u9FA5|￥……&*（）——|【】‘；：”“’。，、？]$/,     // 用于过滤掉输入密码
        i,
        str;

    /**
     * 判断密码强度的函数
     */
    function passwordStrength() {
        var text = password.value;
        switch(!null) {
            case weakPattern1.test(text): 
            case weakPattern2.test(text): 
            case weakPattern3.test(text): {
                /* 低强度 */
                clearStrengthColor(1);
                passwordStrengthIntro.style.color = 'black';
                strengthColor[0].style.backgroundColor = '#E93737';
                passwordWord.style.color = '#E93737';
                passwordWord.innerText = '弱';
                break;
            }

            case mediumPattern1.test(text):
            case mediumPattern2.test(text):
            case mediumPattern3.test(text): {
                /* 中等强度 */
                clearStrengthColor(2);
                strengthColor[1].style.backgroundColor = '#E9E337';
                passwordWord.style.color = '#E9E337';
                passwordWord.innerText = '中';
                break;
            }
            
            case strongPattern.test(text): {
                /* 高强度 */
                strengthColor[2].style.backgroundColor = '#4CE937';
                passwordWord.style.color = '#4CE937';
                passwordWord.innerText = '强';
                break;
            }
        }

        if (text.length === 0) {
            clearStrengthColor(0);
            passwordStrengthIntro.style.color = 'rgba(0, 0, 0, 0)';
            passwordWord.style.color = 'rgba(0, 0, 0, 0)';
        }
    }

    /**
     * 改变密码强度的颜色
     * @param {Number} level 想要消除密码强度的颜色
     */
    function clearStrengthColor(level) {
        strengthColor[level].style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }

    /**
     * 这是输入函数
     * @param {Number} index 下标
     * @param {String} text 输入内容
     * @param {String} property diplay的属性值
     */
    function promptMessage(index, property, text) {
        $('.prompt:eq('+ index +')').css('display', property);
        $('.prompt span:eq('+ index +')')[0].innerText = text;
    }


    /**
     * 注册界面的提交表单函数
     * @param {Object} jsonObj 将表单信息进行封装为json对象
     */
    function signinSubmit() {
        var jsonObj = {};
        switch(true) {
            case (account.value.length == 0): {
                promptMessage(0, 'block', '请输入邮箱地址');
                account.focus();
                return;
            }

            case (!emailPattern.test(account.value)): {
                account.focus();
                return;
            }

            case (username.value.length == 0): {
                promptMessage(1, 'block', '请输入姓名');
                account.focus();
                return;
            }

            case (password.value.length < 6): {
                password.focus();
                return;
            }

            case (password.value.length == 0): {
                promptMessage(2, 'block', '请输入姓名');
                password.focus();
                return;
            }

            case (password.value !== commitpassword.value): {
                promptMessage(3, 'block', '密码不一致');
                commitpassword.focus();
                return;
            }
        }

        /* 对数据进行打包并发送 */
        for (i = 0; i < 4; i++) {
            jsonObj[signInput[i].name] = signInput[i].value;
        }

        /* 发送请求 */
        ajaxRequest('http://ip:8080/qgmovie/resigter', 
                    'post', 
                    JSON.stringify(jsonObj), 
                    'json', 
                    'application/json', 
                    function(xhr, status) {
                        /* 回调函数 */
                        switch(status) {
                            case 1: {
                                /* 注册成功 */
                                break;
                            }

                            case 2: {
                                /* 账户已经存在 */
                                break;
                            }

                            default: {
                                /* 无法连接网络 */
                            }
                        }
                    });

    }

    /**
     * 注册页面的输入事件
     * @param {*} event 事件对象
     */
    function signinInput(event) {
        switch(event.target) {
            case password: {
                password.value = inputLimit(password, 18);
                
                /* 将输入的密码串去掉中文字符 */
                str = '';
                for (i = 0; i < password.value.length; i++) { 
                    str = str + password.value.substr(i, 1).replace(filterPattern, ''); 
                } 
                password.value = str;

                if (password.value.length > 6||password.value.length == 0) {
                    promptMessage(2, 'none', '');
                } else {
                    promptMessage(2, 'block', '密码长度过短');
                }

                passwordStrength();
                break;
            }

            case username: {
                username.value = inputLimit(username, 30);

                if (username.value.length >= 2||username.value.length == 0) {
                    promptMessage(1, 'none', '');
                } else {
                    promptMessage(1, 'block', '用户名过短');
                }

                break;
            }

            case account: {
                account.value = inputLimit(account, 32);
                if (emailPattern.test(account.value) === true||account.value.length == 0) {
                    /* 不符合要求提示 */
                    promptMessage(0, 'none', '');
                } else {
                    promptMessage(0, 'block', '邮箱格式不正确');
                }
                break;
            }

            case commitpassword: {
                commitpassword.value = inputLimit(commitpassword, 20);

                str = '';
                for (i = 0; i < commitpassword.value.length; i++) { 
                    str = str + commitpassword.value.substr(i, 1).replace(filterPattern, ''); 
                }
                commitpassword.value = str;

                if (commitpassword.value === password.value||commitpassword.value.length == 0) {
                    /* 当输入确认密码与初始密码不相同的时候 */
                    promptMessage(3, 'none', '');
                } else {
                    promptMessage(3, 'block', '密码不一致');
                }
                break;
            }
        }
    }

    /**
     * 注册页面的点击事件
     * @param {*} event 事件对象
     */
    function signinClick(event) {
        switch(event.target) {
            case switchButton[0]: {
                addClass(switchButton[1], 'button-active');
                removeClass(switchButton[0], 'button-active');
                loginContainer.style.display = 'block';
                signinContainer.style.display = 'none';
                break;
            }

            case signinButton: {
                signinSubmit();
                break;
            }

            case $('.signin-container .password-icon')[0]: {
                changePasswordView($('.signin-container .password-icon:eq(0)').parent());
                break;
            }

            case $('.signin-container .password-icon')[1]: {
                changePasswordView($('.signin-container .password-icon:eq(1)').parent());
                break;
            }
        }
    }

    EventUtil.addHandler(document, 'click', signinClick);
    EventUtil.addHandler(signinContainer, 'input', signinInput);
}
window.onload = function() {
    /* 调用登录和注册模块函数 */
    registerModel();
    loginModel();
}
    
/**
* 对密码明暗文的切换
* @param dom 密码表单的父亲节点，对密码表单进行判断并且对图标进行更改 
*/
function changePasswordView($dom) {
    var $input = $dom.children('input'),
        $span = $dom.children('span');

    if ($input.prop('type') === 'password') {
        $span.css('background-image', 'url(../images/password2.png)');
        $input.attr('type', 'text');
    } else {
        $span.css('background-image', 'url(../images/password1.png)');
        $input.attr('type', 'password');
    }
}