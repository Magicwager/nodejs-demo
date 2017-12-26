const fs=require('fs');
const filepath="/Users/wujian/Documents/github/nodejs-demo/npm-packages/file-copy-fs/lib/test.js";
/* fs操作的测试文件目录，通过fs.mkdir创建 */
const baseUrl=__dirname+'/testfiles';
/* 创建文件目录 */
/* fs.mkdir(baseUrl,(error)=>{
  if(error) throw error;
  console.log('成功创建文件目录'+baseUrl)
}) */

/* 向文件追加数据，如果目录下没有指定文件则创建文件。但是如果指定的目录都没有则会报错 */
fs.appendFile(baseUrl+'/hello.txt','hello world',(err)=>{
  if(err) throw err;
  console.log('成功追加数据')
})
/* 读取文件数据 */
fs.readFile(baseUrl+'/hello.txt','utf-8',(err,data)=>{
  if (err) throw err;
  console.log("hello:"+data);
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


/* 重命名，如果重复则合并 */
fs.rename(baseUrl+'/hello.txt',baseUrl+'/helloNew.txt',(err)=>{
  if(err) throw err;
  console.log('重命名成功！')
  /* 不能写在外头，因为这里rename用的是异步方法，得重命名成功后才能读取新文件的数据 */

})
fs.readdir(baseUrl,'utf-8',(err,files)=>{
  if(err) throw err;
  console.log(files)
})
fs.readFile(baseUrl+'/helloNew.txt','utf-8',(err,data)=>{
  if (err) throw err;
  console.log("helloNew:"+data);
})

/* 文件删除 */
/* fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log('成功删除'+filepath);
  }); */