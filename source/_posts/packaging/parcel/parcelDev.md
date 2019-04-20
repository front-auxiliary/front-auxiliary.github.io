---
title: parcel使用
categories: parcel
description: parcel是一个前端项目打包器
tags:
  - javascript
  - 项目打包
  - parcel
  - packaging
---
### 什么是pracel
parcel是一个前端项目打包器，现在我们已有的打包器与webpack和gulp。
### 为什么要把pracel拿出来说一说
最近许多的网站推送pracel的相关消息，说什么零配置，打包速度快。

### 几个问题

1. 我们现在使用的打包工具有哪些？
2. 我们为什么要是用这些打包工具，使用这些打包工具为我们解决了什么问题？
3. 现在已用到的打包工具给我们造成了什么困扰？

### 用parcel建一个简单的项目

#### 安装

Yarn:
```
yarn global add parcel-bundler
```
npm:
```
npm install -g parcel-bundler
```
#### 创建package.json
```
yarn init -y
```
or
```
npm init -y
```
#### 创建一个 index.html 和 index.js 文件。

index.html
```
<html>
<body>
  <script src="./index.js"></script>
</body>
</html>
```
index.js
```
console.log("hello world");
```
#### 在package.json重配置
```
"scripts": {
    "dev": "parcel index.html -p 4000"
},
```
#### Babel配置
```
yarn add babel-preset-env
```
 .babelrc文件
```
{
  "presets": ["env"]
}
```
#### PostCSS配置
```
yarn add postcss-modules autoprefixer
```
.postcssrc
```
{
  "modules": true,
  "plugins": {
    "autoprefixer": {
      "grid": true
    }
  }
}
```
#### PostHTML配置
```
yarn add posthtml-img-autosize
```
.posthtmlrc
```
{
  "plugins": {
    "posthtml-img-autosize": {
      "root": "./images"
    }
  }
}
```
[parcelReact项目](https://github.com/yihaoliu/parcelReact)。


虽然说parcel是零配置但是在没有配置的情况下明显项目的灵活度降低许多，下载react有create-react-app进行构建，vue有vue-cli进行构架其实在项目配置相对来说已经非常少了，但是parcel没有配置文件还是让项目的开发有点难受，比如文件起别名，还有proxyConfig进行跨域处理在项目的开发时期都是很重有的事情，只能说对于一个初学web的人员来说配置变少了尤其是没有用到三大框架的项目组pracel还是使用很方便的，对于一些h5小网页比如基于canvas的小游戏的开发用pracel来构建还是非常方便的，但对于大型网站来说。。。