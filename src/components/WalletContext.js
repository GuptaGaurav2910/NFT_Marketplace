import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

// Create the Wallet Context
const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletDetails, setWalletDetails] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this application.");
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length > 0) {
        const address = accounts[0];
        setCurrentAddress(address);
        console.log('Connected accounts:', accounts);

        // Check for the correct chain
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const desiredChainId = '0xaa36a7'; // Sepolia testnet

        if (chainId !== desiredChainId) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: desiredChainId }],
          });
          console.log("Switched to Sepolia network.");
        }

        // Fetch wallet balance
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);

        setWalletDetails({ address, balance: `${formattedBalance} ETH`, chainId });
        setWalletConnected(true);
      } else {
        console.error("No accounts found.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error.message);
    }
  };

  const disconnectWallet = () => {
    setWalletDetails(null);
    setWalletConnected(false);
    setCurrentAddress(null);
    console.log("Wallet disconnected.");
  };

  // Fetch wallet accounts when the component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const address = accounts[0];
            setCurrentAddress(address);
            setWalletConnected(true);

            // Fetch chain ID
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            // Fetch balance
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(address);
            const formattedBalance = ethers.utils.formatEther(balance);

            setWalletDetails({ address, balance: `${formattedBalance} ETH`, chainId });
          }
        }
      } catch (error) {
        console.error("Error fetching accounts:", error.message);
      }
    };

    fetchAccounts();

    // Listen for account and chain changes
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setCurrentAddress(accounts[0]);
        setWalletConnected(true);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletConnected,
        walletDetails,
        currentAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Hook to use the Wallet Context
export const useWallet = () => useContext(WalletContext);
