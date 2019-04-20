---
title: 移动端事件——Touch事件
date: 2016-08-25 20:23:37
categories: javaScript应用
description: 移动端事件——Touch事件
tags:
  - javascript
  - touch
---
# 移动端事件——Touch事件

## Touch事件

#### 触摸事件包含4个接口

**TouchEvent**       
代表当触摸行为在平面上变化的时候发生的事件.

**Touch**   
代表用户与触摸平面间的一个接触点.

**TouchList**    
代表一系列的Touch; 一般在用户多个手指同时接触触控平面时使用这个接口.

**DocumentTouch**   
DocumentTouch 接口提供了一个便利的方法来创建 Touch 和 TouchList 对象, 可是它将被移除。 但这个方法将会继续在Document 接口中存在.


### TouchEvent   

TouchEvent 是一类描述手指在触摸平面（触摸屏、触摸板等）的状态变化的事件。这类事件用于描述一个或多个触点，使开发者可以检测触点的移动，触点的增加和减少，等等。

#### 构造函数

TouchEvent()      
创建一个TouchEvent对象。    
```
var event = new TouchEvent(typeArg, touchEventInit);
```
typeArg

用字符串来代表事件的名称。

touchEventInit

是一个TouchEventInit 字典，它拥有以下属性：

* "touches",可选的,默认为[],	TouchList类型（包含了一系列Touch对象的数组），当前位于屏幕上的所有手指的列表。

* "targetTouches",与touches类似，但是增加了个过滤条件，要与第一个手指点的地方（同一个节点内）相同。

* "changedTouches",可选的,默认为[],在**touchstart**中：列出在此次事件中新增加的触点。如果同时放下一根或两根手指，那么将与touches相同，但如果先放一根，在放第二根，那就会不同。在**touchmove**中：列出和上一次事件相比较，发生了变化的触点。在**touchend**中：列出离开触摸平面的触点（这些触点对应已经不接触触摸平面的手指）。

* "ctrlKey", 可选的,默认为false,布尔类型,表明按下了ctrl键。

* "shiftKey",可选的,默认为false,布尔类型,表明按下了shift键。

* "altKey",可选的,默认为false,布尔类型,表明按下了alt键。

* "metaKey",可选的,默认为false,布尔型,表明按下了meta键。

#### 属性列表

**TouchEvnt.altKey 只读**    
布尔值，指明触摸事件触发时，键盘 alt 键是否被按下。

**TouchEvent.changedTouches 只读**     
一个 TouchList 对象，包含了代表所有从上一次触摸事件到此次事件过程中，状态发生了改变的触点的 Touch 对象。

** TouchEvent.ctrlKey 只读**    
布尔值，指明触摸事件触发时，键盘 ctrl 键是否被按下。

** TouchEvent.metaKey 只读**    
布尔值，指明触摸事件触发时，键盘 meta 键 （Wikipedia - meta Key）是否被按下。

** TouchEvent.shiftKey 只读**    
布尔值，指明触摸事件触发时，键盘 shift 键是否被按下。

** TouchEvent.targetTouches 只读**    
一个 TouchList 对象，是包含了如下触点的 Touch 对象：触摸起始于当前事件的目标 element 上，并且仍然没有离开触摸平面的触点。

** TouchEvent.touches 只读**    
一 个 TouchList 对象，包含了所有当前接触触摸平面的触点的 Touch 对象，无论它们的起始于哪个 element 上，也无论它们状态是否发生了变化。



#### 触摸事件的类型 （基本事件）     
为了区别触摸相关的状态改变，存在多种类型的触摸事

> 注意: 在很多情况下，触摸事件和鼠标事件会同时被触发（目的是让没有对触摸设备优化的代码仍然可以在触摸设备上正常工作）。如果你使用了触摸事件，可以调用 event.preventDefault() 来阻止鼠标事件被触发。

**touchstart**：当手指放在屏幕上触发  

当用户在触摸平面上放置了一个触点时触发。事件的目标 element 将是触点位置上的那个目标 element

**touchmove**：当手指在屏幕上滑动时，连续地触发

当用户在触摸平面上移动触点时触发。事件的目标 element 和这个 touchmove 事件对应的 touchstart 事件的目标 element 相同，哪怕当 touchmove 事件触发时，触点已经移出了该 element 。

