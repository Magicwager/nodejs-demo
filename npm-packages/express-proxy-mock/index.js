var chalk = require("chalk");
var path = require("path");
var express = require("express");
var proxy = require('express-http-proxy');
var app = express();
var router = express.Router();
var mockConfig, svrConfig, proxyConfig, staticConfig;
var epmConfig = require(path.resolve(".", "epm.config.js"));
try {
    //读取服务器配置
    svrConfig = epmConfig.svrConfig;
    //读取代理配置
    proxyConfig = epmConfig.proxyConfig;
    //读取静态资源配置
    staticConfig = epmConfig.staticConfig;
  } catch (e) {
    console.log(chalk.red(e));
    process.exit(0);
  } finally {
  
  }
  try {
    mockConfig = require(path.resolve(".", "epm.mock.js"));
  } catch (e) {
    console.log(chalk.red(e));
    console.log("[epm] Please check the configuration file");
    mockConfig = undefined;
  } finally {
  
  }
  //开发调试总程序
function server() {
    //设置默认mock
    app.use(express.static(path.resolve('.', 'mock')));
    //设置指定静态资源目录
    app.use(express.static(path.resolve('.', staticConfig.folder)));
    //判断是否启用mock
      console.log(chalk.yellow("\n/******************** Start loading proxy server ********************/\n"));
      proxyConfig.forEach(function(element) {
        if (element.enable) {
          app.use(element.router, proxy(element.url, element.options));
          console.log(chalk.green(`[proxy] : ${element.router} to ${element.url}`));
        }
      });
      console.log(chalk.yellow("\n/******************** Proxy server loaded completed *****************/\n"));

      console.log(chalk.yellow("\n/******************** Start loading mock server ********************/\n"));
      for (let item in mockConfig) {
        for (let i = 0; i < mockConfig[item].length; i++) {
          for (let url in mockConfig[item][i]) {
            console.log(chalk.green(`[mock]:[${url}] to ${mockConfig[item][i][url]}`));
            router.all(url, function(req, res, next) {
              console.log(chalk.green(`[mock]: ${req.method} ${req.ip} client router [${url}]-[${mockConfig[item][i][url]}]`));
              res.sendFile(path.resolve(".", mockConfig[item][i][url]), {
                
              });
            });
          }
        }
      }
      console.log(chalk.yellow("\n/******************** Mock server loaded completed *****************/\n"));
      app.use(router);
  
    app.listen(svrConfig.port, svrConfig.host, function() {
      console.log(chalk.yellow("\n/******************** Start dev server *****************/\n"));
      console.log(chalk.green(`[epm] : Listening on port http://${svrConfig.host}:${svrConfig.port}`));
      console.log(chalk.yellow("\n/******************** O(∩_∩)O *****************/\n"));
    });
  
  }
  module.exports = {
    start: function() {
      server();
    }
  }