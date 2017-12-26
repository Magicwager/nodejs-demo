const fs=require('fs');
const copy=function(src,dest){
  fs.writeFileSync(dest,fs.readFileSync(src))
}
module.exports=function(argv){
  copy(argv[0],argv[1])
}
