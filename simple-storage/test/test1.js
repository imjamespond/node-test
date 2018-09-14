var bitfwdToken = artifacts.require("bitfwdToken");
// var Web3 = require('web3');
// var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

// BALANCE AFTER TX
// const balanceAfter = web3.eth.getBalance("0x8DbdeB0e41f5afdF6B83a342bacCb9aE3e36aD98").then(console.log);;
// const tx = await web3.eth.getTransaction(hash);
// const receipt = await web3.eth.getTransactionReceipt(hash);
// const gasCost = tx.gasPrice.mul(receipt.gasUsed);
// web3.eth.getAccounts(console.log);

// // BALANCE AFTER TX
// const balanceAfter = web3.eth.getBalance(buyer);
// const tx = await web3.eth.getTransaction(txInfo.tx);
// const gasCost = tx.gasPrice.mul(txInfo.receipt.gasUsed);



contract('bitfwdToken', function (accounts) {
  it("send", function () {
    return bitfwdToken.deployed().then(instance => { 
      //send 11 ethers from 0x62 to contract
      return instance.sendTransaction({ from: accounts[1], value: web3.toWei(1, "ether")})//"0x8DbdeB0e41f5afdF6B83a342bacCb9aE3e36aD98"
    }).then(ret => { 
      console.log(ret.logs[0].args);
    });
  });
  // it("balanceOf", function () {
  //   return bitfwdToken.deployed().then( instance => { 
  //     return instance.balanceOf("0x8DbdeB0e41f5afdF6B83a342bacCb9aE3e36aD98")
  //   }).then( balance => {
  //     console.log(balance);
  //   });
  // });
  it("totalSupply", function () {
    return bitfwdToken.deployed().then( instance => {
      return instance.totalSupply();
    }).then( total => {
      console.log(total);
    });
  });
})


 