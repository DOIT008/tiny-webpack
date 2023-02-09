(function (modules) {
  function require(id) { 
    const [fn,mapping] = modules[id];
    const module = {
      exports: {}
    }
    function localeRequire(filePath) { 
      const id = mapping[filePath];
      return require(id)
    }
    fn(localeRequire, module, module.exports);
    return module.exports
  }
  // 入口,之后会递归调用各个依赖文件,因为id是从0开始的
  require(0)
})({
  
    "0":[function(require,module,exports){ 
      "use strict";

var _index = require("./index.js");

(0, _index.add)(12, 13);
console.log('main.js');
    },{"./index.js":1}],
  
    "1":[function(require,module,exports){ 
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;

var _bar = require("./bar.js");

console.log((0, _bar.doubleNum)(18));

function add(m, n) {
  return m + n;
}
    },{"./bar.js":2}],
  
    "2":[function(require,module,exports){ 
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doubleNum = doubleNum;

var _queen = require("./queen.js");

console.log((0, _queen.greeting)('Mr zhang'));

function doubleNum(n) {
  return n * 2;
}
    },{"./queen.js":3}],
  
    "3":[function(require,module,exports){ 
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

var _user = require("./user.json");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_user2.default);

function greeting(name) {
  return '你好呀，' + name;
}
    },{"./user.json":4}],
  
    "4":[function(require,module,exports){ 
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "{\r\n  \"name\":\"张三\",\r\n  \"children\":[{\r\n    \"name\":\"李四\"\r\n  }]\r\n}";
    },{}],
  
})
