// test by `node test/test1.js`
const json = require('../build/contracts/LenToken.json');
const abiArray = json['abi']; 
const bytecode = json['bytecode'];

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545")); 
var accounts = web3.eth.accounts;
console.log(accounts);
testContract(accounts);

function testContract(accounts) { 

  var MyContract = web3.eth.contract(abiArray);  
  let gasEstimate = web3.eth.estimateGas({ data: bytecode }); console.log('gasEstimate', gasEstimate);

  var owner = accounts[1];
  var myContractReturned = MyContract.new( 100000000, {
    from: owner,
    data: bytecode,
    gas: Math.floor(gasEstimate * 1.1)
  }, function (err, myContract) {
    if (!err) { 
      if (!myContract.address) {
        console.log('transactionHash', myContract.transactionHash)  
      } else {
        console.log('address', myContract.address) // the contract address

        var myContractInstance = MyContract.at(myContract.address);
        var event = myContractInstance.Transfer(function (error, result) {
          if (!error)
            console.log(result.event, result.args);
        });
        // view constant method
        myContractInstance.balanceOf(owner, (err, balance) => {
          console.log('balanceOf', balance);
        });
        myContractInstance.totalSupply.call( (err, total) => {
          console.log('total', total);
        });
        // transaction


      }
    }else{
      console.log('deploy error:',err);
    }
  });
  
}


