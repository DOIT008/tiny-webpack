import fs from "fs";
import parser from "@babel/parser";
import path from "path";
import traverse from "@babel/traverse";
import ejs from 'ejs' // 一个模板工具
import { transformFromAst } from "babel-core";
// loader
import { jsonLoader } from "./jsonLoader.js";
const webpackConfig = {
  module: {
    rules: [{
      test: /.json$/,
      use:[jsonLoader] // 为啥是数组，因为可能需要多层转换，后一个loader需要前一个loader的处理结果，进行链式调用
    }]
  }
}



let id = 0;
function createAssets(filePath) {
  // 1. 获取文件内容
  let source = fs.readFileSync(filePath, {
    encoding: "utf8",
  });
  // 转换文件
  const loaders = webpackConfig.module.rules;
  // 处理上下文对象
  const loaderContext = {
    addDeps(dep) { 
      console.log('dep---',dep);
    }
  }
  loaders.forEach(({ test, use }) => {
    console.log('filepath--------',Array.isArray(use.reverse));
    // 检测是否是目标文件格式
    if (test.test(filePath)) { 
      console.log(filePath);
      if (Array.isArray(use)) {
        // 因为是从后往前的顺序执行
        use.reverse().forEach(_use => { 
          source = _use.call(loaderContext,source)
        })
      }
      // 执行loader开始转换
    }
  })

  // 2. 获取各模块间的依赖关系
  // 怎么获取import呢？两种方式，一种是正则匹配import，一种是使用ast,下面是获取入口文件的ast
  const ast = parser.parse(source, {
    sourceType: "module",
  });
  const deps = [];
  // 遍历解析ast
  traverse.default(ast, {
    // 当访问到ImportDeclaration类型节点的时候(其实就是访问到import语句的时候)
    ImportDeclaration({ node }) {
      console.log(node.source.value); // .index.js
      deps.push(node.source.value);
    },
  });
  const { code } = transformFromAst(ast, null, {
    presets: ['env'],
  });
  // console.log(code);
  return {
    filePath,
    deps,
    code,
    mapping: {},
    id:id++
  };
}

// 通过上述的依赖和内容创建图，为啥是图呢，因为存在相互依赖的情况——>a依赖b，b依赖a,所以树描述不了这种情况
function createGraph() {
  // 从入口文件开始收集依赖
  const mainAssets = createAssets("./example/main.js");
  // 遍历图
  const queue = [mainAssets];
  for (const asset of queue) {
    asset.deps.forEach((item) => {
      const childAssets = createAssets(path.resolve("./example", item));
      asset.mapping[item] = childAssets.id
      queue.push(childAssets);
    });
  }
  return queue
}
const graph = createGraph(); // 一个数组
// console.log(graph);


// 根据生成的图，生成文件
function build(graph) {
  // 模板
  const template = fs.readFileSync('./bundle.ejs', {
    encoding: "utf8",
  })
 
  const data = graph.map(item => { 
    return {
      id: item.id,
      code: item.code,
      mapping:item.mapping
    }
  })
  const code = ejs.render(template, {data}) //
  console.log('data',data);
  // 写入文件
  fs.writeFileSync("./dist/bundle.js", code);
}
build(graph)



