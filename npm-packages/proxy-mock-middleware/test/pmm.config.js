const svrConfig = {
    host: "127.0.0.1",
    port: 3000,
    //true启用静默模式，紧紧显示错误和警告。
    noInfo : false,
    proName:'/bd'//项目名称
  };
  const proxyConfig = 
  {
    enable : true,
    router: "/uitemplate_web",
    url: "http://workbenchdev.yyuap.com"
  };
  const staticConfig = {
    folder : "dist"//静态资源托管目录
    
  };
  module.exports = {
    svrConfig: svrConfig,
    proxyConfig: proxyConfig,
    staticConfig : staticConfig
  };