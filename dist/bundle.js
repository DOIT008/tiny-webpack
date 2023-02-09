(function (modules) {
  function require(filePath) { 
    const fn = modules[filePath];
    const module = {
      exports: {}
    }
    fn(require, module, module.exports);
    return module.exports
  }
  require('./main.js')
})({
  
    "./example/main.js":function(require,module,exports){ 
      "use strict";

var _index = require("./index.js");

(0, _index.add)(12, 13);
console.log('main.js');
    }
  
    "D:\资料\Git仓库\my-mini-webpack\example\index.js":function(require,module,exports){ 
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
    }
  
    "D:\资料\Git仓库\my-mini-webpack\example\bar.js":function(require,module,exports){ 
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doubleNum = doubleNum;

function doubleNum(n) {
  return n * 2;
}
    }
  
})
