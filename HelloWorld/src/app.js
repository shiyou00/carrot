/**
 * 定义一个层HelloWorldLayer
 */
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        // 调用父类的当前方法
        this._super();


        // 获取屏幕的大小
        var size = cc.winSize;

        // 创建字体标签
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);

        // 字体位置
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;

        // 把这个字体标签当做子标签加入这个HelloWorldLayer层
        this.addChild(helloLabel, 5);

        // 创建图片精灵
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        // 设置该精灵的属性 位置
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        // 把该精灵当做子节点添加到层里面
        this.addChild(this.sprite, 0);

        return true;
    }
});
/**
 * 创建一个场景
 */
var HelloWorldScene = cc.Scene.extend({

    onEnter:function () {
        //进入场景，调用父类的构造器
        this._super();
        // 初始化一个层
        var layer = new HelloWorldLayer();
        // 把层添加到场景中
        this.addChild(layer);
    }
});

