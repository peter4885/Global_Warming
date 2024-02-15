import { FOOD_ADDRESS } from '../contracts/address';
import fs from 'fs'; 


const Web3 = require('web3');
const WalletConnectProvider = require('@walletconnect/web3-provider');

const abiFilePath = '../contracts/abi.json';

const contractAddress = FOOD_ADDRESS;
const contractABI = JSON.parse(fs.readFileSync(abiFilePath, 'utf-8'));


const provider = new WalletConnectProvider({
  rpc: {
    168587773: 'https://sepolia.blast.io',

  },
});

const web3 = new Web3(provider);

const contract = new web3.eth.Contract(contractABI, contractAddress);


async function connectWallet() {
    if (!provider.connected) {
      await provider.enable(); 
    }
  }

  
async function claimTokens(score) {
  try {
    await connectWallet();
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    const result = await contract.methods.claimTokens(score).send({ from: userAddress });

    console.log('Tokens claimed successfully:', result);
  } catch (error) {
    console.error('Error claiming tokens:', error);
  }
}

const scoreToClaim = 100;
claimTokens(scoreToClaim);
