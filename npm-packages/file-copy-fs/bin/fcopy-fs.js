#! /usr/bin/env node
const fileCopy=require("../lib/file-copy-fs")
fileCopy(process.argv.slice(2))