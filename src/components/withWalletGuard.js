import React, { useState } from "react";
import { useWallet } from "./WalletContext";
import { useNavigate } from "react-router-dom";

const withWalletGuard = (WrappedComponent) => {
  return (props) => {
    const { walletConnected, connectWallet } = useWallet();
    const [showModal, setShowModal] = useState(!walletConnected);
    const navigate = useNavigate();

    const handleConnectWallet = () => {
      connectWallet();
      setShowModal(false); // Close modal after connecting wallet
    };

    const handleCloseModal = () => {
      setShowModal(false); // Close modal
      navigate("/"); // Redirect to home page
    };

    const handleModalClick = (e) => {
      e.stopPropagation(); // Prevent modal click from closing the modal
    };

    if (!walletConnected && showModal) {
      return (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal} // Close modal on outside click
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md relative"
            onClick={handleModalClick} // Prevent closing on modal click
          >
            {/* Close button at top-right */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              Please connect your wallet to access this feature. Ensure your
              wallet extension (e.g., MetaMask) is active.
            </p>
            <button
              className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition-colors duration-300"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withWalletGuard;
