---
title: babel6
categories: webpack
description: babel升级6版本产生了一些问题
tags:
  - node
  - webpack
  - babel
  - packaging
---
## babel 分离为多个包

```
babel-cli 命令行
babel-core node api 以及 require hook
babel-polyfill 提供es2015的环境
```

## preset 机制

babel6 默认不再默认支持 es2015 以及 react。 需要手动在 .babelrc 中添加presets。
所谓的 presets 其实就是一些同类plugin打包的结果，方便进行添加。
```
{
  "presets": ["es2015", "react"]
}
```

stage 不再是配置项，以 presets 的形式添加。


博客推荐：
[babel6 升级总结](https://segmentfault.com/a/1190000004301150)
[软大师 Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)