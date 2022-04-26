
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
    })({0:[
      function(require, module, exports){
        "use strict";

var _message = require("./message.js");

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_message2.default);
      },
      {"./message.js":1},
    ],1:[
      function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = require("./name.js");

exports.default = _name.name + " is my yhh~~~";
      },
      {"./name.js":2},
    ],2:[
      function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = exports.name = '呀哈哈';
      },
      {},
    ],})
  
