import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import {
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage';
import { WalletProvider } from './components/WalletContext';
import withWalletGuard from './components/withWalletGuard';

const GuardedMarketplace = withWalletGuard(Marketplace);
const GuardedSellNFT = withWalletGuard(SellNFT);
const GuardedProfile = withWalletGuard(Profile);

function App() {
  return (
    <WalletProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<GuardedMarketplace />} />
        <Route path="/sellNFT" element={<GuardedSellNFT />} />
        <Route path="/nftPage/:tokenId" element={<NFTPage />} />
        <Route path="/profile" element={<GuardedProfile />} />
      </Routes>
      </WalletProvider>
  );
}

export default App;
