let walletAddress = "";

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      walletAddress = accounts[0];
      console.log(accounts[0]);
    } catch (err) {
      console.error(err.message);
    }
  } else {
    console.log("Please install MetaMask");
  }
}

async function getCurrentWalletConnected() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        walletAddress = accounts[0];
        console.log(accounts[0]);
      } else {
        console.log("Connect to MetaMask using the Connect button");
      }
    } catch (err) {
      console.error(err.message);
    }
  } else {
    console.log("Please install MetaMask");
  }
}

function addWalletListener() {
  if (typeof window.ethereum !== "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      walletAddress = accounts[0];
      console.log(accounts[0]);
    });
  } else {
    walletAddress = "";
    console.log("Please install MetaMask");
  }
}

function fromWeiToEther(wei) {
  const ether = (Number(wei) / 10 ** 18).toFixed(2);
  return ether;
}

async function getWalletBalance() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      });
      const balanceInEth = fromWeiToEther(balance);
      console.log(balanceInEth);
      return balanceInEth;
    } catch (err) {
      console.error(err.message);
    }
  } else {
    console.log("Please install MetaMask");
  }
}

const connectButton = document.querySelector('.connect-wallet');
const disconnectButton = document.querySelector('.disconnect-wallet');
const balanceButton = document.querySelector('.wallet-balance');
const dropDown = document.querySelector('.dropdown-title')
let isConnected = false;

async function init() {
  await getCurrentWalletConnected();
  addWalletListener();
  isConnected = walletAddress !== "";
  updateButtonLabels();
}

function updateButtonLabels() {
  if (isConnected) {
    connectButton.style.display = "none"
    dropDown.style.display = "block"
    dropDown.textContent = `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`;
    disconnectButton.style.display = "block";
    balanceButton.style.display = "block";
    getWalletBalance().then((balanceInEth) => {
      balanceButton.textContent = `Wallet Balance: ${balanceInEth} ETH`;
    });
  } else {
    connectButton.textContent = "Connect Wallet";
    disconnectButton.style.display = "none";
    balanceButton.style.display = "none";
  }
}

connectButton.addEventListener('click', async () => {
  await connectWallet();
  isConnected = walletAddress !== "";
  updateButtonLabels();
});

disconnectButton.addEventListener('click', () => {
  walletAddress = "";
  dropDown.style.display = "none"
  connectButton.style.display = "block"
  isConnected = false;
  updateButtonLabels();
});

init();

