const Web3 = require('web3');
const contract = require('./build/contracts/EvidenceContract.json'); // adjust path if needed

const web3 = new Web3('HTTP://127.0.0.1:7545'); // Ganache default RPC

const contractAddress = "0xBa51611B102fE32eB9c7ca08623C4f32e4fb729a"; // Paste from Truffle migrate output
const contractInstance = new web3.eth.Contract(contract.abi, contractAddress);

// Example function: read evidence from blockchain
async function getEvidence() {
  const result = await contractInstance.methods.getEvidence().call();
  console.log('Evidence:', result);
}

getEvidence();