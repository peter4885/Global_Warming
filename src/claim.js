const Web3 = require('web3');
const WalletConnectProvider = require('@walletconnect/web3-provider');

const contractABI = ;
const contractAddress = ;


const provider = new WalletConnectProvider({
  rpc: {
    168587773: 'https://sepolia.blast.io',

  },
});

const web3 = new Web3(provider);

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function claimTokens(score) {
  try {
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
