import React from 'react';
import boredApeImage from './images/yacht.jpg';
import cryptoPunkImage from './images/cryptp.jpg';
import doodleImage from './images/Doodles.jpg';
import azukiImage from './images/azuki.jpg';

const TrendingCollections = () => {
  const collections = [
    { id: 1, name: 'Bored Ape Yacht Club', volume: '5,678 ETH', image: boredApeImage },
    { id: 2, name: 'CryptoPunks', volume: '4,321 ETH', image: cryptoPunkImage },
    { id: 3, name: 'Doodles', volume: '3,456 ETH', image: doodleImage },
    { id: 4, name: 'Azuki', volume: '2,345 ETH', image: azukiImage },
  ];

  return (
    <div style={styles.container}>
      {collections.map((collection) => (
        <div key={collection.id} style={styles.collectionCard}>
          <div style={styles.imageContainer}>
            <img src={collection.image} alt={collection.name} style={styles.collectionImage} />
            <div style={styles.overlay}>
              <h4 style={styles.collectionName}>{collection.name}</h4>
              <p style={styles.collectionVolume}>Volume: {collection.volume}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  collectionCard: {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    height: '300px', // Consistent height for all cards
    width: '100%', // Width adjusts to grid
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensures the image fills the container proportionally
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for text
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  },
  collectionName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  collectionVolume: {
    fontSize: '1rem',
  },
};

export default TrendingCollections;
