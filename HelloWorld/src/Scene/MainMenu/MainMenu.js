// 这里加载场景Scene
var MainMenuScene = cc.Scene.extend({
     ctor : function () {
         this._super();
     } , 
    onEnter : function () {
        this._super();
        // 加载背景图
        this.loadBackgroundLayer();
        
    },
    loadBackgroundLayer: function () {
        this.backgroundLayer = new MMBackgroundLayer();
        this.addChild(this.backgroundLayer);
    }
});