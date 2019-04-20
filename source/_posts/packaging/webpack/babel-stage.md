
---
title: babel-stage-x
categories: webpack
description: 如何区分Babel中的stage-0,stage-1,stage-2以及stage-3
tags:
  - javascript
  - node
  - webpack
  - babel
  - stage
  - packaging
---

# babel-stage

>关于stage-x第一次遇见是在第一次搭建react项目时，项目搭建完成后在里边写箭头函数时报错,但当时没有深究只是在网上查找了一个方案说在loader里添加一个stage-0就能解决但是但是没有总结，后来babel升级遇到几次.babelrc的代码报错一直没有找到原因，后来总算知道原来是缺少插件

## 如何区分Babel中的stage-0,stage-1,stage-2以及stage-3

#### 大家知道，将ES6代码编译为ES5时，我们常用到Babel这个编译工具。大家参考一些网上的文章或者官方文档，里面常会建议大家在.babelrc中输入如下代码：

```
{
    "presets": [
      "es2015",
      "react",
      "stage-0"
    ],
    "plugins": []
}
```

我们现在来说明下这个配置文件是什么意思。首先，这个配置文件是针对babel 6的。Babel 6做了一系列模块化，不像Babel 5一样把所有的内容都加载。比如需要编译ES6，我们需要设置presets为"es2015"，也就是预先加载es6编译的相关模块，如果需要编译jsx，需要预先加载"react"这个模块。那问题来了，这个"stage-0"又代表什么呢？ 有了"react-0"，是否又有诸如"stage-1", "stage-2"等等呢？
事实上， ”stage-0"是对ES7一些提案的支持，Babel通过插件的方式引入，让Babel可以编译ES7代码。当然由于ES7没有定下来，所以这些功能随时肯能被废弃掉的。现在我们来一一分析里面都有什么。

## 法力无边的stage-0

为什么说“stage-0” 法力无边呢，因为它包含stage-1, stage-2以及stage-3的所有功能，同时还另外支持如下两个功能插件：

