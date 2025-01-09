import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useWallet } from "./WalletContext";

const Navbar = () => {
  const location = useLocation();
  const { connectWallet, disconnectWallet, walletConnected, walletDetails } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <nav className="w-screen">
        <ul className="flex justify-between items-center py-2 bg-transparent text-white px-5">
          {/* Left Section - Logo */}
          <li className="flex items-center">
            <Link to="/">
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="logo"
                width={70}
                height={70}
                className="inline-block -mt-2"
              />
              <div className="inline-block font-bold text-xl ml-2 hidden sm:inline">
                ArtBlock Exchange
              </div>
            </Link>
          </li>

          {/* Right Section - Navigation Links & Wallet Button */}
          <li className="flex items-center space-x-4">
            {/* Navigation Links - Visible on large screens */}
            <ul className="hidden lg:flex lg:space-x-4 items-center">
              {["/marketplace", "/sellNFT", "/profile"].map((path, index) => (
                <li
                  key={index}
                  className={`${
                    location.pathname === path ? "border-b-2" : "hover:border-b-2"
                  } hover:pb-0 p-2`}
                >
                  <Link to={path}>
                    {path === "/marketplace" ? "Buy NFT" : path === "/sellNFT" ? "Sell NFT" : "My NFT"}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Modal Button - Visible on small and medium screens */}
            <button
              className="lg:hidden text-white"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Wallet Connection Button */}
            <li className="hidden sm:block">
              {walletConnected ? (
                <button
                  className="enableEthereumButton bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={disconnectWallet}
                >
                  Disconnect
                </button>
              ) : (
                <button
                  className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </li>

            {/* Wallet Address (when connected) */}
            {walletConnected && walletDetails?.address && (
              <li className="ml-2 text-sm font-mono hidden sm:block">
                {`${walletDetails.address.substring(0, 6)}...${walletDetails.address.substring(
                  walletDetails.address.length - 4
                )}`}
              </li>
            )}
          </li>
        </ul>
      </nav>

      {/* Navigation Modal */}
      {menuOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded max-w-sm mx-auto p-6">
            <div className="flex justify-between items-center ">
            <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="logo"
                width={50}
                height={50}
                className="inline-block -mt-2"
              />
              <h2 className="text-lg font-medium bold text-gray-900 mb-4">ArtBlock</h2>
              </div>
              <ul className="space-y-2">
                {["/marketplace", "/sellNFT", "/profile"].map((path, index) => (
                  <li key={index}>
                    <Link
                      to={path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setMenuOpen(false)}
                    >
                      {path === "/marketplace" ? "Buy NFT" : path === "/sellNFT" ? "Sell NFT" : "My NFT"}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 w-full bg-blue-500 text-white rounded-md px-4 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @media (max-width: 640px) {
            .enableEthereumButton {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;

