---
title: Flex布局
date: 2016-08-25 20:23:37
categories: css3
description: Flex布局
tags:
  - css3
  - flex
  - 布局
---


注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

[flex学习地址]（https://css-tricks.com/snippets/css/a-guide-to-flexbox/）


### 一、基本概念

{% asset_img flexBox.png flexbox %}

```
Flex容器（flex container）：采用Flex布局的元素。
水平的主轴（main axis）和垂直的交叉轴（cross axis）。
主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；
交叉轴的开始位置叫做cross start，结束位置叫做cross end

```

### 二、容器的属性
有六个属性设置在容器上
* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

##### flex-direction属性
决定主轴的方向（即子元素的排列方向）
```
	.box {
	  flex-direction: row | row-reverse | column | column-reverse;
	}
```
{% asset_img direction.png direction %}
他有四个值
*  row(默认值)：主轴为水平方向，起点在左边
*  row-reverse:主轴为水平方向，起点为右边
*  column：主轴为垂直方向，起点在上方
*  column-reverse：主轴为垂直方向，起点在下方

##### flex-wrap属性
定义如果一条轴放不下，该如何换行
```
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
他有三个可取值
1. nowrap(默认)：不换行
<img src='images/flex/nowrap.png' width='700px'/>
2. wrap:换行，第一行在上方
<img src='images/flex/wrap.jpg' width='700px'/>
3. wrap-reverse:换行，第一行在下方
<img src='images/flex/wrap-reverse.jpg' width='700px'/>

##### flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
```
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

##### justify-content
定义了子元素在主轴上的对齐方向
```
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```
他有5个值
* flex-start(默认值)：左对齐
* flex-end:右对齐
* center：居中
* space-between：两端对齐，项目之间的间隔都相等
* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

{% asset_img justify-content.png justify-content %}

##### align-items
align-items属性定义项目在交叉轴上如何对齐
```
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```
* flex-start：交叉轴的起点对齐
* flex-end:交叉轴的终点对齐
* center：交叉轴的中点对齐
* baseline：项目的第一行文字的基线对齐
* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

##### align-content
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
* flex-start：交叉轴的起点对齐
* flex-end:交叉轴的终点对齐
* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
* center：与交叉轴的中点对齐。
* space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
* space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。


{% asset_img align-content.png align-content %}


### 三、项目的属性
以下6个属性设置在项目上
* order
* flex-grow
* flex-shrink
* flex-basis
* flex
* align-self

###### order
order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0
```
.item {
  order: <integer>;
}
```
{% asset_img order.png order %}

##### flex-grow
flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
<img src='images/flex/flex-grow.png' width='500px'/>

##### flex-shrink
定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
```
.item {
  flex-shrink: <number>; /* default 1 */
}
```

<img src='images/flex/flex-shrink.jpg' width='500px'/>
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小

##### flex-basis
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间

##### flex
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
```
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值.
##### align-self
align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
{% asset_img align-self.png align-self %}


### 四、flex兼容性

flex更新版本
* display:box是2009年的语法版本，使用时需要加上浏览器的前缀，不过现在已经过时了。
* display:flex是2012年最新修正的语法版本，浏览器支持较好，也将成为以后标准的语法。
* 中间2011年也提出了一个奇葩的语法版本display:flexbox，非官方的，当时主要是为IE浏览器使用。

#### PC端：
display:box 浏览器支持


|IE|Firefox|Chrome|Safari|Opera|
|-----|:-----:|:-----:|:-----:|-----|
|不支持|2.0-40.0（-moz-）|4.0-45.0(-webkit-)|6.0-8.0(-webkit-)|15.0-29.0(-webkit-)|

display:flex浏览器支持


|IE|Firefox|Chrome|Safari|Opera|
|-----|:-----:|:-----:|:-----:|-----|
|11.0+|22.0+|21.0+(-webkit-) 29.0+|6.1+(-webkit-) 9.0+|15.0+(-webkit-) 17.0+|

#### 移动端：
##### display:flex
  * iOS的原生safari浏览器是支持的；UC浏览器支持的很好；微信浏览器不支持
  * 安卓的原生浏览器不支持，能够正常显示模块，文档流依次排列；UC浏览器不支持，显示为空白；微信浏览器不支持

##### display:box
  * ios的原生safari浏览器是支持的；UC浏览器支持的很好
  * 安卓的原生浏览器支持；UC浏览器支持


```
其实要使多浏览器兼容flexbox容器样式，可以使用如下CSS样式进行定义：
.box {
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
}
```
