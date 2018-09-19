var LenToken = artifacts.require("LenToken");

module.exports = function (deployer) { 
  // if (deployer.network_id != 777) {
    deployer.deploy(LenToken);
  // }
};