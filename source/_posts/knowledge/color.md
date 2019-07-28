---
layout: 刘毅豪
title: 颜色转换
date: 2019-07-14 07:39:59
tags: 
 - 颜色算法
 - 颜色选择器
 - 颜色转换
 - 颜色
categories: 方案思路
---
**作者：刘毅豪**
### 常用的颜色模式
> 目前常用的颜色模式有 RGB，HSV，HLS，CMYK，CMY这几种颜色分别在不同的领域使用，也有特定的应用场景。

**RGB**
>RGB(Red)色彩模式是工业界的一种颜色标准，是通过对红(R)、绿(G)、蓝(B)
三个颜色通道的变化以及它们相互之间的叠加来得到各式各样的颜色的，RGB即是代表红、绿、蓝三个通道的颜色，这个标准几乎包括了人类视力所能感知的所有颜色，是目前运用最广的颜色系统之一。RGB模式又称加色模式。
{% asset_img rgb.jpg RGB示意图 %}
**取值范围：**
R(red:0~255),
G(green:0~255),
B(blue:0~255)。

** HSV **
>HSV(Hue, Saturation, Value)是根据颜色的直观特性由A. R. Smith在1978年创建的一种颜色空间, 也称六角锥体模型(Hexcone Model)。这个模型中颜色的参数分别是：色调（H），饱和度（S），明度（V）。
{% asset_img hsv.jpg  HSV/HSL示意图 %}
**取值范围：**
H(Hue:0~360),
S(Saturation:0~100),
V(Value:0~100)。


**HSL**
>HSL(Hue, Saturation, Lightness)色彩模式是工业界的一种颜色标准，是通过对色相(H)、饱和度(S)、亮度(L)三个颜色通道的变化以及它们相互之间的叠加来得到各式各样的颜色的，HSL即是代表色相，饱和度，亮度三个通道的颜色，这个标准几乎包括了人类视力所能感知的所有颜色，是迄今运用最广的颜色系统之一。
{% asset_img hsl.png  HSV/HSL示意图 %}
**取值范围：**
H(Hue:0~360),
S(Saturation:0~100),
L(Lightness:0~100)。


**CMYK/CMY**

>印刷四色模式是彩色印刷时采用的一种套色模式，利用色料的三原色混色原理，加上黑色油墨，共计四种颜色混合叠加，形成所谓“全彩印刷”。四种标准颜色是：C：Cyan = 青色，又称为‘天蓝色’或是‘湛蓝’M：Magenta = 品红色，又称为‘洋红色’；Y：Yellow = 黄色；K：blacK=黑色，虽然有文献解释说这里的K应该是Key Color（定位套版色），但其实是和制版时所用的定位套版观念混淆而有此一说。此处缩写使用最后一个字母K而非开头的B，是因为在整体色彩学中已经将B给了RGB的Blue蓝色。CMYK模式又称减色模式。
{% asset_img cmyk.jpeg  HSV/HSL示意图 %}
**取值范围：**
C(Cyan:0~100),
M(Magenta:0~100),
Y(Yellow:0~100),
K(blacK:0~100),

**HEX 格式**
>HEX(十六进制颜色码)就是在软件中设定颜色值的代码。在很多软件中，都会遇到设定颜色值的问题，发展来源 人的眼睛看到的颜色有两种： 一种是发光体发出的颜色，比如计算机显示器屏幕显示的颜色； 另一种是物体本身不发光，而是反射的光产生 十六进制颜色。所有的颜色都可转换为HEX格式

### 颜色的互相转换

**RGB 转换 HEX**

>RGB转HEX实际机会RGB的每一个参数转16进制然后组合，举个例子：RGB(92,184,232);92 / 16 = 5余12 -> 5C;84 / 16 = 11余8 -> B8;232 / 16 = 14余8 -> E8;

最简单代码实现代码实现

```
function rgbToHex(r,g,b){
    let hex = '#';
    hex+=r.toString(16);
    hex+=g.toString(16);
    hex+=b.toString(16);
    return hex; 
}
```

然而在网页中获取到的颜色大多是RGB(0,0,0),或者rgb(0,0,0)，#000;为应对不同浏览器的不同表现我们对代码进行健壮处理，代码如下：

