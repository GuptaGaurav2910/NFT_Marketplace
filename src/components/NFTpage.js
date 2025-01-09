import Navbar from "./Navbar";
import { useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState,useEffect } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import Footer from "./Footer";

export default function NFTPage (props) {

const [data, updateData] = useState({});
const [message, updateMessage] = useState("");
const [currAddress, updateCurrAddress] = useState("0x");
const [dataFetched, updateDataFetched] = useState(false);

const params = useParams();
const tokenId = params.tokenId;

useEffect(() => {
    if (!dataFetched) {
        getNFTData(tokenId);
    }
}, [dataFetched, tokenId]);

async function getNFTData(tokenId) {
    try {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);

        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);

        const metaURL = GetIpfsUrlFromPinata(tokenURI);
        const meta = (await axios.get(metaURL)).data;

        const item = {
            price: ethers.utils.formatEther(listedToken.price).toString(),
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: GetIpfsUrlFromPinata(meta.image),
            name: meta.name,
            description: meta.description,
        };

        updateData(item);
        updateDataFetched(true);
        updateCurrAddress(addr);
    } catch (e) {
        console.error("Error fetching NFT data:", e);
    }
}

async function buyNFT() {
    try {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);

        //run the executeSale function
        if (!data.price || isNaN(Number(data.price))) {
            console.error("Invalid data.price:", data.price);
            throw new Error("Invalid price value for the NFT.");
        }
        const salePrice = ethers.utils.parseUnits(data.price.toString(), 'ether');
        console.log("Sale price BigNumber:", salePrice.toString());

        updateMessage("Buying the NFT... Please Wait ")
        let transaction = await contract.executeSale(tokenId, {value:salePrice});
        await transaction.wait();

        alert('You successfully bought the NFT!');
        await getNFTData(tokenId);
        updateMessage("");
    }
    catch(e) {
        console.error("Error during purchase:", e);
        alert("Upload Error: " + e.message);
    }
}
    if(typeof data.image == "string")
        data.image = GetIpfsUrlFromPinata(data.image);

    return(
        <div style={{"minHeight":"100vh"}}>
            <Navbar></Navbar>
            <div className="flex ml-20 mt-20">
                <img src={data.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                    <div>
                    <strong>Name:</strong> {data.name || "Loading..."}
                    </div>
                    <div>
                    <strong>Description:</strong> {data.description || "Loading..."}
                    </div>
                    <div>
                    <strong>Price:</strong> {data.price ? `${data.price} ETH` : "Loading..."}
                    </div>
                    <div>
                    <strong>Owner:</strong> <span className="text-sm">{data.owner || "Loading..."}</span>
                    </div>
                    <div>
                    <strong>Seller:</strong> <span className="text-sm">{data.seller || "Loading..."}</span>
                    </div>
                    <div>
                    { currAddress != data.owner && currAddress != data.seller ?
                        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={buyNFT}>Buy this NFT</button>
                        : <div className="text-emerald-700">You are the owner of this NFT</div>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}