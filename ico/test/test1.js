var LenToken = artifacts.require("LenToken"); 

contract('LenToken', function (accounts) {
  it("send", function () {
    let instance = null;
    return LenToken.deployed().then(instance_ => { 
      instance = instance_
      //send 11 ethers from 0x62 to contract
      return instance.sendTransaction({ from: accounts[1], value: web3.toWei(1, "ether")})
    }).then(ret => { 
      console.log(ret.logs[0].args);

      instance.totalSupply().then(total => {
        console.log(total);
      });
    });
  }); 
 
})


 