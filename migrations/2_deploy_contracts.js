const PersonId = artifacts.require("PersonId");

module.exports = function(deployer) {
  deployer.deploy(PersonId);
};