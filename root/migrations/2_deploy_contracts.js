const EvidenceContract = artifacts.require("EvidenceContract");

module.exports = function (deployer) {
  deployer.deploy(EvidenceContract);
};