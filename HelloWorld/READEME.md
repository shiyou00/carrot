## Cocos2d-js

学习路径
1. 了解基础概念(反复熟悉)
2. 熟悉hello world 
3. 保卫萝卜2主页面设计


### 启动命令
```
  1 // 运行在指定的平台上
  2  cocos run -p web|ios|android|mac|win32
  3  // 将项目工程打包到指定的平台上
  4  cocos compile -p web|ios|android|mac|win32 -m release
```
 


### 基本概念

#### 导演(Director)
> 它把控着整个游戏的主循环以及游戏场景的切换等工作。cc.Director是一个单例类

- 设置帧率 (帧率是用于测量显示帧数的量度，其单位为“每秒显示帧数”（Frame per Second，FPS）)
```
cc.director.setAnimationInterval(1.0 / 60);
```

- 初始化管理器
    - 调度器
    - 动作管理器
    - 事件管理器
```
cc.Director = cc.class.extend({
    init:function(){
        this._scheduler = new cc.Scheduler(); //常见调度器
    }
})
```

- 初始化渲染器
> 渲染器用于将图片或者3D模型素材绘制到屏幕上,在HTML5中，iOS 8以上以及所有PC系统中，默认采用WebGL渲染，其他浏览器采用canvas绘制，例如Android手机上的浏览器。在Native上，全部采用OpenGL ES 2.0渲染。

- 获取屏幕大小
```
cc.Director = cc.Class.extend({
    getWinSize : function (){
        return cc.size(this._winSizeInPoints)
    },
    getWinSizeInPixels:function(){
        return cc.size(this._winSizeInPoints.width * this._contentScaleFactor,is._winSizeInPoints.height * this._contentScaleFactor)
    }
})

简便写法：
cc.winSize = cc.director.getWinSize();
```

- 执行游戏主循环


#### Cocos2d-JS坐标系

- 屏幕坐标系     左上角开始
- OpenGL坐标系   左下角开始

Cocos2d-JS并不是采用屏幕坐标系，而是选择了和OpenGL保持一致

可以通过cc.Director 进行坐标转换


#### 节点(node)
> 节点，是一个代词，它是一个抽象概念类，在Cocos2d-JS中为cc.Node类。也就是说，所有cc.Node类及其子类，都可以归称为节点。

节点相关属性：
基础属性
- 位置(position)   cc.p(100, 86)
- 大小(width,height) cc.size(125, 80)
- 锚点(一个100*100的节点如果需要放在屏幕上面，以哪个点为基准呢？这个点就是锚点) node.setAnchorPoint(0.5, 0.5);
- 层级(zIndex)
- 标签(tag)(在游戏中可能同时存在好多个节点，你可以为每个节点都贴上一个标签，方便区分它们。)
- 名字(name)
图形属性
- 旋转(rotation)
- 缩放(scale)
- 倾斜(skew)
- 可见性(visible)
- 不透明(opacity)
- 颜色(color)rgb
- 渲染程序（shader）
其他属性
- 父/子节点相关
- 运行状态(running)
- 动作管理器
- 到达顺序
常用函数
- 属性配置
- 节点操作
    - 增
    - 删除
    - 改
    - 查
- 暂停
- 恢复
- 动作操作
- 内存管理    
- 调度器(相当于定时器)
- 坐标转换
- 边框区域


#### 场景(Scene)
> 我总是喜欢把游戏和电影联想起来，因为游戏的开发和电影的制作是那么相似。当然，我更喜欢把Cocos2d-JS游戏和京剧联想起来，因为你会发现，Cocos2d-JS游戏的组织结构和京剧几乎一样，就比如Cocos2d-JS中的cc.Scene，它就对应着京剧中的舞台，供演员们表演。舞台一次展示一个，场景也只能一次运行一个，所以，在Cocos2d-JS游戏中，至少存在一个场景供游戏运作。先来看下cc.Scene的构造函数，具体如下：

*场景可以添加层，但是不能再添加场景。场景与场景的切换，只能通过cc.Director来实现*

*场景栈的方式*

```
  cc.Scene = cc.Node.extend({
      _className:"Scene",
      ctor:function () {
          cc.Node.prototype.ctor.call(this);             // 调用[父类构造函数]
          this._ignoreAnchorPointForPosition = true;     // 设置[忽略锚点]
          this.setAnchorPoint(0.5, 0.5);                 // 设置[锚点]
          this.setContentSize(cc.director.getWinSize()); // 设置[大小]
      }
  });
```
- 场景管理(只能通过导演)
- 切换特效(Cocos2d-JS提供了大几十种的过渡效果)
- 场景的生命周期(ctor：构造函数初始化，onEnter：场景进入，onEnterTransitionDidFinish：场景进入过渡效果执行完毕，onExitTransitionDidStart：场景退出过渡效果开始执行，onExit ：场景退出 )

#### 层(Layer)
> 层是一个容器，它最大的作用就是管理场景中的节点。层一般作为场景的子节点，当然，它也可以作为其他节点的子节点，进一步管理子节点的子节点，但这并不多见。下面为cc.Layer的构造函数：

```
1  cc.Layer = cc.Node.extend({
2      _className: "Layer",
3      ctor: function () {
4          var nodep = cc.Node.prototype;                  // 获取[父类原型]
5          nodep.ctor.call(this);                          // 调用[父类构造函数]
6          this._ignoreAnchorPointForPosition = true;      // 设置[忽略锚点]
7          nodep.setAnchorPoint.call(this, 0.5, 0.5);      // 设置[锚点]
8          nodep.setContentSize.call(this, cc.winSize);    // 设置[大小]
9      }
10 }
```
- cc.LayerColor 作为一个可以携带颜色的层
- cc.LayerGradient 为一个颜色渐变层
- cc.LayerMultiplex cc.LayerMultiplex对象可以用来管理其他的cc.Layer对象

