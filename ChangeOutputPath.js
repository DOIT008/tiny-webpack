export class ChangeOutputPath {
  apply(hook){
    hook.emitFilePath.tap('changeOutputPath', (context) => { 
      context.ChangeOutputPath('./dist/zsf.js')
    })
   }
}