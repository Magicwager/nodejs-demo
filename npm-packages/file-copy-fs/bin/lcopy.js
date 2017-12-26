#! /usr/bin/env node
const fileCopy=require("../lib/file-copy-fs")

fileCopy.largeCopy(process.argv.slice(2))//可通过process.argv获得命令行参数