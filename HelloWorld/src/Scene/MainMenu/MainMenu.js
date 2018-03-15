// 这里加载场景Scene
var MainMenuScene = cc.Scene.extend({
     ctor : function () {
         this._super();
     } , 
    onEnter : function () {
        this._super();
        // 加载背景图
        this.loadBackgroundLayer();
        this.loadMainMenu();
    },
    loadBackgroundLayer: function () {
        this.backgroundLayer = new MMBackgroundLayer();
        this.addChild(this.backgroundLayer);
    },
    loadMainMenu : function () {
        this.loadMainMENU = new MMMainLayer();
        this.addChild(this.loadMainMENU);
    }
});