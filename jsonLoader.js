export function jsonLoader(source) { 
  // console.log('jsonLoader-------',source);
  this.addDeps('哈哈')
  return `export default ${JSON.stringify(source)}`
}