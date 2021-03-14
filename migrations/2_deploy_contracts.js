const DonoToken = artifacts.require("DonoToken");

module.exports = function(deployer) {
  deployer.deploy(DonoToken);
};
