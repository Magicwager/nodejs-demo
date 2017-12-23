const fs=require('fs');
const filepath="/Users/wujian/Documents/github/nodejs-demo/npm-packages/file-copy-fs/lib/test.js";
fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log('成功删除'+filepath);
  });