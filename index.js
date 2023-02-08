import fs from "fs";
import parser from "@babel/parser";
import path from "path";
import traverse from "@babel/traverse";
import ejs from 'ejs'
import { transformFromAst } from "babel-core";
function createAssets(filePath) {
  // 1. 获取文件内容
  const source = fs.readFileSync(filePath, {
    encoding: "utf8",
  });
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
  console.log('----------');
  console.log(code);
  return {
    filePath,
    deps,
    code,
  };
}

// 通过上述的依赖和内容创建图，为啥是图呢，因为存在相互依赖的情况——>a依赖b，b依赖a,所以树描述不了这种情况
function createGraph() {
  const mainAssets = createAssets("./example/main.js");
  // 遍历图
  const queue = [mainAssets];
  for (const asset of queue) {
    asset.deps.forEach((item) => {
      const childAssets = createAssets(path.resolve("./example", item));
      queue.push(childAssets);
    });
  }
  return queue
}
const graph = createGraph();
// console.log(graph);


// 根据生成的图，生成文件

function build(graph) {
  
}



