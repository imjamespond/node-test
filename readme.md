## truffle develop  
启动一个网络进行调试  
truffle develop --log
启动日志

## verify code
部署合约   
 在build中找到对应合约,找到对应bytecode,
验证时不要选中Optimization

## 安装 Ganache 私有网络  
在truffle.js中配置该网络, 注意端口要对  
specify a path to a specific file  
``truffle test --network development --migrations_directory migrations_null sometest.js``