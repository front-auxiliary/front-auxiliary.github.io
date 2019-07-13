---
title: nuxt服务端项目集成引入iView
categories: nuxt
description: nuxt项目构架
tags:
  - vue
  - nuxt
  - 服务端项目集成
---
Nuxt.js 是一个基于 Vue.js 的通用应用框架。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。

我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js。

Nuxt.js 预设了利用Vue.js开发服务端渲染的应用所需要的各种配置。

除此之外，我们还提供了一种命令叫：nuxt generate，为基于 Vue.js 的应用提供生成对应的静态站点的功能。

我们相信这个命令所提供的功能，是向开发集成各种微服务（microservices）的 Web 应用迈开的新一步。

作为框架，Nuxt.js 为 客户端/服务端 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。

## Nuxt 项目--构建
因为Nuxt是基于vue的通用应用框架所以构建Nuxt项目可以同vue-cil来构建
### 1. 安装vue-cil 

相信有vue使用经验的开发者对这款cil工具是非常熟悉的

```
npm install --global vue-cli
```

### 2. 用vue-cil搭建项目

```

$ vue init nuxt-community/starter-template nuxt 
//(你要构建的项目名称我的项目叫做nuxt)
$ cd nuxt
$ npm install
```

### 3. 接着通过以下命令启动项目

```
$ npm run dev
```

访问 http://localhost:3000
{% asset_img init.png 启动页 %}
### 集成 iview UI框架

```
// 安装 iview
$ npm install iview --save
```


### 在根目录的 plugins 中新建 iview.js

```
import iView from 'iview'
Vue.use(iView)

```

这里有个大坑因为Nuxt语法检测机制在Vue.use(iView)的后面要加一个回车要不会报一下错误，这个问题当时让我很郁闷

{% asset_img error.png 启动页 %}


### 修改 nuxt.config.js
在module.exports最后添加如下内容：
```
    plugins: [ { src: '~plugins/iview', ssr: false } ],
    css: ['iview/dist/styles/iview.css'],
```

{% asset_img add.png 添加 %}


### 在pages/index.vue,加入 Button 标签

```
<Button type="primary">Primary</Button>
```

{% asset_img add.png 按钮 %}


### 再次启动页面

```
$ npm run dev
```

效果页面如下：

{% asset_img end.png 最后的效果 %}


### 大功告成 后续会添加nuxt的相关内容