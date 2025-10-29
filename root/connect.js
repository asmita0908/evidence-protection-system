// connect.js

// ABI and Contract Address (replace with actual deployed address if different)
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "evidences",
    "outputs": [
      {
        "internalType": "string",
        "name": "hash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "caseId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "hash",
        "type": "string"
      }
    ],
    "name": "storeEvidence",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "caseId",
        "type": "string"
      }
    ],
    "name": "getEvidence",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
] 

const contractAddress = "0x98a9e7c360Fae835c04B453139F7B3622109E8f7";

let web3;
let contract;
let account;

async function init() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    contract = new web3.eth.Contract(contractABI, contractAddress);

    console.log("Connected to account:", account);
  } else {
    alert("Please install MetaMask to use this feature.");
  }
}

async function storeEvidence(caseId, hash) {
  try {
    await contract.methods.storeEvidence(caseId, hash).send({ from: account });
    alert("Evidence stored successfully!");
  } catch (error) {
    console.error("Error storing evidence:", error);
    alert("Failed to store evidence.");
  }
}

async function getEvidence(caseId) {
  try {
    const result = await contract.methods.getEvidence(caseId).call();
    const [hash, timestamp] = result;
    console.log("Hash:", hash);
    console.log("Timestamp:", new Date(timestamp * 1000).toLocaleString());
    return { hash, timestamp };
  } catch (error) {
    console.error("Error fetching evidence:", error);
    alert("Failed to fetch evidence.");
  }
}

// Call init on load
window.addEventListener("load", init);