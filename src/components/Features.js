import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <div className="dev-summ_content-section">
      <div className="content-container_1200">
        <div className="dev-summ_2grid-wrapper">
          {/* First Card */}
          <div className="dev-summ_card-wrapper">
            <div className="dev-summ_card-border state-of-sd">
              <div className="dev-summ_card-bg state-of-sd-why-attend">
                <img
                  src="https://cdn.prod.website-files.com/6222ca42ea87e1bd1aa1d10c/6747b57baea2aa62a2c9c8f6_blue%20icon%20state%20of%20sd.svg"
                  loading="lazy"
                  alt="Buy NFT"
                  className="dev-summ_card-icon-round"
                />
                <div className="dev-summ_text-box">
                  <div className="dev-summ_rich-text">
                    <h2>Explore NFTs</h2>
                    <p>Browse through a wide range of NFTs to add to your collection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="dev-summ_card-wrapper">
            <div className="dev-summ_card-border state-of-sd">
              <div className="dev-summ_card-bg state-of-sd-why-attend">
                <img
                   src="https://cdn.prod.website-files.com/6222ca42ea87e1bd1aa1d10c/67484bb5f64be44c1d85df91_Discover%20New%20Use%20Cases.svg"
                   loading="lazy"// Replace with relevant image
                  alt="Sell NFT"
                  className="dev-summ_card-icon-round"
                />
                <div className="dev-summ_text-box">
                  <div className="dev-summ_rich-text">
                    <h2>Sell Your NFTs</h2>
                    <p>List your unique NFTs for sale and showcase your work to the world.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="dev-summ_card-wrapper">
            <div className="dev-summ_card-border state-of-sd">
              <div className="dev-summ_card-bg state-of-sd-why-attend">
                <img
                   src="https://cdn.prod.website-files.com/6222ca42ea87e1bd1aa1d10c/67484c5df32b8fbebe8d552a_Identify%20Your%20Current%20ROI.svg"
                   loading="lazy"// Replace with relevant image
                  alt="NFT Marketplace"
                  className="dev-summ_card-icon-round"
                />
                <div className="dev-summ_text-box">
                  <div className="dev-summ_rich-text">
                    <h2>Secure Transactions</h2>
                    <p>Buy and sell NFTs with confidence, with secure blockchain transactions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Card */}
          <div className="dev-summ_card-wrapper">
            <div className="dev-summ_card-border state-of-sd">
              <div className="dev-summ_card-bg state-of-sd-why-attend">
                <img
                   src="https://cdn.prod.website-files.com/6222ca42ea87e1bd1aa1d10c/67484c6701a9f19274bf73c0_Develop%20an%20Action%20Plan.svg"
                   loading="lazy"// Replace with relevant image
                  alt="NFT Wallet"
                  className="dev-summ_card-icon-round"
                />
                <div className="dev-summ_text-box">
                  <div className="dev-summ_rich-text">
                    <h2>Connect Your Wallet</h2>
                    <p>Seamlessly connect your wallet and manage your NFTs on our platform.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
