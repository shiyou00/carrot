// 游戏开始执行函数
cc.game.onStart = function(){
    var sys = cc.sys;
    console.log(sys);
    if(!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);

    // Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
    if (sys.isMobile && 
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // 用来设置游戏设计分辨率的尺寸以及适配策略
    /**
     * cc.ResolutionPolicy.SHOW_ALL表示显示所有，此模式会按原始宽高比等比缩放游戏世界以适配屏幕，保证了最小的一个方向上充满屏幕，另一个方向等比缩放，从而使得游戏内容全部可见。当然，这样当屏幕宽高比不等于设计分辨率的宽高比时，窗口中会有一定的黑边
     *
     *
     *
     *
     *
     */
    cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    // 加载资源
    cc.LoaderScene.preload(g_resources, function () {
        // 运行场景
        cc.director.runScene(new MainMenuScene());
    }, this);
};

cc.game.run();