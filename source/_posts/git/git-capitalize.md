---
title: git区分大小写
categories: 辅助工具
description:  git区分大小写
tags:
  - Git
  - 辅助工具
---

其实 git 默认对于文件名大小写是不敏感的,所以上面你修改了首字母大写,但是git 并没有发现代码任何改动.

那么如何才能让 git 识别文件名大小写变化.

一  配置git 使其对文件名大小写敏感

git config core.ignorecase false

```
Administrator@SC-202102021413 F:\xunlian\hexo
>git config core.ignorecase false
```


二 从git 本地仓库删除此文件,然后添加再提交

(1) 删除
```
Administrator@SC-202102021413 F:\xunlian\hexo
>git rm readme.md
```
(2) 重新添加
```
Administrator@SC-202102021413 F:\xunlian\hexo
>git add Readme.md
```
(3)提交
```
Administrator@SC-202102021413 F:\xunlian\hexo
>git commit -m 'Readme.md'
```
推荐第一种方法,配置好git 对文件名大小写敏感.



