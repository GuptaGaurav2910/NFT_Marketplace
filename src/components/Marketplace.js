import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import Footer from "./Footer";

export default function Marketplace() {
    const [data, setData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                setLoading(true); // Start loading
                const ethers = require("ethers");
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);

                // Fetch all NFTs
                const transaction = await contract.getAllNFTs();
                const items = await Promise.all(
                    transaction.map(async (i) => {
                        let tokenURI = await contract.tokenURI(i.tokenId);
                        tokenURI = GetIpfsUrlFromPinata(tokenURI);
                        const meta = await axios.get(tokenURI).then((res) => res.data);

                        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
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
                setDataFetched(true);
            } catch (err) {
                console.error("Error fetching NFTs:", err);
                setError("Failed to fetch NFT data. Please try again later.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        if (!dataFetched) {
            fetchNFTs();
        }
    }, [dataFetched]);

    return (
        <div>
            <Navbar />
            <div className="flex flex-col place-items-center mt-20">
                <div className="md:text-xl font-bold text-white">Top NFTs</div>
                {loading ? (
                    <div className="mt-10 text-white">Loading NFTs...</div>
                ) : error ? (
                    <div className="mt-10 text-red-500">{error}</div>
                ) : (
                    <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                        {data.map((value, index) => (
                            <NFTTile data={value} key={index} />
                        ))}
                    </div>
                )}
                {!loading && data.length === 0 && !error && (
                    <div className="mt-10 text-white">No NFTs available at the moment.</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
