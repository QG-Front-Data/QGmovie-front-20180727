
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
        /* JSON对象 */
        jsonObj = {},
        i;

    /* 这是登录模块的鼠标点击事件 */
    function loginClick(event) {
        console.log(event.target)
        switch (event.target) {
            case loginButton : {
                /*  */
                for (i = 0; i < 2; i++) {
                    jsonObj[loginInput[i].name] = loginInput[i].value;
                }
                console.log(JSON.stringify(jsonObj))
                /* 发送请求 */
                ajaxRequest('http://ip:8080/qgmovie/logout', 'post', JSON.stringify(jsonObj), 'json', 'application/json' , function() {
                    
                })
                break;
            }

            case switchButton[1]: {
                loginContainer.style.display = 'none';
                signinContainer.style.display = 'block';
                break;
            }
        }
    }

    /* 这个是登录注册输入的监听事件函数 */
    function loginInput(event) {
        console.log("123")
        switch (event.target) {
            case loginAccount : {
                inputLimit(this, 32);
                break;
            }

            case loginPassword : {
                inputLimit(this, 18);
                break;
            }
        }
    }

    /* 添加事件 */
    EventUtil.addHandler(loginContainer, 'input', loginInput);
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
        passwordIcon = signinContainer.getElementsByClassName('password-icon'),
        passwordType = signinContainer.getElementsByClassName('password-type')[0],
        passwordWord = passwordType.getElementsByTagName('b')[0],
        passwordStrengthIntro = passwordType.getElementsByTagName('i')[0],
        strengthColor = passwordType.getElementsByTagName('span'),
        switchButton = $('.switch-button')[0].getElementsByTagName('button'),
        weakPattern1 = /^[0-9]*$/,    // 密码是纯数字
        weakPattern2 = /^[a-zA-Z]+$/,    // 密码是纯英文
        weakPattern3 = /^[@#$%^&]+$/,    // 密码是纯数字
        mediumPattern1 = /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+$/,     // 密码是数字+字母
        mediumPattern2 = /^(?![a-zA-Z]+$)(?![@#$%^&]+$)[a-zA-Z@#$%^&]+$/,   // 密码是字母+特殊字符
        mediumPattern3 = /^(?!\d+)(?![@#$%^&]+$)[\d@#$%^&]+$/,       // 密码是数字+特殊字符
        strongPattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]+$/,  // 密码是数字+字母+特殊字符
        emailPattern = /^((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d@#$%^&_+].{5,19})+$/,
        filterPattern = /^[\u4E00-\u9FA5|￥……&*（）——|{}【】‘；：”“'。，、？]$/,     // 用于过滤掉输入密码
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

            /* 当输入低强度的时候 */
            // default : {
            //     clearStrengthColor(1);
            //     strengthColor[0].style.backgroundColor = '#E93737';
            //     passwordWord.style.color = '#E93737';
            //     passwordWord.innerText = '弱';
            // }
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

                passwordStrength();
                break;
            }

            case username: {
                username.value = inputLimit(username, 10);
                break;
            }

            case account: {
                account.value = inputLimit(account, 32);
                if (emailPattern.test(account.value) === null) {
                    /* 不符合要求提示 */
                }
                break;
            }

            case commitpassword: {
                commitpassword.value = inputLimit(commitpassword, 18);

                str = '';
                for (i = 0; i < commitpassword.value.length; i++) { 
                    str = str + commitpassword.value.substr(i, 1).replace(filterPattern, ''); 
                } 
                commitpassword.value = str;

                if (commitpassword.value !== password.value) {
                    /* 当输入确认密码与初始密码不相同的时候 */
                } else {

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
                loginContainer.style.display = 'block';
                signinContainer.style.display = 'none';
                break;
            }

            case  
        }
    }

    /**
     * 对密码明暗文的切换
     * @param event 事件对象
     */
    function changeVisibility() {
        
    }

    EventUtil.addHandler(document, 'click', signinClick);
    EventUtil.addHandler(signinContainer, 'input', signinInput);
}
window.onload = function() {
    registerModel();
    loginModel();
}