当触点的半径、旋转角度以及压力大小发生变化时，也将触发此事件。

>注意: 不同浏览器上 touchmove 事件的触发频率并不相同。这个触发频率还和硬件设备的性能有关。因此决不能让程序的运作依赖于某个特定的触发频率

**touchend**：当手指从屏幕上离开时触发

当一个触点被用户从触摸平面上移除（当用户将一个手指离开触摸平面）时触发。当触点移出触摸平面的边界时也将触发。例如用户将手指划出屏幕边缘。

事件的目标 element 和这个 touchend 事件对应的 touchstart 事件的目标 element 相同，哪怕 touchend 事件触发时，触点已经移出了该 element 。

已经被从触摸平面上移除的触点，可以在 changedTouches 属性定义的 TouchList 中找到。

**touchcancel**：当系统停止跟踪时触发;该事件暂时使用不到  

当触点由于某些原因被中断时触发。有几种可能的原因如下（具体的原因根据不同的设备和浏览器有所不同）：

* 由于某个事件取消了触摸：例如触摸过程被一个模态的弹出框打断。
* 触点离开了文档窗口，而进入了浏览器的界面元素、插件或者其他外部内容区域。
* 当用户产生的触点个数超过了设备支持的个数，从而导致 TouchList 中最早的 Touch 对象被取消。

```
var EventUtil = {
    addHandler: function(element,type,handler) {
        if(element.addEventListener) {
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent) {
            element.attachEvent("on"+type,handler);
        }else {
            element["on" +type] = handler;
        }
    },
    removeHandler: function(element,type,handler){
        if(element.removeEventListener) {
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent) {
            element.detachEvent("on"+type,handler);
        }else {
            element["on" +type] = null;
        }
    }
};
var touch = document.getElementById("touch");

//当手指接触屏幕时触发;
EventUtil.addHandler(touch,"touchstart",function(event){
    console.log(event);

});
// 连续滑动触发
EventUtil.addHandler(window,"touchmove",function(event){
    alert('move');
});
//当手指从屏幕上离开时触发;
EventUtil.addHandler(window,"touchend",function(event){
    alert('end');
});   


```


### Touch
Touch对象表示在触控设备上的触摸点。通常是指手指或者触控笔在触屏设备或者触摸板上的操作。

对象属性 Touch.radiusX, Touch.radiusY, 和 Touch.rotationAngle 表示用户触摸操作所作用的区域，即触摸区域。这些属性对于处理类似于手指触摸之类的不精确操作很有帮助。这些属性可以表示出一个尽可能匹配触控区域的椭圆形（例如用户的指尖触控）。

>注意: 以下很多属性的值需要依赖硬件设备去获取，例如，如果设备本身不支持侦测压感，那么 force 属性的值将始终是0，对于 radiusX 和 radiusY 来说同样可能有这种情况，如果设备认为触点只是一个点而不是一个面, 它们始终为1。

#### 构造函数    

Touch()     
创建一个Touch对象。

```
var touch = new Touch(touchInit);
```

touchInit

是一个TouchInit 字典，它拥有以下属性：
* "identifier", 必须，是一个长整型，表示一个触摸点的数字标记。

* "target", 必须, 是 EventTarget类型，表示在触摸点开始接触接触面时的节点。

* "clientX", 可选，默认为0，为双精度浮点数类型,表示触摸在浏览器视口的横轴坐标，不包括滚动条的偏移距离。

* "clientY", 可选，默认为0，为双精度浮点数类型,表示触摸在浏览器视口的横轴坐标，不包括滚动条的偏移距离。

* "screenX", 可选，默认为0，为双精度浮点数类型,表示以用户屏幕为基准的，触摸点横坐标。

* "screenY", 可选，默认为0，为双精度浮点数类型,表示以用户屏幕为基准的，触摸点纵坐标。

* "pageX",可选，默认为0，为双精度浮点数类型,表示触摸在用户屏幕的横轴坐标，包括滚动条的偏移距离。

* "pageY", 可选，默认为0，为双精度浮点数类型,表示触摸在用户屏幕的纵轴坐标，包括滚动条的偏移距离。

