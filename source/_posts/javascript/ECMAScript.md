---
title: ECMAScript 提案
categories: ECMAScript
description: 了解ECMAScript从提案到标准的制定落地
tags:
  - javascript
  - ECMAScript提案
---

## 标准的流程包括五个步骤：

### stage0 strawman

任何讨论、想法、改变或者还没加到提案的特性都在这个阶段。只有TC39成员可以提交。

### stage1 proposal 
（1）产出一个正式的提案。 
（2）发现潜在的问题，例如与其他特性的关系，实现难题。
（3）提案包括详细的API描述，使用例子，以及关于相关的语义和算法。

### stage2 draft 
（1）提供一个初始的草案规范，与最终标准中包含的特性不会有太大差别。草案之后，原则上只接受增量修改。 
（2）开始实验如何实现，实现形式包括polyfill, 实现引擎（提供草案执行本地支持），或者编译转换（例如babel）

### stage3 candidate 
（1）候选阶段，获得具体实现和用户的反馈。此后，只有在实现和使用过程中出现了重大问题才会修改。 （2）规范文档必须是完整的，评审人和ECMAScript的编辑要在规范上签字。 
（3）至少要在一个浏览器中实现，提供polyfill或者babel插件。

### stage4 finished 
（1）已经准备就绪，该特性会出现在下个版本的ECMAScript规范之中。
（2）需要通过有2个独立的实现并通过验收测试，以获取使用过程中的重要实践经验。

## TC39什么鬼？什么成分？主要业务是什么？
一个推动 JavaScript 发展的委员会，由各个主流浏览器厂商的代表构成。制定ECMAScript标准，标准生成的流程，并实现。

## 相关 stage0-4的具体内容查看地址
stage0 的提案 https://github.com/tc39/proposals/blob/master/stage-0-proposals.md 
stage1 - 4 的提案 https://github.com/tc39/proposa

推荐阅读：
[精读 TC39 与 ECMAScript 提案](https://zhuanlan.zhihu.com/p/27762556)