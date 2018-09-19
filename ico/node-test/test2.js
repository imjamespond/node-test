// test by `node test/test2.js 0x[contract address]`
const json = require('../build/contracts/LenToken.json');
const abiArray = json['abi'];
const bytecode = json['bytecode'];

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));
var accounts = web3.eth.accounts; console.log(accounts);
const assert = require('assert').ok;
assert(process.argv.length > 1 && process.argv[2]);
const contractAddress = process.argv[2];
testContract(accounts);

function testContract(accounts) {

  var MyContract = web3.eth.contract(abiArray);
  let gasEstimate = web3.eth.estimateGas({ data: bytecode }); console.log('gasEstimate', gasEstimate);

  var myContractInstance = MyContract.at(process.argv[2]);
  myContractInstance.Transfer(function (error, result) {
    if (!error)
      console.log(result.event, result.args);
  });
  myContractInstance.Approval(function (error, result) {
    if (!error)
      console.log(result.event, result.args);
  });

  var sender = accounts[0];
  var reciever = accounts[2];
  var owner = accounts[1];

  web3.eth.sendTransaction({
    from: sender,
    to: contractAddress,
    value: web3.toWei(1, "ether"),//equal to 1000,
  }, err => {
    err && console.log('err', err);
    myContractInstance.balanceOf(sender, (err, balance) => {
      console.log('balanceOf', balance);

      // send ether to contract from sender to reciever
      myContractInstance.transfer.sendTransaction(reciever, 555,
        { from: sender }, (err, success) => {
          console.log('success', success);

          myContractInstance.balanceOf(sender, (err, balance) => {
            console.log('sender balanceOf', balance);
          });
          myContractInstance.balanceOf(reciever, (err, balance) => {
            console.log('reciever balanceOf', balance);
          });
          myContractInstance.balanceOf(owner, (err, balance) => {
            console.log('owner balanceOf', balance);
          });
        });
    });
  });
}