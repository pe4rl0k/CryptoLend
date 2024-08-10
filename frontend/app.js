import Web3 from 'web3';
import { ethers } from 'ethers';

const contractABI = [];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

if (typeof window.ethereum === 'undefined') {
  console.error('Ethereum wallet not detected. Please ensure MetaMask is installed.');
} else {
  console.log('Ethereum wallet is detected!');
}

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
try {
  signer = provider.getSigner();
} catch (error) {
  console.error('Error getting signer:', error);
}

let contract;
try {
  contract = new ethers.Contract(contractAddress, contractABI, signer);
} catch (error) {
  console.error('Error initializing contract:', error);
}

async function fetchData() {
  try {
    const response = await fetch('YOUR_BACKEND_ENDPOINT');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function interactWithContract() {
  if (!contract) {
    console.error('Contract is not initialized.');
    return;
  }

  try {
    const transaction = await contract.someFunction(); 
    console.log('Transaction:', transaction);
  } catch (error) {
    console.error('Error interacting with contract:', error);
  }
}

document.addEventListener('DOMContentLoaded', async (event) => {
  await fetchData();
});

const yourButtonElement = document.getElementById('yourButtonId');
if (yourButtonElement) {
  yourButtonElement.addEventListener('click', async () => { 
    await interactWithContract();
  });
} else {
  console.error('Button with specified ID not found.');
}

async function requestAccount() {
  if (typeof window.ethereum === 'undefined') {
    console.error('Ethereum wallet is not available.');
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
      console.error('No account found. Please ensure you are logged into your Ethereum wallet.');
      return;
    }
    console.log('Connected account:', accounts[0]);
  } catch (error) {
    console.error('Error accessing account:', error);
  }
}

requestAccount();