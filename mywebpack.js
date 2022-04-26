/*
    1. 找到一个入口文件
    2. 解析这个入口文件, 提取依赖
    3. 解析入口文件依赖的依赖, 递归去创建一个文件间的依赖图, 描述所有文件的依赖关系
    4. 把所有文件打包成一个文件
*/

const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const path = require('path');
const babel = require('babel-core');

let ID = 0;
function createAssets(filename){
  const content = fs.readFileSync(filename,'utf-8');
  const ast = babylon.parse(content,{
    // 源文件类型为 模块
    sourceType: "module"
  })
  const dependencies = [];
  traverse(ast, {
    // 获取 ImportDeclaration
    // ImportDeclaration node 下的 node.source.value 就是entry 引用的每个依赖
    ImportDeclaration:({node})=>{
        dependencies.push(node.source.value);
        // console.log(node)
    }
  })
  const id = ID++;

  // 将得到的ast 转义得到源代码, 转义格式默认 env
  // 源代码中需要手动传入 一个 exports 对象 和 require 函数. 在 bundle 方法中实现
  const { code } = babel.transformFromAst(ast, null, {
    presets:['env']
  })

  return {
    id, filename, dependencies, code
  }
}

function createGraph(entry){
  const mainAsset = createAssets(entry);
  const allAsset = [mainAsset];

  for(let asset of allAsset){
    // 获取 asset.filename 所在文件名
    const dirname = path.dirname(asset.filename);

    // 记录 depend 中的相对路径和 childAsset 的对应关系
    asset.mapping = {};

    // 遍历 当前文件的依赖, 每个依赖都是相对路径: ./message.js
    asset.dependencies.forEach((relativePath)=>{
      // 拼接绝对路径
      const absolutePath = path.join(dirname, relativePath);
      // 获取依赖中的资源
      const childAsset = createAssets(absolutePath);
      // 依赖的相对路径:依赖的资源id
      asset.mapping[relativePath] = childAsset.id;
      // 将 子资源push进所有依赖，重复执行取出依赖的依赖的依赖
      allAsset.push(childAsset);
    })
  }
  return allAsset;
}
function bundle(graph){
  let modules = '';
  // 遍历 graph, 获取所有的 module
  graph.forEach(module=>{
    modules += `${module.id}:[
      function(require, module, exports){
        ${module.code}
      },
      ${JSON.stringify(module.mapping)},
    ],`
  })
  // 实现 require 方法
  const result = `
    (function(modules){
      function require(id){
        const [fn, mapping] = modules[id];

        // 1. 声明一个传给 modules 的require, 接收相对路径
        function localRequire(relativePath){
          // mapping[relativePath] = childAsset.id
          return require(mapping[relativePath]);
        }

        // 2. 声明 module
        const module = { exports:{} };

        // 3. 执行 fn, fn 接收: require,module,exports
        fn(localRequire, module, module.exports)

        // 4. 返回 module.exports 属性
        // 当加载某个模块时, 其实就是加载该模块的 module.exports 属性.
        return module.exports;
      }
      // 执行require: 参数 id = 0, 是入口文件, 实现从入口文件调用
      require(0);
    })({${modules}})
  `
  return result;
}
  
  /* graph
  [
    {
      id: 0,
      filename: './source/entry.js',
      dependencies: [ './message.js' ],
      mapping: { './message.js': 1 }
    },
    {
      id: 1,
      filename: 'source\\message.js',
      dependencies: [ './name.js' ],
      mapping: { './name.js': 2 }
    },
    { id: 2, filename: 'source\\name.js', dependencies: [], mapping: {} }
  ]*/
  const graph = createGraph('./source/entry.js');
//   console.log(graph);
  const result = bundle(graph);
  console.log(result);


/** message.js 的源代码
'"use strict";\n' +
    '\n' +
    'Object.defineProperty(exports, "__esModule", {\n' +
    '  value: true\n' +
    '});\n' +
    '\n' +
    'var _name = require("./name.js");\n' +
    '\n' +
    'var _name2 = _interopRequireDefault(_name);\n' +
    '\n' +
    'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n' +
    '\n' +
    'exports.default = _name2.default + " is my yhh~~~";'
 */

 /* result: 将 result 复制到浏览器执行, 输出: 呀哈哈 is my yhh~~~
 (function(modules){
      function require(id){
        const [fn, mapping] = modules[id];

        // 1. 声明一个传给 modules 的require, 接收相对路径
        function localRequire(relativePath){
          // mapping[relativePath] = childAsset.id
          return require(mapping[relativePath]);
        }

        // 2. 声明 module
        const module = { exports:{} };

        // 3. 执行 fn, fn 接收: require,module,exports
        fn(localRequire, module, module.exports)

        // 4. 返回 module.exports 属性
        // 当加载某个模块时, 其实就是加载该模块的 module.exports 属性.
        return module.exports;
      }
      // 执行require: 参数 id = 0, 是入口文件, 实现从入口文件调用
      require(0);
    })({
        0:[
          function(require, module, exports){
              "use strict";

              var _message = require("./message.js");

              var _message2 = _interopRequireDefault(_message);

              function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

              console.log(_message2.default);
            },
            {"./message.js":1},
          ],
        1:[
          function(require, module, exports){
            "use strict";

              Object.defineProperty(exports, "__esModule", {
                value: true
              });

              var _name = require("./name.js");

              exports.default = _name.name + " is my yhh~~~";
            },
            {"./name.js":2},
          ],
        2:[
          function(require, module, exports){
            "use strict";

            Object.defineProperty(exports, "__esModule", {
              value: true
            });
            var name = exports.name = '呀哈哈';
          },
          {},
          ],
      })
*/