* "radiusX", 可选，默认为0，为浮点数类型。表示接触面（比如手指，触控笔）接触形成的椭圆，在rotationAngle角度下横轴上形成的椭圆半径。和screenX使用的CSS像素保持同一个缩放大小。这个值不能为负。

* "radiusY", 可选，默认为0，为浮点数类型。表示接触面（比如手指，触控笔）接触形成的椭圆，在rotationAngle角度下纵轴上形成的椭圆半径。和screenY使用的CSS像素保持同一个缩放大小。这个值不能为负。

* "force",可选，默认为0，为浮点数类型。表示触摸体对触摸面的压力值。范围为从0到1：0表示压力为零，1表示设备能承受的最大压力敏感值。对压力的敏感值变动范围根据不同环境变动比较大。

* "rotationAngle", 可选，默认为0，为浮点数类型。表示由 radiusX 和 radiusY决定的椭圆在顺时针方向相对其中心偏转的角度。这个值介于0到90度之间。如果由 radiusX 和 radiusY决定的椭圆是一个标准圆形，则rotationAngle没有任何效用。用户设备可能用0表示这种标准圆形的情况，或者用其他符合要求范围的值来表示（比如，用户设备可能用上一次的触摸事件rotationAngle值，来避免突然变动）。

​





#### 属性     
以下属性描述了用户的触摸行为

**Touch.identifier**     
此 Touch 对象的唯一标识符. 一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变. 可以根据它来判断跟踪的是否是同一次触摸过程. **只读属性.**

**Touch.screenX**    
触点相对于屏幕左边沿的的X坐标. **只读属性.**

**Touch.screenY**    
触点相对于屏幕上边沿的的Y坐标. **只读属性.**

**Touch.clientX**       
触点相对于可见视区(visual viewport)左边沿的的X坐标. 不包括任何滚动偏移. **只读属性.**

**Touch.clientY**     
触点相对于可见视区(visual viewport)上边沿的的Y坐标. 不包括任何滚动偏移. **只读属性.**

**Touch.pageX**    
触点相对于HTML文档左边沿的的X坐标. 当存在水平滚动的偏移时, 这个值包含了水平滚动的偏移. **只读属性.**

**Touch.pageY**    
触点相对于HTML文档上边沿的的Y坐标. 当存在水平滚动的偏移时, 这个值包含了垂直滚动的偏移. **只读属性.**

**Touch.radiusX**       
能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径. 这个值的单位和 screenX 相同. **只读属性.**

**Touch.radiusY**        
能够包围用户和触摸平面的接触面的最小椭圆的垂直轴(Y轴)半径. 这个值的单位和 screenY 相同. **只读属性.**

**Touch.rotationAngle**       
它是这样一个角度值：由radiusX 和 radiusY 描述的正方向的椭圆，需要通过顺时针旋转这个角度值，才能最精确地覆盖住用户和触摸平面的接触面. **只读属性.**

**Touch.force**      
手指挤压触摸平面的压力大小, 从0.0(没有压力)到1.0(最大压力)的浮点数. **只读属性.**

**Touch.target**      
当这个触点最开始被跟踪时(在 touchstart 事件中), 触点位于的HTML元素. 哪怕在触点移动过程中, 触点的位置已经离开了这个元素的有效交互区域, 或者这个元素已经被从文档中移除. 需要注意的是, 如果这个元素在触摸过程中被移除, 这个事件仍然会指向它, 但是不会再冒泡这个事件到 window 或 document 对象. 因此, 如果有元素在触摸过程中可能被移除, 最佳实践是将触摸事件的监听器绑定到这个元素本身, 防止元素被移除后, 无法再从它的上一级元素上侦测到从该元素冒泡的事件. **只读属性.**

#### 接触面      
Touch.radiusX, Touch.radiusY, 和 Touch.rotationAngle 描述了用户和触摸平面的接触面. 这在面向非精确触摸设备(由手指直接操作的触摸屏)开发时非常有用. 这些值描述了一个尽可能接近实际接触面(例如用户的指尖)的椭圆.


### TouchList    
一个 TouchList 代表一个触摸平面上所有触点的列表; 举例来讲, 如果一个用户用三根手指接触屏幕(或者触控板), 与之相关的TouchList 对于每根手指都会生成一个 Touch 对象, 共计三个.

