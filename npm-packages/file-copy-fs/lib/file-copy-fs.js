const fs=require('fs');
const glob = require('glob');
const path = require('path');
/* writeFileSync,readFileSyn:适合小文件的读写，这是一次性将全部内容读写到内存中，然后再一次性全部写入文件中
 */
const scopy=function(src,dest){
  fs.writeFileSync(dest,fs.readFileSync(src))
}
/*使用fs.createReadStream创建了一个源文件的只读数据流，并使用fs.createWriteStream创建了一个目标文件的只写数据流，并且用pipe方法把两个数据流连接了起来。  */
const lcopy=function(src,dest){
  fs.createReadStream(src).pipe(fs.createWriteStream(dest))

}
const fcheck = function(list,extension){
  const pattern = path.join(list, '*'+extension);
  const enters = glob.sync(pattern);
  let name = [];
  const p = /-\d+(\.\d+)*/
  enters.forEach(function(item,index){
    let a = item.split(p)
    if (a.length = 1){
      a = a[0].split(""+extension)
    }
    console.log(a);
    name.push(a[0]);
  })
  console.log(name)
}
exports.smallCopy=function(argv){
  scopy(argv[0],argv[1])
}
exports.largeCopy=function(argv){
  lcopy(argv[0],argv[1])
}
exports.fcheck = function(argv){
  fcheck(argv[0],argv[1])
}
