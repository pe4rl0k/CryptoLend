import Web3 from 'web3';
import { ethers } from 'ethers';

const contractABI = []; 
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; 

if (typeof window.ethereum !== 'undefined') {
  console.log('Ethereum wallet is detected!');
}

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);



async function fetchData() {
  try {
    const response = await fetch('YOUR_BACKEND_ENDPOINT'); 
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function interactWithContract() {
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


document.getElementById('yourButtonId').addEventListener('click', async () => { 
  await interactWithContract();
});


async function requestAccount() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('Connected account:', accounts[0]);
  } catch (error) {
    console.error('Error accessing account:', error);
  }
}


requestAccount();