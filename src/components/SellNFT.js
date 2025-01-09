import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import Footer from "./Footer";

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState("");
  const location = useLocation();
  const ethers = require("ethers");

  // Function to handle button state
  const toggleButton = (disable) => {
    const listButton = document.getElementById("list-button");
    listButton.disabled = disable;
    listButton.style.backgroundColor = disable ? "grey" : "#A500FF";
    listButton.style.opacity = disable ? 0.3 : 1;
  };

  // Upload NFT image to IPFS
  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    try {
      toggleButton(true);
      updateMessage("Uploading image... please wait!");

      const response = await uploadFileToIPFS(file);
      if (response.success) {
        setFileURL(response.pinataURL);
        updateMessage("");
        console.log("Uploaded image to Pinata:", response.pinataURL);
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      updateMessage("Error uploading image. Please try again.");
    } finally {
      toggleButton(false);
    }
  };

  // Upload metadata to IPFS
  const uploadMetadataToIPFS = async () => {
    const { name, description, price } = formParams;

    if (!name || !description || !price || !fileURL) {
      updateMessage("Please fill all the fields!");
      return -1;
    }

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success) {
        console.log("Uploaded JSON to Pinata:", response.pinataURL);
        return response.pinataURL;
      } else {
        throw new Error("Metadata upload failed");
      }
    } catch (error) {
      console.error("Error uploading JSON metadata:", error);
      updateMessage("Error uploading metadata. Please try again.");
      return -1;
    }
  };

  // List NFT on the marketplace
  const listNFT = async (e) => {
    e.preventDefault();

    try {
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      toggleButton(true);
      updateMessage("Uploading NFT (this may take a few minutes)...");

      const contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      const price = ethers.utils.parseUnits(formParams.price, "ether");
      const listingPrice = (await contract.getListPrice()).toString();

      const transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      setFileURL(null);
      alert("Successfully listed your NFT!");
      window.location.replace("/");
    } catch (error) {
      console.error("Error listing NFT:", error);
      alert("Upload error: " + error.message);
    } finally {
      toggleButton(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col place-items-center mt-10" id="nftForm">
        <form
          className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4"
          onSubmit={listNFT}
        >
          <h3 className="text-center font-bold text-purple-500 mb-8">
            Upload your NFT to the marketplace
          </h3>
          <div className="mb-4">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="name"
            >
              NFT Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Axie#4563"
              value={formParams.name}
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="description"
            >
              NFT Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              cols="40"
              rows="5"
              id="description"
              placeholder="Axie Infinity Collection"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price (in ETH)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Min 0.01 ETH"
              step="0.01"
              value={formParams.price}
              onChange={(e) =>
                updateFormParams({ ...formParams, price: e.target.value })
              }
            />
          </div>
          <div>
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image (&lt;500 KB)
            </label>
            <input type="file" onChange={onChangeFile} />
          </div>
          <br />
          <div className="text-red-500 text-center">{message}</div>
          <button
            type="submit"
            className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
            id="list-button"
          >
            List NFT
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
