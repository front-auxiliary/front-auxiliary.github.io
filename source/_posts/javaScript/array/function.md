---
title: 关于数组的使用
categories: array
description: 最近面试很多的算法题，被问到优化方面的问题，今天就来总结下js中数组的方法和性能优化，主要介绍有数组的方法，数组一下方法的实现，和常见的数组算法集合
tags:
  - javascript
  - array
---
# Array 方法

## concat 
> 连接两个或者多个数组并返回新的数组，该方法不会影响原数组。
### es6 实现concat
```
let arr1 = [2,3];
let arr2 = [4,5];
let arr3 = [...arr1,...arr2]
```
### 实现一个concat
```
 Array.prototype.myConcat = function () {
   let arr = this.slice(0);
   arguments.length && [].forEach.call(arguments,(value) => {
     if (Array.isArray(value)) {
      value.forEach(val => {
        arr.push(val);
      })
     } else {
       arr.push(value);
     }
   })
   return arr;
 };

```




|方法|描述|
|:-----:|:-----:|
|concat()|连接两个或更多的数组，并返回结果。|
|join()|把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。|
|pop()|删除并返回数组的最后一个元素|
|push()|向数组的末尾添加一个或更多元素，并返回新的长度。|
|reverse()|颠倒数组中元素的顺序。|
|shift()|删除并返回数组的第一个元素|
|slice()|从某个已有的数组返回选定的元素|
|sort()|对数组的元素进行排序|
|splice()|删除元素，并向数组添加新元素。|
|toSource()|返回该对象的源代码。|
|toString()|把数组转换为字符串，并返回结果。|
|toLocaleString()|把数组转换为本地数组，并返回结果。|
|unshift()|向数组的开头添加一个或更多元素，并返回新的长度。|
|valueOf()|返回数组对象的原始值|