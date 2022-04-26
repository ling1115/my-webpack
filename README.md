# 编写一个自己的 `webpack` 打包工具

webpack 

本质上，webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。

当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 概览
1. 找到一个入口文件
2. 解析这个入口文件, 提取依赖
3. 解析入口文件依赖的依赖, 递归去创建一个文件间的依赖图, 描述所有文件的依赖关系
4. 把所有文件打包成一个文件

## 开始开发
### 1. 新建几个 js 文件

* soruce/name.js

```js
export const name = '呀哈哈';
```

* soruce/message.js

```js
import {name} from './name.js';

export default `${name} is my yhh!!!`
```

* soruce/entry.js

```js
import Message from './message.js';

console.log(Message);
```

### 2. 三个文件的依赖关系
entry 依赖 message, message 依赖 name.

> entry.js -> message.js -> name.js

### 3. 编写自己的打包工具: ./mywebpack.js

```js
/*
    1. 找到一个入口文件
    2. 解析这个入口文件, 提取依赖
    3. 解析入口文件依赖的依赖, 递归去创建一个文件间的依赖图, 描述所有文件的依赖关系
    4. 把所有文件打包成一个文件
*/

const fs = require('fs');

// 通过文件名 输入该文件的所有相关资源
function createAssets(filename){
    // 1. 读取文件
    const content = fs.readFileSync(filename, 'utf-8');
    console.log(content);
}
// 目前使用相对路径引入
createAssets('./source/entry.js')
// 测试: 进入到工程文件夹下执行命令：node mywebpack.js
// 输出 entry 中的内容
```

### 4. 分析 ast, 如何能够解析 entry.js 的依赖
entry.js 中 `import Message from './message.js';` 的 ast 结构:
1. File -> program
2. program -> body 含有各种语法的描述
3. ImportDeclaration 引入的声明
4. ImportDeclaration -> source.value 就是引入文件的地址: './message.js' 

### 5. 使用 babylon 工具生成 entry.js 的 ast
babylon 是基于 babel 的 js 解析工具