![* transform-do-expressions](https://babeljs.io/docs/plugins/transform-do-expressions)
![* transform-function-bind](https://babeljs.io/docs/plugins/transform-function-bind)

用过React的同学可能知道，jsx对条件表达式支持的不是太好，你不能很方便的使用if/else表达式，要么你使用三元表达，要么用函数。例如你不能写如下的代码：

```
var App = React.createClass({

    render(){
        let { color } = this.props;

        return (
            <div className="parents">
                {
                    if(color == 'blue') {
                        <BlueComponent/>;
                    }else if(color == 'red') {
                        <RedComponent/>;
                    }else {
                        <GreenComponent/>; }
                    }
                }
            </div>
        )
    }
})

```

在React中你只能写成这样：

```
var App = React.createClass({

    render(){
        let { color } = this.props;


        const getColoredComponent = color => {
            if(color === 'blue') { return <BlueComponent/>; }
            if(color === 'red') { return <RedComponent/>; }
            if(color === 'green') { return <GreenComponent/>; }
        }


        return (
            <div className="parents">
                { getColoredComponent(color) }
            </div>
        )
    }
})
```
transform-do-expressions 这个插件就是为了方便在 jsx写if/else表达式而提出的，我们可以重写下代码。

```
var App = React.createClass({

    render(){
        let { color } = this.props;

        return (
            <div className="parents">
                {do {
                    if(color == 'blue') {
                        <BlueComponent/>;
                    }else if(color == 'red') {
                        <RedComponent/>;
                    }else {
                        <GreenComponent/>; }
                    }
                }}
            </div>
        )
    }
})
```

再说说 transform-function-bind, 这个插件其实就是提供过 :: 这个操作符来方便快速切换上下文， 如下面的代码：

```
obj::func
// is equivalent to:
func.bind(obj)

obj::func(val)
// is equivalent to:
func.call(obj, val)

::obj.func(val)
// is equivalent to:
func.call(obj, val)

// 再来一个复杂点的样例

const box = {
  weight: 2,
  getWeight() { return this.weight; },
};

const { getWeight } = box;

console.log(box.getWeight()); // prints '2'

const bigBox = { weight: 10 };
console.log(bigBox::getWeight()); // prints '10'

// Can be chained:
function add(val) { return this + val; }

console.log(bigBox::getWeight()::add(5)); // prints '15'
```

如果想更屌点，还可以写出更牛逼的代码：

```
const { map, filter } = Array.prototype;

let sslUrls = document.querySelectorAll('a')
                ::map(node => node.href)
                ::filter(href => href.substring(0, 5) === 'https');

console.log(sslUrls);
```
## 包罗万象的stage-1

stage-1除了包含stage-2和stage-3，还包含了下面4个插件：

![* transform-class-constructor-call (Deprecated)](http://babeljs.io/docs/plugins/transform-class-constructor-call)
![* transform-class-properties](http://babeljs.io/docs/plugins/transform-class-properties)
![* transform-export-extensions](http://babeljs.io/docs/plugins/transform-export-extensions)

## 深藏不露的stage-2

为什么说 stage-2深藏不露呢，因为它很低调，低调到你可以忽略它，但事实上，它很有内涵的。它除了覆盖stage-3的所有功能，还支持如下两个插件：

![* syntax-trailing-function-commas](http://babeljs.io/docs/plugins/syntax-trailing-function-commas/)
![* ransform-object-reset-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread)

### syntax-trailing-function-commas

这个插件让人一看觉得挺没趣的，让人甚至觉得它有点鸡肋。因它不是对ES6功能的增加，而是为了增强代码的可读性和可修改性而提出的。如下面的代码所示：

```
// 假设有如下的一个函数，它有两个参数
function clownPuppiesEverywhere(
  param1,
  param2
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar'
);

// 有一天，它需要变成3个参数，你需要这样修改
function clownPuppiesEverywhere(
  param1,
- param2
+ param2, // 这一行得加一个逗号
+ param3  // 增加参数param3
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
- 'bar'
+ 'bar', // 这里的修改为逗号
+ 'baz'  // 增加新的参数
);

// 看到没？ 我们修改了4行代码。。啊啊。修改了4行代码。

```

修改了4行代码，嗯嗯嗯。。追求高效的程序猿想想了，以后如果有更多参数了，我是不是要改等多行，得想想，代码改的越少越好，于是有了下面的改动。。

```
// 我们来重新定义一下函数
function clownPuppiesEverywhere(
  param1,
  param2, // 注意这里，我们加了一个逗号哟
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar', // 这里我们也加了一个逗号
);

// 现在函数需要三个参数，我们来修改下
function clownPuppiesEverywhere(
  param1,
  param2,
+ param3, // 增加params3参数
) { /* ... */ }

clownPuppiesEverywhere(
  'foo',
  'bar',
+ 'baz', // 增加第三个参数
);

// 叮叮当，我们只修改了两行代码就完成了，好开森

```

说实话吧，这个功能让人有点很无语。不过程序猿对干净代码的追求真的很让人感动，还是值得鼓励的。这个就是stage-2中"尾逗号函数”功能。哈哈哈哈。

### transform-object-rest-spread

再来说transform-object-rest-spread， 其实它是对 ES6中解构赋值的一个扩展，因为ES6只支持对数组的解构赋值，对对象是不支持的。如下面的代码所示：

```
// 获取剩下的属性

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// 属性展开
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

## 大放异彩的stage3

为啥说stage3大放异彩呢？因为它支持大名鼎鼎的async和await, 这两个哥们可是解决(Ajax)回调函数的终极解决方法呀！管你什么异步，我都可以用同步的思维来写，ES7里面非常强悍的存在。总的来说，它包含如下两个插件:

![* transform-async-to-generator](http://babeljs.io/docs/plugins/transform-async-to-generator/)
![* transform-exponentiation-operator](http://babeljs.io/docs/plugins/transform-exponentiation-operator)

### transform-async-to-generator

```
transform-async-to-generator主要用来支持ES7中的async和await， 我们可以写出下面的代码：

const sleep = (timeout)=>{
    return new Promise( (resolve, reject)=>{
        setTimeout(resolve, timeout)
    })
}

(async ()=>{
    console.time("async");
    await sleep(3000);
    console.timeEnd("async");
})()
再来一个实际点的例子

const fetchUsers = (user)=>{
    return window.fetch(`https://api.douban.com/v2/user/${user}`).then( res=>res.json())
}


const getUser = async (user) =>{
    let users = await fetchUsers(user);
    console.log( users);
}

console.log( getUser("flyingzl")
```

提示： 由于asycn和await是ES7里面的内容，现阶段不建议使用。为了顺利运行上面的代码，建议用webpack进行编译。


### transform-exponentiation-operator

transform-exponentiation-operator这个插件算是一个语法糖，可以通过**这个符号来进行幂操作，想当于Math.pow(a,b)。如下面的样例

```
// x ** y

let squared = 2 ** 2;
// 相当于: 2 * 2

let cubed = 2 ** 3;
// 相当于: 2 * 2 * 2


// x **= y

let a = 2;
a **= 2;
// 相当于: a = a * a;

let b = 3;
b **= 3;
// 相当于: b = b * b * b;

```
