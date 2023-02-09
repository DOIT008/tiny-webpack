# my-mini-webpack
一个简略版的webpack，其大致思路也很简单：首先通过入口文件收集依赖->遍历依赖生成图->通过图打包并生成文件;
其核心文件是根目录下的`index.js` 
# 使用说明
安装依赖
```powershell
 npm install
```
运行
```powershell
 node index.js
```