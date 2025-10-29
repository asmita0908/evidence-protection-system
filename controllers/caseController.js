const Case = require('../models/Case');
const Web3 = require('web3');
const crypto = require('crypto'); // For creating the hash

// --- START BLOCKCHAIN IMPORTS & CONFIG ---

// Truffle artifacts file ko import karein. Path change mat karna.
const EvidenceContractArtifact = require('../root/build/contracts/EvidenceContract.json'); 

// 🚨 YEH TEEN CHIZEIN BADALNI HONGi:
// 1. Contract Address (Jab deploy karoge tab milega)
const contractAddress = '0x123...'; // <-- Yahan apne deployed contract ka address dalna
// 2. Infura URL (Aapne abhi copy kiya hai)
const web3NetworkUrl = 'https://sepolia.infura.io/v3/c1c711b14e69483e85a3fc7b8dcdfe6f'; 
// 3. Ethereum Account Address
const fromAccount = '0x66c26260B3D0Bfd1d4d42140b6BB3b00c82bb7D1'; 
// <-- Yahan apna MetaMask Sepolia Public Address dalna

const web3 = new Web3(new Web3.providers.HttpProvider(web3NetworkUrl));
const contractInstance = new web3.eth.Contract(
  EvidenceContractArtifact.abi, 
  contractAddress
);

// --- END BLOCKCHAIN IMPORTS & CONFIG ---


// ✅ Upload case
exports.uploadCase = async (req, res) => {
  try {
    const { caseNumber, date, time, type, place, description, criminalName } = req.body;
    const file = req.file ? req.file.filename : null; 

    const newCase = new Case({
      caseNumber,
      date,
      time,
      type,
      place,
      description,
      criminalName,
      file
    });

    await newCase.save();
    
    // --- BLOCKCHAIN LOGIC START ---
    
    // 1. Evidence Data se hash banao
    const dataToHash = newCase._id.toString() + (file || '');
    const evidenceHash = crypto.createHash('sha256').update(dataToHash).digest('hex');

    // 2. Hash ko Smart Contract mein store karo
    // Note: Yahan par aapka MetaMask address active hona chahiye aur usmein Sepolia Ether hona chahiye
    await contractInstance.methods.storeEvidence(evidenceHash).send({ from: fromAccount, gas: 3000000 }); 
    
    console.log(`Blockchain: Hash stored for Case ID ${newCase._id}: ${evidenceHash}`);
    
    // --- BLOCKCHAIN LOGIC END ---

    res.status(200).json({ message: '✅ Case uploaded and Blockchain logged', case: newCase, hash: evidenceHash });
  } catch (err) {
    // Agar MongoDB ya Blockchain mein error aaya toh yahi catch hoga
    res.status(500).json({ message: '❌ Error uploading case or logging to blockchain', error: err.message });
  }
};

// Yahan se baaki code (getAllCases, searchCases) continue karega.