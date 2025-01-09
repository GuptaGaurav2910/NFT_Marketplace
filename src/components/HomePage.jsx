import React, { useState, useEffect } from 'react';
import TrendingCollections from './TrendingCollections';
import Footer from './Footer';
import Navbar from './Navbar';
import Dreamer from './images/dreamer.jpg';
import Wilder from './images/wilder.jpg';
import Neon from './images/neon.jpg';
import { useWallet } from './WalletContext';
import Features from './Features';

const HomePage = () => {
  const [featuredNFTs, setFeaturedNFTs] = useState([]);
  const { connectWallet, walletConnected, disconnectWallet } = useWallet();

  useEffect(() => {
    const mockFeaturedNFTs = [
      { id: 1, name: 'Cosmic Dreamer', artist: 'StellarArt', price: '0.5 ETH', image: Dreamer },
      { id: 2, name: 'Digital Wilderness', artist: 'CryptoCreator', price: '0.8 ETH', image: Wilder },
      { id: 3, name: 'Neon Nights', artist: 'PixelMaster', price: '0.3 ETH', image: Neon },
    ];
    setFeaturedNFTs(mockFeaturedNFTs);
  }, []);

  const handleWalletButtonClick = () => {
    if (walletConnected) {
      disconnectWallet(); // Disconnect wallet if connected
    } else {
      connectWallet(); // Connect wallet if not connected
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <main>
        <section style={styles.hero}>
          <h2 style={styles.heroTitle}>Discover, Collect, and Sell Extraordinary NFTs</h2>
          <p style={styles.heroSubtitle}>Enter the world of digital art and collectibles</p>
          <button style={styles.ctaButton} onClick={handleWalletButtonClick}>
            {walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
          </button>
        </section>
        <Features />
        <section style={styles.featuredSection}>
          <h3 style={styles.sectionTitle}>Featured NFTs</h3>
          <div style={styles.nftGrid}>
            {featuredNFTs.map((nft) => (
              <div key={nft.id} style={styles.nftCard}>
                <div style={styles.imageContainer}>
                  <img src={nft.image} alt={nft.name} style={styles.nftImage} />
                  <div style={styles.overlay}>
                    <h4 style={styles.nftName}>{nft.name}</h4>
                    <p style={styles.nftArtist}>by {nft.artist}</p>
                    <p style={styles.nftPrice}>{nft.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.trendingSection}>
          <h3 style={styles.sectionTitle}>Trending Collections</h3>
          <TrendingCollections />
        </section>
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    color: '#2c3e50',
    width: '100%',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
    padding: '60px 0',
    borderRadius: '12px',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'white',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    color: 'white',
    marginBottom: '30px',
    maxWidth: '600px',
    margin: '0 auto 30px',
  },
  ctaButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  featuredSection: {
    marginBottom: '60px',
    margin: '50px 50px',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: 'white',
    textAlign: 'center',
  },
  nftGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  nftCard: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
  },
  nftImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
  },
  nftName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  nftArtist: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
  nftPrice: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#3498db',
  },
  trendingSection: {
    marginBottom: '60px',
  },
};

export default HomePage;
