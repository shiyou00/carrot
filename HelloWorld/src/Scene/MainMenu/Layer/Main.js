//用户交互层
var MMMainLayer = cc.Layer.extend({
    _size:cc.winSize,
    actionDuration:1,
    ctor : function () {
        this._super();
        // 加载["开始冒险" 和 "天天向上" 菜单]
        this.loadMenu();
        // 加载[“设置”按钮]
        this.loadSet();
        // 加载[“帮助”按钮]
        this.loadHelp();
        // 加载底部的1号和3号[怪物]
        this.loadMonsterThree();
        this.loadMonsterOne();
        // 加载2号怪物
        this.loadMonsterTwo();
        // 加载底部遮挡在1号、5号以及6号怪物之前的[云朵]
        this.loadCloud();
        // 加载前面的5号[怪物]
        this.loadMonsterFive();
        // 加载前面遮罩在5号怪物身上的[云朵]
        this.loadFiveCloud();
        // 加载[萝卜]
        this.loadCarrot();
        // 加载[前景]
        this.loadForeground();
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
    },
    loadSet:function () {
        var setBody = this.loadCommon(res.mm_front_monster_4_png,this._size.width/2-360,this._size.height/2+180);
        setBody.runAction(this.moveFive());
        var setNormal = new cc.Sprite(res.mm_front_btn_setting_normal_png);
        var setPress = new cc.Sprite(res.mm_front_btn_setting_pressed_png);
        var setDisabled = new cc.Sprite(res.mm_front_btn_setting_normal_png);
        var set = new cc.MenuItemSprite(
            setNormal,
            setPress,
            setDisabled,
            function () {
                cc.log("点击设置");
            }.bind(this)
        );
        set.setPosition(this._size.width/2-327,this._size.height/2+135);

        set.runAction(this.moveFive());


        var menu = new cc.Menu(set);
        this.addChild(menu);
        menu.setPosition(0,0);
    },
    loadHelp : function () {

        var helpBg = new cc.Sprite("res/MainMenu/front_monster_6_hand.png");
        this.addChild(helpBg);
        helpBg.setPosition(cc.winSize.width / 2 + 270, 270);

        // 左右摆动
        var rotateBy1 = cc.rotateBy(this.actionDuration * 0.8, -5);
        var rotateBy2 = cc.rotateBy(this.actionDuration * 0.8, 5);
        var seq = cc.sequence(rotateBy1, rotateBy2);
        var action = seq.repeatForever();
        helpBg.runAction(action);


        var queryNormal = new cc.Sprite(res.mm_front_btn_help_normal_png);
        var queryPress = new cc.Sprite(res.mm_front_btn_help_pressed_png);
        var queryDisabled = new cc.Sprite(res.mm_front_btn_help_normal_png);
        var query = new cc.MenuItemSprite(
            queryNormal,
            queryPress,
            queryDisabled,
            function () {
                cc.log("点击“疑问");
            }.bind(this)
        );
        query.setPosition(155, 365);

        var menu = new cc.Menu(query);
        helpBg.addChild(menu);
        menu.setPosition(0,0);



        var helpBody = new cc.Sprite("res/MainMenu/front_monster_6.png");
        this.addChild(helpBody);
        helpBody.setPosition(cc.winSize.width / 2 + 400, 280);

        // 上下移动
        var helpBodyMoveBy1 = cc.moveBy(this.actionDuration * 2, cc.p(0, 5));
        var helpBodyMoveBy2 = cc.moveBy(this.actionDuration * 2, cc.p(0, -5));
        var helpBodySeq = cc.sequence(helpBodyMoveBy1, helpBodyMoveBy2);
        var helpBodyAction = helpBodySeq.repeatForever();
        helpBody.runAction(helpBodyAction);


    },
    loadMonsterTwo:function () {
        var monsterTwo = new cc.Sprite(res.mm_front_monster_2_png);
        var self = this;
        this.addChild(monsterTwo);
        monsterTwo.setPosition(this._size.width/2-205,160);
        var action0 = cc.moveTo(this.actionDuration * 2,cc.p(this._size.width/2-220,170));
        // 运行完动作一，回调中运行动作二
        var action1 = cc.sequence(action0,cc.callFunc(function () {
            var blueMoveBy1 = cc.moveBy(self.actionDuration * 0.55 , cc.p(0,-5));
            var blueMoveBy2 = cc.moveBy(self.actionDuration * 0.55 , cc.p(0,5));
            var blueSeq = cc.sequence(blueMoveBy1,blueMoveBy2);
            var blueAction = blueSeq.repeatForever();
            monsterTwo.runAction(blueAction);
        }));
        monsterTwo.runAction(action1);
    },
    loadCarrot:function () {
        var node = this.loadCommon(res.mm_front_carrot_png,this._size.width/2+100,20);

        node.setScale(0.7);
        node.setPosition(this._size.width/2+320,120);
        var controlPointsTo = [
            cc.p(this._size.width/2+400 , 100),
            cc.p(this._size.width/2+120 , 0),
            cc.p(this._size.width/2+100 , 20)
        ];
        // cc.bezierTo(duration, control);
        var bezierTo = cc.bezierTo(this.actionDuration * 0.8 , controlPointsTo);
        // 缩放
        var scaleTo = cc.scaleTo( this.actionDuration * 0.8 , 1);
        // cc.Spawn是一个并行动作，即同时并发执行所有被包含在cc.Spawn里面的动作，所以，cc.Spawn里面包含的动作不用像cc.Sequence那样注意顺序
        var spawn = cc.spawn(bezierTo,scaleTo);
        node.runAction(spawn);

    },
    loadForeground:function () {
        this.loadCommon(res.mm_front_front_png,this._size.width/2,320);
    },
    loadMonsterFive:function () {
        this.loadCommon(res.mm_front_monster_5_png,this._size.width/2+300,184);
    },
    loadCloud:function () {
        this.loadCommon(res.mm_front_smoke_3_png,this._size.width/2+360,194);
    },
    loadFiveCloud:function () {
        this.loadCommon(res.mm_front_smoke_2_png,this._size.width/2+330,150);
    },
    loadMonsterOne:function () {
        this.loadCommon(res.mm_front_monster_1_png,this._size.width/2-300,180);
    },
    loadMonsterThree:function () {
        var m3 = this.loadCommon(res.mm_front_monster_3_png,this._size.width/2-380,210);
        m3.runAction(this.moveFive());

    },
    //通用加载简单精灵
    loadCommon:function (img,px,py) {
        var node = new cc.Sprite(img);
        this.addChild(node);
        node.setPosition(px,py);
        return node;
    },
    moveFive:function () {
        var helpBodyMoveBy1 = cc.moveBy(this.actionDuration * 2 , cc.p(0,5));
        var helpBodyMoveBy2 = cc.moveBy(this.actionDuration * 2 , cc.p(0,-5));
        var helpBodySeq = cc.sequence(helpBodyMoveBy1,helpBodyMoveBy2);
        return helpBodySeq.repeatForever();
    }
});