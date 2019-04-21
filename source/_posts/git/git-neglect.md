---
title:  Git设置上传忽略
categories: 辅助工具
description:  Git设置上传忽略
tags:
  - Git
  - 辅助工具
  - 配置
---



# Git设置上传忽略

## 忽略语法规则
```
# 忽略*.o和*.a文件

 *.[oa]

# 忽略*.b和*.B文件，my.b除外

*.[bB]

!my.b

# 忽略dbg文件和dbg目录

dbg

# 只忽略dbg目录，不忽略dbg文件

dbg/

# 只忽略dbg文件，不忽略dbg目录

dbg

!dbg/

# 只忽略当前目录下的dbg文件和目录，子目录的dbg不在忽略范围内

/dbg

# 忽略所有 .a 结尾的文件
*.a

# 但 lib.a 除外
!lib.a 

# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO 

# 忽略 build/ 目录下的所有文件
build/ 

# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt 
```

下面介绍3种方法来设置上传忽略配置：
## 【方法一】
 通过配置.git/info/exclude文件来忽略文件。这种方式对仓库全局有效，只能对自己本地仓库有作用，其他人没办法通过这种方式来共享忽略规则，除非他人也修改其本地仓库的该文件。
## 【方法二】
 通过.git/config配置文件的core. Excludesfile选项，指定一个忽略规则文件（完整路径），如下图所示。忽略规则在文件e:/gitignore.txt中（当然该文件名可以任意取）。在config的[remote "origin"]上一行添加 excludesfile = e:/gitignore.text即可
 ```
 [core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
    excludesfile = e:/gitignore.text
[remote "origin"]

 ```

 该方式的作用域是也全局的。

 ## 【方式三】
 在项目根目录下创建.gitignore文件如果已经创建则不用创建然后在该文件中添加忽略语法
 .gitignore文件对其所在的目录及所在目录的全部子目录均有效。通过将.gitignore文件添加到仓库，其他开发者更新该文件到本地仓库，以共享同一套忽略规则。