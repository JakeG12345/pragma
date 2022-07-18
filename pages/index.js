import { useMoralis } from 'react-moralis';
import PostInFeed from '../components/home/PostInFeed';
import TopConnectWallet from '../components/home/TopConnectWallet';

export default function Home() {
  const { isAuthenticated } = useMoralis()

  return (
    <div>
      {isAuthenticated ? <PostInFeed /> : <TopConnectWallet />}
      
    </div>
  )
}