#### 精灵

> 精灵是游戏引擎中一个不可或缺的元素，你可以用它来表示游戏中的背景、主角、血条等对象。每个精灵一般都关联着一张纹理贴图，也就是Texture2D对象，所以，在cc.Sprite类中，有一个texture属性。cc.Sprite渲染的矩形区域的内容可能是来自这张纹理贴图的某块区域或者是全部，当然，也可以是一个与纹理无关的纯色区域。Cocos2d-JS提供了4种创建精灵的方式，具体如下。


- 通过图片资源创建
```
var node = new cc.Sprite("res/node_256.png");
var node = new cc.Sprite(res.sh_node_256_png);
```
- 通过纹理创建
```
var textrue = cc.textureCache.addImage(res.sh_node_256_png);//图片资源已经被加载到内存中
var node = new cc.Sprite(textrue);
```
- 通过精灵表单创建

- 创建带有颜色的精灵

#### 场景树
> Cocos2d-JS游戏中有场景的概念，场景下面组织着各种层，层里面又放着精灵、标签（Label）、UI等节点。非常显然，这是树的结构。树是数据结构中非常重要的一个概念，它通常被用来组织一些具有层次结构的数据，而Cocos2d-JS正是结合了树的概念，实现了对节点的查找、遍历、修改和排序。Cocos游戏场景树如图3-8所示

#### 标签
> Label标签一般用来显示玩家的名字、等级、物品数量等文本。实际上，它和cc.Sprite等一样，属于引擎核心渲染部分。Label标签分为LabelTTF、LabelBMFont和LabelAtlas。
























### 工程目录结构

    CMakeLists.txt ---- Cocos Console编译时所依赖的文件
    
    frameworks ---- 包含Web引擎和Native引擎
       —cocos2d-html5 ---- Cocos2d-HTML5游戏引擎 
       —cocos2d-x ----  Cocos2d-x游戏引擎
       —runtime-src ---- 各平台的项目工程文件，包含iOS、Mac OS X、Android以及Windows等
    
    index.html
        Web工程的主页面，其主要内容和职责如下。
        • 包含用于显示游戏场景的canvas元素。
        • 引入用于引擎初始化和加载的引擎脚本：CCBoot.js。
        • 引入游戏启动的入口脚本：main.js。
        • 包含一些适配移动端浏览器页面的meta元素
        
    main.js ---- 游戏入口文件，其中包含游戏初始化代码以及启动代码
        
    manifest.webapp ----  热更新配置文件
    
    project.json ---- 工程配置文件
    
    publish ---- 该目录初始状态下不存在，当工程以发布模式打包后，会创建该文件夹并保存对应平台的发布包
    
    Runtime ---- 该目录初始状态下不存在，用来存储调试模式打包的工程执行文件
    
    res ---- 项目资源文件夹，用来存储所有图片、音频、字体以及动画等资源
    
    src ---- 项目脚本文件夹，用来存储游戏的所有JavaScript代码
        app.js 项目代码
        resource.js 资源的全局变量定义
    
        
#### project.json
```
{
    "project_type": "javascript",//项目类型

    "debugMode" : 1,//表示程序的调试级别，默认值是1，可选值为0到6。
    "showFPS" : true,//若其值为true，则游戏窗口左下角会显示绘制函数调用次数、渲染时间以及帧率。默认取值为true，项目打包上线时，应将其设置为false。
    "frameRate" : 60,//设置期望帧率。游戏中的实际帧率会取决于游戏每帧消耗时间和运行平台等条件，期望帧率会保证游戏运行帧率不会超过期望帧率，并尽力运行在期望帧率上。
    "noCache" : false,//设置是否让浏览器缓存html页面。
    "id" : "gameCanvas",//Web引擎页面中canvas元素的id，仅服务于Cocos2d-HTML5引擎。
    "renderMode" : 0,//0:由引擎自动选择绘制模式，遵循“择优选择”的理念，即若支持WebGL，则优先考虑使用WebGL绘制，否则采用canvas绘制。
    "engineDir":"frameworks/cocos2d-html5",//Cocos2d-HTML5引擎路径，仅在debug模式下有效，保持默认值即可。如果采用Cocos2d-JS Lite版开发游戏，则此字段可以忽略。

    "modules" : ["cocos2d"],//模块配置。可将游戏中需要引入的模块添加到此数组中，例如游戏中需要Chipmunk物理引擎支持，则应该在此数组中添加chipmunk字符串。此配置仅服务于Cocos2d-HTML5引擎，当Cocos Console在发布模式下编译生成项目时，会根据modules中所包含的模块进行打包。所以，modules应当保持精简，按需取值，避免打出的包中引入了没有用到的模块，增大了游戏脚本的大小。关于存在哪些模块以及每个模块的定义，可以参考frameworks/cocos2d-html5/modulesConfig.json文件。

    "jsList" : [//开发者的JS脚本游戏逻辑代码列表，游戏中所依赖的脚本都应该放入这个列表中。此外，应当注意这些JS文件的相互依赖关系以及加入的先后顺序。
        "src/resource.js",
        "src/app.js"
    ]
}
```


































    
    