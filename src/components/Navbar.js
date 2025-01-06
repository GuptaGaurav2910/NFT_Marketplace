import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {
  const [connected, setConnected] = useState(false);
  const location = useLocation();
  const [currAddress, setCurrAddress] = useState('0x');

  // Function to handle wallet connection
  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to use this application.");
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        console.log('Connected accounts:', accounts);
        setConnected(true);
        setCurrAddress(accounts[0]);
        updateButton();
      } else {
        console.error("No accounts found.");
      }

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0xaa36a7') {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        });
        console.log("Switched to Sepolia network.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error.message);
    }
  }

  // Update the Connect Wallet button UI
  function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    if (ethereumButton) {
      ethereumButton.textContent = "Connected";
      ethereumButton.classList.remove("hover:bg-blue-700", "bg-blue-500");
      ethereumButton.classList.add("hover:bg-green-700", "bg-green-500");
    }
  }
  // Fetch wallet accounts on component mount
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          console.log('Accounts:', accounts);
          setConnected(true);
          setCurrAddress(accounts[0]);
          updateButton();
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    }
    fetchAccounts();
  }, []);

  return (
    <div className="">
      <nav className="w-screen">
        <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" width={70} height={70} className="inline-block -mt-2"/>
              <div className='inline-block font-bold text-xl ml-2'>
                ArtBlock Exchange
              </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {['/', '/sellNFT', '/profile'].map((path, index) => (
                <li
                  key={index}
                  className={`${location.pathname === path ? 'border-b-2' : 'hover:border-b-2'} hover:pb-0 p-2`}
                >
                  <Link to={path}>{path === '/' ? 'Marketplace' : path.slice(1).replace('NFT', ' My NFT')}</Link>
                </li>
              ))}
              <li>
                <button
                  className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={connectWallet}
                >
                  {connected ? "Connected" : "Connect Wallet"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className='text-white text-bold text-right mr-10 text-sm'>
        {currAddress !== "0x" ? `Connected to ${currAddress.substring(0, 15)}...` : "Not Connected. Please login to view NFTs"}
      </div>
    </div>
  );
}

export default Navbar;