#### 属性      

**TouchList.length**   
返回TouchList中 Touch 对象的数量. **只读属性.**

#### 方法    

**TouchList.identifiedTouch()**            
列表中标示符与指定值匹配的第一个Touch 对象会被返回.

**TouchList.item()**     
返回列表中以指定值作为索引的 Touch 对象. 你也可以使用数组的语法来引用TouchList(touchList[x]).

### DocumentTouch (已废弃)    

DocumentTouch 接口提供了一个便利的方法来创建 Touch 和 TouchList 对象, 可是它将被移除。 但这个方法将会继续在Document 接口中存在.

#### 方法   

**DocumentTouch.createTouch()**     
创建一个新的 Touch 对象.

**DocumentTouch.createTouchList()**    
创建一个新的 TouchList 对象.

#### 手势事件     
* gesturestart：当一个手指已经按在屏幕上，而另一个手指又触摸在屏幕时触发。     
* gesturechange：当触摸屏幕的任何一个手指的位置发生变化时触发。   
* gestureend：当任何一个手指从屏幕上面移开时触发。

>【注意】只有两个手指都触摸到事件的接收容器时才触发这些手势事件。

#### 触摸事件与手势事件之间的关系      
1、当一个手指放在屏幕上时，会触发touchstart事件，如果另一个手指又放在了屏幕上，则会触发gesturestart事件，随后触发基于该手指的touchstart事件。

2、如果一个或两个手指在屏幕上滑动，将会触发gesturechange事件，但只要有一个手指移开，则会触发gestureend事件，紧接着又会触发toucheend事件。     

#### 手势的专有属性          
* rotation：表示手指变化引起的旋转角度，负值表示逆时针，正值表示顺时针，从零开始。  
* scale：表示两个手指之间的距离情况，向内收缩会缩短距离，这个值从1开始，并随距离拉大而增长。    

**示例**
```
function handleGestureEvent(event) {
    var output = document.getElementById("output");
    switch(event.type) {
        case "gesturestart":
            output.innerHTML = "Gesture started (rotation=" + event.ratation +",scale=" + event.scale + ")";
            break;
        case "gestureend":
            output.innerHTML += "<br>Gesture ended (rotation+" + event.rotation + ",scale=" + event.scale + ")";
            break;
        case "gesturechange":
            output.innerHTML += "<br>Gesture changed (rotation+=" + event.rotation + ",scale+" + event.scale + ")";
            break;
    }
}
document.addEventListener("gesturestart", handleGestureEvent, false);
document.addEventListener("gestureend", handleGestureEvent, false);
document.addEventListener("gesturechange", handleGestureEvent, false);
```
### 总结

* **触摸事件**

	* touchstart          
	  当手指放在屏幕上触发。     
	* touchmove    
	  当手指在屏幕上滑动时，连续地触发。    
	* touchend     
	  当手指从屏幕上离开时触发。    
	* touchcancel    
	  当系统停止跟踪时触发，系统什么时候取消，文档没有明确的说明。    

* **除了常用的DOM属性，触摸事件还包含下列三个用于跟踪触摸的属性**
	* touches：表示当前跟踪的触摸操作的touch对象的数组。    
	  当一个手指在触屏上时，event.touches.length=1,    
	  当两个手指在触屏上时，event.touches.length=2，以此类推。

	* targetTouches：特定于事件目标的touch对象数组。     
	  因为touch事件是会冒泡的，所以利用这个属性指出目标对象。

	* changedTouches：表示自上次触摸以来发生了什么改变的touch对象的数组。    

	* 每个touch对象都包含下列几个属性：     
	  clientX：触摸目标在视口中的x坐标。       
	  clientY：触摸目标在视口中的y坐标。     
	  identifier：标识触摸的唯一ID。      
	  pageX：触摸目标在页面中的x坐标。       
	  pageY：触摸目标在页面中的y坐标。        
	  screenX：触摸目标在屏幕中的x坐标。      
	  screenY：触摸目标在屏幕中的y坐标。      
	  target：触摸的DOM节点目标。     


参考链接 ：     
	https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events
	https://segmentfault.com/a/1190000005609334
	http://www.jianshu.com/p/832f36531df9
	http://web.jobbole.com/85132/
