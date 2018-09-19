var BitfwdToken = artifacts.require("bitfwdToken");

 
contract("bitfwdToken", accounts => { 

  it("...should...", async () => {
    const bitfwdToken = await BitfwdToken.deployed();
    // console.log('contract ',bitfwdToken.address)
    const tx = await web3.eth.sendTransaction({
      from: accounts[1],
      // to: accounts[0],
      to: bitfwdToken.address,//'0x48A24F5c15727c10aD7dFF1431aDAF616AE45622',//contract
      value: web3.toWei(1, "ether"),
      // data: code // deploying a contracrt
    });

    const txObj = await web3.eth.getTransaction(tx);
    // const gasPrice = tx.gasPrice;
    console.log(txObj);

    const accountABalance = await web3.eth.getBalance(accounts[1]);//"0x8DbdeB0e41f5afdF6B83a342bacCb9aE3e36aD98"
    console.log(accountABalance);

    // const block = await web3.eth.getBlockNumber(); 


    console.log('Truffle injects web3 into the test script');
  });


});
 
  
// auction = new web3.eth.Contract(interface)
//   .deploy({ data: bytecode })
//   .send({ from: manager, gas: 1000000 });
// console.log(web3)
 
// using the callback

