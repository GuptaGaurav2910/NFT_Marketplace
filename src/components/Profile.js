import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWallet } from "./WalletContext";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState, useEffect } from "react";
import NFTTile from "./NFTTile";

export default function Profile() {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [dataFetched, setFetched] = useState(false);
  const { walletDetails } = useWallet();

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const ethers = require("ethers");
        let sumPrice = 0;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          MarketplaceJSON.address,
          MarketplaceJSON.abi,
          signer
        );

        const transaction = await contract.getMyNFTs();

        const items = await Promise.all(
          transaction.map(async (i) => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            const meta = (await axios.get(tokenURI)).data;

            const price = ethers.utils.formatUnits(i.price.toString(), "ether");
            sumPrice += Number(price);
            return {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.image,
              name: meta.name,
              description: meta.description,
            };
          })
        );

        setData(items);
        setFetched(true);
        setTotalPrice(sumPrice.toPrecision(3));
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    if (!dataFetched) {
      fetchNFTData();
    }
  }, [dataFetched]);

  return (
    <div className="profileClass" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="profileClass">
        <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
          <div className="mb-5">
            <h2 className="font-bold">Wallet Address</h2>
            {walletDetails ? walletDetails.address : "Loading..."}
          </div>
        </div>
        <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-white">
          <div>
            <h2 className="font-bold">No. of NFTs</h2>
            {data.length}
          </div>
          <div className="ml-20">
            <h2 className="font-bold">Total Value</h2>
            {`${totalPrice} ETH`}
          </div>
        </div>
        <div className="flex flex-col text-center items-center mt-11 text-white">
          <h2 className="font-bold">Your NFTs</h2>
          <div className="flex justify-center flex-wrap max-w-screen-xl">
            {data.map((value, index) => (
              <NFTTile data={value} key={index} />
            ))}
          </div>
          <div className="mt-10 text-xl">
            {data.length === 0 ? "Oops, No NFT data to display" : ""}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
