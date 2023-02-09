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
  // 入口,之后会递归调用各个依赖文件
  require(1)
})({
  2: [function (require,module,exports) { 
    const {doubleNum} = require("./bar.js");
    console.log(doubleNum(18));
    function add(m, n) {
      return m+n;
    }
    module.exports = {
      add
    }
  }, {
    './bar.js':3
  }],
  1: [function (require,module,exports) { 
    const { add } = require("./index.js");
    add(12,13)
    console.log('main.js');
  }, {
    './index.js':2
  }],
  3: [function (require,module,exports) { 
    function doubleNum(n) {
      return n * 2;
    }
    module.exports = {
      doubleNum
    }
  }, {}],
})
