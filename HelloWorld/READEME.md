## Cocos2d-js

待完成任务
- 动作api汇总
- 阅读完api后把6号怪物的手臂运动给写了



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



#### cc.Action
> 每个节点都可以通过runAction(action)函数运行一个或多个动作
它的构造函数
```
1  cc.Action = cc.Class.extend({
2      originalTarget:null,
3      target:null,
4      tag:cc.ACTION_TAG_INVALID,
5      ctor:function () {
6          this.originalTarget = null;
7          this.target = null;
8          this.tag = cc.ACTION_TAG_INVALID;
9      }
10     //......
11 });
```



#### 瞬时动作

> 在一帧内执行结束的动作称为瞬时动作。cc.ActionInstant是所有瞬时动作类的父类，例如cc.Place、cc.Hide、cc.RemoveSelf等都是瞬时动作。

1. cc.place();的作用是将节点放置到某个指定位置，实际上它只是修改了节点的position坐标。
```
var place = cc.place(100,86);
node.runAction(place);
```
2. cc.FlipX和cc.FlipY
> cc.FlipX是将目标水平翻转，cc.FlipY则是将目标垂直翻转，true和false表示是否翻转

```
var flipX = cc.flipX(true);
var flipY = cc.flipY(false);
```
3. cc.Show和cc.Hide
> 几乎所有即时动作的实现都是直接修改其对应的属性，cc.Show和cc.Hide也不例外。cc.Show和cc.Hide通过修改节点的visible属性来达到显示和隐藏的功能。
```
var show = cc.show();//创建一个[显示]动作
var hide = cc.hide();//创建一个[隐藏]动作
```
4. cc.ToggleVisibility
> cc.ToggleVisibility动作可以切换节点的课时(Visible)属性，当节点可见时，运动此动作，则会隐藏
```
var toggleVisibility = cc.toggleVisibility();
```
5. cc.RemoveSelf
> 就是将正在运行此动作的节点从父节点移除，它实际上市调用了target(正在运行此动作的节点)的removeFromParent(isNeedCleanUp)函数

```
var moveSelf = cc.removeSelf();//等同于 cc.removeSelf(true)，目标节点以及它所关联的动作、调度器都将被移除
var mvoeSelf = cc.removeSelf(false);//只移除目标节点
```
6、cc.CallFun
> 运动回调函数

```
var moveTo = cc.moveTo(2,cc.p(100,200));
var callback = cc.callFunc(function(){
    cc.log("我已到达指定地点");
}).bind(this);
node.runAction(cc.sequence(moveTo,callback));
```


#### 持续动作

> 需要持续一定时间才能完成的动作称为持续动作，例如花2秒的时间让精灵移动到屏幕坐标(300, 200)的位置。由于持续动作需要持续一段时间才能完成，所以所有的持续动作都需要接收一个用于控制动作执行时间的参数duration。
大部分的持续动作可以分为两种——xxTo和xxBy，前者表示最终值，而后者表示相对改变值。


1. cc.moveTo,cc.moveBy 直线运动
```
其中，参数duration为持续时间，position可以为cc.p(x,y)类型的值，也可以为坐标的x值。当position为cc.p(x, y)时，y可以省略。
1  cc.moveTo(duration, position, y);
2  cc.moveBy(duration, position, y);

var moveTo = cc.moveTo(1,cc.p(-20,50));
var moveBy = cc.moveBy(1,cc.p(-20,50));
```

2. cc.JumpTo和cc.JumpBy
> Jump 动作以一定的轨迹让节点跳跃到指定的位置

```
cc.jumoTo(duration, position,y,height,jumps);
形参中也有position，这意味着若传入进去的参数为cc.p(x, y)类型的参数，则y同样可以省略。height为跳跃高度，jumps为跳跃的次数。示例如下：

var jumpTo = cc.jumpTo(1, cc.p(100,86) , 50 , 4);

```

3. cc.BezierTo 和 cc.BezierBy
> Bezier动作可以让节点做曲线运动，而曲线则由贝塞尔曲线描述。贝塞尔曲线又称贝兹曲线或贝济埃曲线，是应用于二维图形应用程序的数学曲线。

