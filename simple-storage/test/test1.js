var bitfwdToken = artifacts.require("bitfwdToken");
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

// BALANCE AFTER TX
const balanceAfter = web3.eth.getBalance("0x627306090abab3a6e1400e9345bc60c78a8bef57").then(console.log);;
// const tx = await web3.eth.getTransaction(hash);
// const receipt = await web3.eth.getTransactionReceipt(hash);
// const gasCost = tx.gasPrice.mul(receipt.gasUsed);
// web3.eth.getAccounts(console.log);

// // BALANCE AFTER TX
// const balanceAfter = web3.eth.getBalance(buyer);
// const tx = await web3.eth.getTransaction(txInfo.tx);
// const gasCost = tx.gasPrice.mul(txInfo.receipt.gasUsed);



contract('bitfwdToken', function () {
  it("send", function () {
    return bitfwdToken.deployed().then(instance => { 
      //send 11 ethers from 0x62 to contract
      return instance.sendTransaction({ from: "0x627306090abab3a6e1400e9345bc60c78a8bef57", value: 11 })


    }).then(ret => { 
      console.log(ret.logs[0].args);
    });
  });
  it("balanceOf", function () {
    return bitfwdToken.deployed().then( instance => { 
      return instance.balanceOf("0x627306090abab3a6e1400e9345bc60c78a8bef57")
    }).then( balance => {
      console.log(balance);
    });
  });
  it("totalSupply", function () {
    return bitfwdToken.deployed().then( instance => {
      return instance.totalSupply();
    }).then( total => {
      console.log(total);
    });
  });
})


 