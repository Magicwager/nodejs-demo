const fs=require('fs');
const filepath="/Users/wujian/Documents/github/nodejs-demo/npm-packages/file-copy-fs/lib/test.js";
/* fs操作的测试文件目录，通过fs.mkdir创建 */
const baseUrl="/Users/wujian/Documents/github/nodejs-demo/test/testfiles"
/* 创建文件目录 */
fs.mkdir(baseUrl,(error)=>{
  if(error) throw error;
  console.log('成功创建文件目录'+baseUrl)
})
/* 向文件追加数据，如果目录下没有指定文件则创建文件。但是如果指定的目录都没有则会报错 */
fs.appendFile(baseUrl+'/hello.txt','hello world',(err)=>{
  if(err) throw err;
  console.log('成功追加数据')
})
/* 打开文件，如果目录下没有指定文件则创建文件。但是如果指定的目录都没有则会报错 */
fs.open(baseUrl+'/hello.txt', 'w+', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error(baseUrl+'/hello.txt'+"文件不存在");
      return;
    }

    throw err;
  }
  console.log('成功打开文件')

});
/* 文件删除 */
/* fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log('成功删除'+filepath);
  }); */