```
1  var size = cc.winSize;
2  // 【举例】：
3  // 条件：当前节点坐标为cc.p(0, 0)
4  // 要求：用1秒时间做贝塞尔曲线运动，将节点从当前位置移动到屏幕右下角
5  var bezierToConfig = [
6      cc.p(0, size.height),            // 起点控制点
7      cc.p(size.width, size.height),   // 终点控制点
8      cc.p(size.width, 0)              // 终点
9  ];
10 var bezierTo = cc.bezierTo(1, bezierToConfig);
11
12 //【举例】：
13 // 条件：当前节点坐标为cc.p(cc.winSize.width, 0)
14 // 要求：用1秒时间做相对贝塞尔曲线运动，将X轴往负方向移动到屏幕宽度的一半
15 var bezierByConfig = [
16     cc.p(0, size.height),
17     cc.p(-size.width / 2, size.height),
18     cc.p(-size.width / 2, 0)
19 ];
20 var bezierBy = cc.bezierBy(1, bezierByConfig);
21 node.runAction(cc.sequence(bezierTo, bezierBy));
```

4. cc,ScaleTo和cc.ScaleBy
> Scale动作可以让节点在指定的时间内进行缩放

```
cc.scaleTo(duration,sx,sy); sx,sy分别表示x轴和Y轴上的缩放。
//【举例】：用1秒的时间，把图片缩放到【原始】大小的50%
2  var scaleTo = cc.scaleTo(1, 0.5);
3  //【举例】：用1秒的时间，把图片缩放到【当前】大小的200%
4  var scaleBy = cc.scaleBy(1, 2);

node.runAction(cc.sequence(ScaleTo,scaleBy));

```

5. cc,RotateTo 和 cc.RotateBy
```
cc.rotateTo(duration,deltaAngleX,deltaAngleY);

var rotate = cc.rotateTo(1,-90,-45);//将X轴旋转到-90度，Y轴旋转到-45度
```

视觉特效动作：淡入，淡出，闪烁，帧动画

6. cc.FadeIn、cc.FadeOut和cc.FadeTo(实现节点透明度变化)

```
cc.fadeIn(duration);
cc.fadeOut(duration);
cc.fadeTo(duration,opacity);
```
7. cc.Blink 闪烁
```
cc.blink(duration,blinks);//blinks 闪烁次数
```

8. cc.Animation 
> 帧动画效果,使用图片的方式，或者使用plist精灵表单的方式创建


9. cc.Sequence 和 cc.Spawn 
> 符合动作 Sequence--队列 ， Spawn--并行执行

10. cc.Repeat 和 cc.RepeatForever

> cc.Repeat将动作重复执行指定的次数，而cc.RepeatForever则表示将动作无限重复执行

11. cc.DelayTime
> 为延时动作，类似多线程中的睡眠，在这一段时间中，它什么也不做，只是起到延时作用。

```
1  //【举例】：延时0.5秒，将节点的X轴坐标左移100像素
2  var delay = cc.delayTime(0.5);
3  var moveBy = cc.moveBy(1, cc.p(-100, 0));
4  var sequence = cc.sequence(delay, moveBy);
5  node.runAction(sequence);
```


#### 变速动作

1. cc.Speed
> cc.Speed 为线性变速动作
```
1  //【举例】：用时0.5秒，节点旋转-90度，重复4次，速度为原来的5倍
2  var rotate = cc.rotateBy(0.5, -90);
3  var repeat = rotate.repeatForever();
4  var speed = cc.speed(repeat, 5);
5  node.runAction(speed);
```

2. cc.ActionEase
>  使动作发生非线性速度变化,cc.ActionEase动作分为5类：指数缓冲、Sine缓冲、弹性缓冲、跳跃缓冲和回震缓冲。每类又可细分为In、Out和InOut三种，所以cc.ActionEase动作总共为15个。


````
1  //【举例】：用2秒时间，携带弹性缓冲效果，让节点的X轴坐标向左移动300像素
2  var moveTo = cc.moveBy(2, cc.p(300, 0));
3  var elasticInMoveTo = moveTo.easing(cc.easeElasticIn());
4  node.runAction(elasticInMoveTo);
````


------------------------------------------------------------

### 事件





### 事件管理器

>顾名思义，事件管理器就是负责管理事件监听器的，它是事件监听器的大总管，管理事件监听器的添加、删除以及分发。cc.EventManager是一个单例类


### 添加事件监听器

```
cc.eventManager.addListener(listener, nodeOrPriority);
```




### 删除事件监听器
```
cc.eventManager.removeListener(listener);
```


### 设置事件监听器的优先级




















------------------------------------------------------------

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


































    
    