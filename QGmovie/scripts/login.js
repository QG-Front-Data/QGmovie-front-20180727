
/**
 * 登录表单的输入事件处理
 */
function loginModel() {
    var loginContainer = document.getElementsByClassName('login-container')[0];
        loginAccount = document.getElementById('login-account');
        loginPassword = document.getElementById('login-password');
        loginButton = document.getElementById('login-button');

    /* 登录模块的整体事件 */
    function loginEvent(event) {
        loginClick(event);
        loginInput(event);
    }

    /* 这是登录模块的鼠标点击事件 */
    function loginClick(event) {
        switch (event.target) {
            case loginButton : {

            }
        }
    }

    /* 这个是登录注册输入的监听事件函数 */
    function loginInput(event) {
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
    EventUtil.addHandler(loginContainer, 'input', loginEvent);
}

function registerModel() {
    var signinContainer = document.getElementsByClassName('signin-container')[0];
        username = document.getElementById('username');
        account = document.getElementById('account');
        password = document.getElementById('password');
        commitpassword = document.getElementById('commitpassword');
        signinButton = document.getElementById('signin-button');

        

}