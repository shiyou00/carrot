//背景层
var MMBackgroundLayer = cc.Layer.extend({
    ctor : function () {
        // 调用父类构造函数
        this._super();
        this.loadBackground();
        return true;
    }, 
    loadBackground : function () {
        var node = new cc.Sprite(res.mm_front_bg_png);
        var _size = cc.winSize;
        this.addChild(node);
        node.setPosition(_size.width/2 , _size.height/2);//设置节点位置为中间
    }
});