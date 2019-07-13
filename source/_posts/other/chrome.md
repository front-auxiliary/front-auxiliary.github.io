---
title: chrome扩展开发
categories: chrome
description: chrome扩展应用开发初试
tags:
  - chrome
---
>在平时的前端开发中chrome的扩展应用是非常常见的我平常应用的chrome扩展程序用Postman、React Developer Tools、Redux DevTools 等使用了这么长时间了扩展就想开发一款属于自己的chrome扩展，下面来介绍一下一个简单的扩展开发。

## chrome扩展与chrome应用的区别
Chrome应用更强调是独立的程序，你可以不打开Chrome浏览器而运行这些程序。同时这些程序可以调用更加底层的系统接口，比如串口、USB、本地文件读写等等。同时Chrome应用可以拥有样式更加自由的独立窗口，而Chrome扩展的界面只能限定在浏览器窗口中。

Chrome扩展是一系列文件的集合，这些文件包括HTML文件、CSS样式文件、JavaScript脚本文件、图片等静态文件以及manifest.json。个别扩展还会包含二进制文件，如DLL动态库和so动态库等，但这需要调用NPAPI，而Google出于安全性考虑已经决定逐渐淘汰NPAPI

## 一个简单的chrome扩展
新建文件夹 my_chrome 为项目目录
开发目录
——   images
——   js
——   css
——   index.html
——   manifest.json

项目目录搭建完毕

## manifest.json 文件

```
{
    "manifest_version": 2,
    "name": "my_chrome",//扩展名称
    "version": "1.0",//版本号
    "description": "我的第一个Chrome扩展",//项目描述
    "icons": {  //icons定义了扩展相关图标文件的位置
        "16": "images/icon.png",
        "48": "images/icon.png",
        "128": "images/icon.png"
    },
    "browser_action": {
        "default_icon": { //定义了相应图标文件的位置
            "19": "images/icon.png",
            "38": "images/icon.png"
        },
        "default_title": "我的时钟",//当用户鼠标悬停于扩展图标上所显示的文字
        "default_popup": "index.html" //当用户单击扩展图标时所显示页面的文件位置。
    }
}
```

## html的代码

```
<html>
    <head>
        <style>
            * {
                margin: 0;
                padding: 0;
            }

            body {
                width: 200px;
                height: 100px;
            }

            div {
                line-height: 100px;
                font-size: 42px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div id="clock_div"></div>
        <script src="js/my_clock.js"></script>
    </body>
</html>
```

## js 代码

```
function my_clock(el){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    el.innerHTML = h+":"+m+":"+s;
    setTimeout(function(){my_clock(el)}, 1000);
}

var clock_div = document.getElementById('clock_div');
my_clock(clock_div);
```

## 扩展导入
{% asset_img play.png 扩展导入 %}


## 到这了一个简单的chrome扩展就完成了