```
function colorToHex (color){
    let that = color;
    //十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是rgb颜色表示
    if (/^(rgb|RGB)/.test(that)) {
        let aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        let strHex = "#";
        for (let i=0; i<aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            if (hex.length < 2) {
                hex = '0' + hex;    
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;    
        }
        return strHex;
    } else if (reg.test(that)) {
        let aNum = that.replace(/#/,"").split("");
        if (aNum.length === 6) {
            return that;    
        } else if(aNum.length === 3) {
            let numHex = "#";
            for (let i=0; i<aNum.length; i+=1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    }
    return that;
};
```
在网上我看到一个大神的写法很简洁但是不太明白他的算法原理我就先把代码放这
[原文地址](https://www.cnblogs.com/gossip/p/6058158.html)

```
function colorRGB2Hex(color) {
    let rgb = color.split(',');
    let r = parseInt(rgb[0].split('(')[1]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2].split(')')[0]);
 
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
 }
```
**HEX 转换 RGB**
```
function hexToRgb(sColor){
    sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        return "RGB(" + sColorChange.join(",") + ")";
    }
    return sColor;
}
```

**HSL 转换 RGB**

```
function hslToRgb(h, s, l) {
    let r, g, b;

    if(s == 0) {
        r = g = b = l; // achromatic
    } else {
        let hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
```

**RGB 转换 HSL**
```
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min){ 
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
```

**RGB 转换 HSV**

```
function rgbToHsv(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let h, s, v;
    let min = Math.min(r, g, b);
    let max = v = Math.max(r, g, b);
    let l = (min + max) / 2;
    let difference = max - min;

    if (max == min) {
        h = 0;
    } else {
        switch (max) {
        case r:
            h = (g - b) / difference + (g < b ? 6 : 0);
            break;
        case g:
            h = 2.0 + (b - r) / difference;
            break;
        case b:
            h = 4.0 + (r - g) / difference;
            break;
        }
        h = Math.round(h * 60);
    }
    if (max == 0) {
        s = 0;
    } else {
        s = 1 - min / max;
    }
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    return {s,h,v};
}
```
**HSV 转换 RGB**

**RGB 转换 CMYK**
>RGB 转 CMYK 实际的实现方案是先由 RGB 转 CMY 在由 CMY 修正为 CMYK
RGB 转 CMY 的转换公式
c = 255 - r; 
m = 255 - g;
y = 255 - b;

```
function rgbToCmyk (params){
    let { r, g, b } = params;
    const saturation = 2.55
    for(let key in params){
        if(!params[key]){
            throw new Error(`${key}是必填项`);
        }
    }
    let c = 0; 
    let m = 255 - g;
    let y = 255 - b;
    let k = Math.min(Math.min(255-r,255-g),255-b)/saturation
    let div = 100-k ? 100-k : 1;
    r = r/saturation;
    g = g/saturation;
    b = b/saturation;
    c = ((100 - r - k) / div)*100;
    m = ((100 - g - k) / div)*100;
    y = ((100 - b - k) / div)*100;
    return {c,m,y,k}
}
```

** CMYK 转换 RGB **
>CMYK 转 RGB 转换的公式
R = 255*(100-C)*(100-K)/10000；
G = 255*(100-M)*(100-K)/10000；
B = 255*(100-Y)*(100-K)/10000；

```
function cmykToRgb(params){
    const {c,m,y,k} = params;
    for(let key in params){
        if(!params[key]){
            throw new Error(`${key}是必填项`);
        }
    }
    return {
        r:255*(100-c)*(100-k)/10000,
        g:255*(100-m)*(100-k)/10000,
        b:255*(100-y)*(100-k)/10000
    }
}
```


### 颜色选择器的实现思路
>颜色选择的选择和使用，原本 input 有 color 类型 来调用系统的颜色选择，但是这个方案有系统兼容问题，而且在mac 和window 两个系统的表现形式不一样所以只能放弃，自己实现一个颜色选择器。
既然这样我们来利用我们前面学习的知识来分析一下这样的需求，首先我们要看常用的颜色选择器，都是两个选择色板如下是mac的颜色选择器：
{% asset_img input-color.png  HSV/HSL示意图 %}
我们不难看出上边的圆是有两个参数控制下边的滑条是由一个参数控制也就是说三个参数控制的交互界面是比较友好的所以 CMYK 模式的方案被排除剩下 RGB SHV SHL CMY 这四个方案，由于RGB 和 CMY 模式是你必须选择三个颜色后才知道最终颜色所以这个方案不合适，最终只剩下 SHV 和 SHL 对比 mac 的颜色选择我们可以发现其实就是使用了这个模式
最终定的是SHV模式如下图滑条是 H(色调)选择取值范围是0~360 , 下面的矩形是由 S (饱和度) 和 V (明度) 分别表示 水平轴和垂直轴，最会在使用上面的色彩转换方法将 SHV 转为 RGB 设置到元素上。
{% asset_img my-color.png  HSV/HSL示意图 %}
具体实现这里就不展开了有了显现原理，具体实现就很简单了。




### 参考文章
[深入理解color model(颜色模型)](https://www.jianshu.com/p/f03e9ac9c9ef)