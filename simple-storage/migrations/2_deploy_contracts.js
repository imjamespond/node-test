var SimpleStorage = artifacts.require("SimpleStorage");
var Ballot = artifacts.require("Ballot");
var bitfwdToken = artifacts.require("bitfwdToken");

module.exports = function (deployer) {
  // deployer.deploy(SimpleStorage);
  // deployer.deploy(Ballot, ["foo"]);
  // if (deployer.network_id != 777) {
    deployer.deploy(bitfwdToken);
  // }
  
};