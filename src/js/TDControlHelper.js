function TDControlHelper(element) {
    var elementObj = element;
    var positionX = 0;//X坐标
    var positionY = 0;//Y坐标
    var positionXLast = 0;//上一次X坐标
    var positionYLast = 0;//上一次Y坐标
    var isRun = false;//开始监控事件
    var nowFunRefresh = null;//刷新函数，只在变化时调用
    var nowFunBegin = null;//开始点击时调用
    var nowFunEnd = null;//结束时调用
    var nowFunKeyDown = null;//开始点击时调用
    var nowFunKeyHold = null;//刷新函数，按键持续时不断调用
    var nowFunKeyHoldTime = 30;//按键持续调用间隔时间，默认30毫秒
    var nowFunKeyHoldTimeId = null;//按键持续调用进程ID
    var nowFunKeyHoldEvent = {};//按键持续事件
    var nowFunKeyUp = null;//结束时调用
    elementObj.setAttribute('tabindex', '1');//接收键盘输入
    this.setFunRefresh = function (fun) {
        nowFunRefresh = fun;//刷新函数，只在变化时调用
    };
    this.getFunRefresh = function () {
        return nowFunRefresh;
    };
    this.setFunBegin = function (fun) {
        nowFunBegin = fun;//开始点击时调用
    };
    this.getFunBegin = function () {
        return nowFunBegin;
    };
    this.setFunEnd = function (fun) {
        nowFunEnd = fun;//结束时调用
    };
    this.getFunEnd = function () {
        return nowFunEnd;
    };
    this.setFunKeyDown = function (fun) {
        nowFunKeyDown = fun;//开始点击时调用
    };
    this.getFunKeyDown = function () {
        return nowFunKeyDown;
    };
    this.setFunKeyHold = function (fun, time) {
        nowFunKeyHold = fun;//开始点击时调用
        if (time != null && time > 0)
            nowFunKeyHoldTime = time;
        else
            nowFunKeyHoldTime = 30;
    };
    this.getFunKeyHold = function () {
        return nowFunKeyHold;
    };
    this.setFunKeyUp = function (fun) {
        nowFunKeyUp = fun;//结束时调用
    };
    this.getFunKeyUp = function () {
        return nowFunKeyUp;
    };
    //鼠标按下
    function mouseDown(event) {
        elementObj.focus();//设置键盘焦点
        if (event.buttons == 0 || event.button != 0)//点击鼠标左建
            return;//事件未监控
        positionX = event.x;
        positionY = event.y;
        if (nowFunBegin != null) {
            nowFunBegin(positionX, positionY);
        }
        positionXLast = positionX;
        positionYLast = positionY;
        isRun = true;
        event.preventDefault();//停止默认事件
    }

    //鼠标移动
    function mouseMove(event) {
        if (isRun == false || event.buttons == 0 || event.button != 0)
            return;//事件未监控
        positionX = event.x;
        positionY = event.y;
        var offsetX = positionX - positionXLast;
        var offsetY = positionY - positionYLast;
        if (nowFunRefresh != null) {
            if (offsetX != 0 || offsetY != 0)
                nowFunRefresh(positionX, positionY, offsetX, offsetY);
        }
        positionXLast = positionX;
        positionYLast = positionY;
        event.preventDefault();//停止默认事件
    }

    //鼠标抬起
    function mouseUp(event) {
        if (isRun == false || event.button != 0)
            return;//事件未监控
        positionX = event.x;
        positionY = event.y;
        var offsetX = positionX - positionXLast;
        var offsetY = positionY - positionYLast;
        if (nowFunEnd != null) {
            nowFunEnd(positionX, positionY, offsetX, offsetY);
        }
        positionXLast = positionX;
        positionYLast = positionY;
        isRun = false;
        event.preventDefault();//停止默认事件
    }

    //触屏按下
    function touchDown(event) {
        elementObj.focus();//设置键盘焦点
        if (event.touches.length != 1)//点击鼠标左建
            return;//事件未监控
        positionX = event.touches[0].clientX;
        positionY = event.touches[0].clientY;
        if (nowFunBegin != null) {
            nowFunBegin(positionX, positionY);
        }
        positionXLast = positionX;
        positionYLast = positionY;
        isRun = true;
        event.preventDefault();//停止默认事件
    }

    //触屏移动
    function touchMove(event) {
        if (isRun == false || event.touches.length != 1)
            return;//事件未监控
        positionX = event.touches[0].clientX;
        positionY = event.touches[0].clientY;
        var offsetX = positionX - positionXLast;
        var offsetY = positionY - positionYLast;
        if (nowFunRefresh != null) {
            if (offsetX != 0 || offsetY != 0)
                nowFunRefresh(positionX, positionY, offsetX, offsetY);
        }
        positionXLast = positionX;
        positionYLast = positionY;
        event.preventDefault();//停止默认事件
    }

    //触屏抬起
    function touchUp(event) {
        if (isRun == false || event.touches.length != 1)
            return;//事件未监控
        positionX = event.touches[0].clientX;
        positionY = event.touches[0].clientY;
        var offsetX = positionX - positionXLast;
        var offsetY = positionY - positionYLast;
        if (nowFunEnd != null) {
            nowFunEnd(positionX, positionY, offsetX, offsetY);
        }
        positionXLast = positionX;
        positionYLast = positionY;
        isRun = false;
        event.preventDefault();//停止默认事件
    }

    //按键按下
    function keyDown(event) {
        if (event.keyCode == 0)//按键
            return;//事件未监控
        if (nowFunKeyDown != null) {
            nowFunKeyDown(event.keyCode);
        }
        nowFunKeyHoldEvent[event.keyCode] = event;//添加到按键事件列表
        if (nowFunKeyHoldTimeId == null) {
            nowFunKeyHoldTimeId = setInterval(keyHold, nowFunKeyHoldTime);
        }
        event.preventDefault();//停止默认事件
    }

    //按键持续事件
    function keyHold() {
        if (nowFunKeyHold != null) {
            nowFunKeyHold(nowFunKeyHoldEvent);
        }
    }

    //按键抬起
    function keyUp(event) {
        if (event.keyCode == 0)//按键
            return;//事件未监控
        if (nowFunKeyUp != null) {
            nowFunKeyUp(event.keyCode);
        }
        delete nowFunKeyHoldEvent[event.keyCode];//移除按键事件列表
        if (nowFunKeyHoldTimeId != null &&
            Object.getOwnPropertyNames(nowFunKeyHoldEvent).length == 0) {
            clearInterval(nowFunKeyHoldTimeId);
            nowFunKeyHoldTimeId=null;
        }
        event.preventDefault();//停止默认事件
    }

    //绑定事件,true，捕获(事件响应前)。false，冒泡(事件响应后)。默认false。
    elementObj.addEventListener("mousedown", mouseDown, true);//鼠标按下
    elementObj.addEventListener("mousemove", mouseMove, true);//鼠标移动
    elementObj.addEventListener("mouseup", mouseUp, true);//鼠标抬起
    elementObj.addEventListener("mouseover", mouseDown, true);//鼠标移入
    elementObj.addEventListener("mouseout", mouseUp, true);//鼠标移开
    elementObj.addEventListener("touchstart", touchDown, true);//触屏按下
    elementObj.addEventListener("touchmove", touchMove, true);//触屏移动
    elementObj.addEventListener("touchend", touchUp, true);//触屏抬起
    elementObj.addEventListener("keydown", keyDown, true);//按键按下
    elementObj.addEventListener("keyup", keyUp, true);//按键抬起

    //绑定摄像机
    this.bindCamera = function (cameraHelper) {//鼠标或触摸
        this.setFunRefresh(function (positionX, positionY, offsetX, offsetY) {
            cameraHelper.rotationViewMatrix(offsetX * 0.1, -offsetY * 0.1);
        });
        this.setFunEnd(this.getFunRefresh());
        //按键
        this.setFunKeyHold(function (events) {
            for (k in events) {
                var event = events[k];
                if (event.keyCode == 37 || event.keyCode == 65) {
                    //left
                    cameraHelper.moveViewMatrix(-1, 0, 0);
                } else if (event.keyCode == 39 || event.keyCode == 68) {
                    //right
                    cameraHelper.moveViewMatrix(1, 0, 0);
                } else if (event.keyCode == 38 || event.keyCode == 87) {
                    //up
                    cameraHelper.moveViewMatrix(0, 0, 1);
                } else if (event.keyCode == 40 || event.keyCode == 83) {
                    //down
                    cameraHelper.moveViewMatrix(0, 0, -1);
                }
            }
        });
    };
}