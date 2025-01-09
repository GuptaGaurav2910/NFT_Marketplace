import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>NFT MarketPlace</h4>
          <p style={styles.footerText}>Discover, collect, and sell extraordinary NFTs</p>
        </div>
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Quick Links</h4>
          <ul style={styles.footerList}>
            <li><a href="#" style={styles.footerLink}>Explore</a></li>
            <li><a href="#" style={styles.footerLink}>Create</a></li>
            <li><a href="#" style={styles.footerLink}>Community</a></li>
          </ul>
        </div>
        <div style={styles.footerSection}>
          <h4 style={styles.footerTitle}>Connect with Us</h4>
          <ul style={styles.footerList}>
            <li><a href="#" style={styles.footerLink}>Twitter</a></li>
            <li><a href="#" style={styles.footerLink}>Discord</a></li>
            <li><a href="#" style={styles.footerLink}>Instagram</a></li>
          </ul>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p>&copy; 2025 NFT Wonderland. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#ecf0f1',
    padding: '40px 20px',
    textAlign: 'center',
    fontSize: '16px'
  },
//   footer {
//     background-color: rgba(0, 0, 0, 0.6); /* Dark semi-transparent background */
//     color: #ecf0f1; /* White text color */
//     padding: 40px 20px;
//     text-align: center; /* Ensures text is centered */
//     font-size: 16px; /* Adjust font size as needed */
//   }
  
  footerContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerSection: {
    flex: '1 1 250px',
    marginBottom: '20px',
  },
  footerTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  footerText: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
  },
  footerLink: {
    color: '#bdc3c7',
    textDecoration: 'none',
    fontSize: '0.9rem',
    lineHeight: '1.8',
    transition: 'color 0.3s ease',
  },
  footerBottom: {
    borderTop: '1px solid #34495e',
    marginTop: '20px',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '0.8rem',
  },
};

export default Footer;

