---
title: mac终端配置sublime和vsCode的快捷方式
categories: 辅助工具
description:  mac终端配置sublime和vsCode的快捷方式
tags:
  - mac
  - 辅助工具
---

## vsCode的终端命令配置
### mac端配置
>vsCode的终端命令配置较为简单，运行VS code并打开命令面板（ ⇧⌘P ），然后输入 shell command 找到: Install ‘code' command in PATH 就行了。

code命令还支持其他参数，具体看 [Visual Studio Code入门](http://www.jianshu.com/p/3dda4756eca5)

```
//配好后的使用方法(打开当前路径)
code . 
```



## sublime的终端配置

### mac端配置
```
// 1. 打开终端
cd ~

ls -la
//找打.zshrc文件如果安装过atom 就输入 atom .zshrc 如果有 vim 就输入 vim .zshrc这里我用vim

vim .zshrc

//到 atom 中
```
//把下面内容粘贴到最后

alias subl="'/Applications/Sublime.app/Contents/SharedSupport/bin/subl'"
alias nano="subl"
export EDITOR="subl"

上面的第一行里是自己sublime的在、安装路径一般只有 Sublime.app 不一样


```
//配好后的使用方法(打开当前路径)记得重启终端
subl . 
```
因为 atom 在这两款中显得较为鸡肋就不做介绍
