//用户交互层
var MMMainLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
        // 加载["开始冒险" 和 "天天向上" 菜单]
        this.loadMenu();
        // 加载[“设置”按钮]
        // 加载[“帮助”按钮]
        // 加载底部的1号和3号[怪物]
        // 加载底部遮挡在1号、5号以及6号怪物之前的[云朵]
        // 加载前面的5号[怪物]
        // 加载前面遮罩在5号怪物身上的[云朵]
        // 加载[萝卜]
        // 加载[前景]
    } ,
    loadMenu : function () {
        // 开始冒险
        //创建3个精灵
        var startNormal = new cc.Sprite(res.mm_front_btn_start_normal_png);
        var startPress = new cc.Sprite(res.mm_front_btn_start_pressed_png);
        var startDisabled = new cc.Sprite(res.mm_front_btn_start_normal_png);
        var _size = cc.winSize;
        // MenuItemSprite 熟悉下api
        var start = new cc.MenuItemSprite(
            startNormal,
            startPress,
            startDisabled,
            function () {
                cc.log("点击“开始冒险”按钮");
            }.bind(this)
        );
        start.setPosition(_size.width/2-8,_size.height/2+75);

        //天天向上
        var floorNormal = new cc.Sprite(res.mm_front_btn_floor_normal_png);
        var floorPress = new cc.Sprite(res.mm_front_btn_floor_pressed_png);
        var floorDisabled = new cc.Sprite(res.mm_front_btn_floor_normal_png);
        var floor = new cc.MenuItemSprite(
            floorNormal ,
            floorPress ,
            floorDisabled ,
            function () {
                cc.log("点击“天天向上”按钮");
            }.bind(this)
        );
        floor.setPosition(_size.width/2-8 , _size.height/2-45);

        var menu = new cc.Menu(start , floor);
        this.addChild(menu);
        menu.setPosition(0,0);
    }
});