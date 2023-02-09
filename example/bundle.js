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
  './index.js': function (require,module,exports) { 
    const {doubleNum} = require("./bar.js");
    console.log(doubleNum(18));
    
    function add(m, n) {
      return m+n;
    }
    module.exports = {
      add
    }
  },
  './main.js': function (require,module,exports) { 
    const { add } = require("./index.js");
    add(12,13)
    console.log('main.js');
  },
  "./bar.js": function (require,module,exports) { 
    function doubleNum(n) {
      return n * 2;
    }
    module.exports = {
      doubleNum
    }
  },
})
