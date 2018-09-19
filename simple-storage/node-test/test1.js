// test by `node test/test1.js`
const json = require('../build/contracts/bitfwdToken.json');
const contractABI_Array = json['abi']; //console.log(contractABI); return;
const bytecode = json['bytecode'];

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545")); 
var accounts = web3.eth.accounts;
console.log(accounts);
testContract(accounts);

function testContract(accounts) { 

  var MyContract = web3.eth.contract(contractABI_Array);  
  let gasEstimate = web3.eth.estimateGas({ data: bytecode }); console.log('gasEstimate', gasEstimate);
  var myContractReturned = MyContract.new(  {
    from: accounts[1],
    data: bytecode,
    gas: gasEstimate
  }, function (err, myContract) {
    if (!err) {
      // NOTE: The callback will fire twice!
      // Once the contract has the transactionHash property set and once its deployed on an address.
      // e.g. check tx hash on the first call (transaction send)
      if (!myContract.address) {
        console.log('transactionHash', myContract.transactionHash) // The hash of the transaction, which deploys the contract

        // check address on the second call (contract deployed)
      } else {
        console.log('address', myContract.address) // the contract address

        var myContractInstance = MyContract.at(myContract.address);
        var event = myContractInstance.Transfer(function (error, result) {
          if (!error)
            console.log(result.event, result.args);
        });
        // view constant method
        // myContractInstance.balanceOf(accounts[1], (err, balance) => {
        //   console.log('balanceOf', balance);
        // });
        myContractInstance.totalSupply.call( (err, total) => {
          console.log('total', total);
        });
        // transaction

        web3.eth.sendTransaction({
          from: accounts[0], 
          to: myContract.address,
          value: web3.toWei(1, "ether"),
        }, err => {
          console.log('err', err);
          myContractInstance.balanceOf(accounts[0], (err, balance) => {
            console.log('balanceOf', balance);

            // send ether to contract from account-0
            myContractInstance.transfer.sendTransaction(accounts[1], 555, 
              { from: accounts[0]}, (err, success) => {
                console.log('success', success);
                myContractInstance.balanceOf(accounts[0], (err, balance) => {
                  console.log('balanceOf', balance);
                });
            });


          });

        });


      }
      // Note that the returned "myContractReturned" === "myContract",
      // so the returned "myContractReturned" object will also get the address set.
    }
  });
  


  // console.log(myContract);
  // var myContractObj = myContract.deploy({
  //   data: bytecode,
  //   arguments: null,//[123, 'My String']
  // });

  // //The total cost of a transaction (the "TX fee") is the Gas Limit * Gas Price
  // myContractObj.estimateGas(null, function (error, gasAmount) {
  //   console.log(gasAmount,web3.utils.fromWei(gasAmount.toString()));
  // });

  // myContractObj.send({
  //   from: accounts[1], //'0x1234567890123456789012345678901234567891',
  //   gas: 1939800 * 1.5, //a fallback function then that function will require extra gas to run
  //   // gasPrice: '300000000000'
  // }).on('error', function (error) {
  //   console.log( error);
  // }).on('unhandledRejection', error => {
  //   console.log( error);
  // }).on('receipt', function(receipt){
  //   // console.log(receipt);
  //   const contractAddress = receipt.contractAddress; 
  //   myContract.options.address = contractAddress;
  //   console.log(myContract.methods);
  // });
  // // Using promise
  // // .then(function (receipt) {
  // //   console.log(receipt.options.address); // instance with the new contract address
    


  // });
}


