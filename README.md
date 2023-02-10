# my-mini-webpack
一个简略版的webpack，其大致思路也很简单：首先通过入口文件收集依赖->遍历依赖生成图->通过图打包并生成文件;
其核心文件是根目录下的`index.js` ,里面模拟实现了`loader` 和`plugin` ;
# loader
其实就是一个转换器，因为webpack只认识js文件，那么要想对其他文件页进行打包，就需要使用`loader` 将不同类型的文件转换成`js` 文件;
一个`loader` 就是一个函数,输入的是源文件，输出js文件/（中间文件以便后续`loader` 进行处理）;
# plugin
webpack在打包的过程中会触发一些事件，而插件会监听这些事件，当监听到的时候就会触发相应的函数，这也就是常说的`发布-订阅者`模式，那么在写自己的插件的时候会使用到`tapable`库，其提供了很多`发布订阅模式`的API，比如`SyncHook`，`SyncBailHook`等，每一个插件内部都有一个`apply`方法，在其内部进行事件的监听;
# 使用说明
安装依赖
```powershell
 npm install
```
运行
```powershell
 node index.js
```