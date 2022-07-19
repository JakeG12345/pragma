import { useMoralis } from 'react-moralis';
import Feed from '../components/home/Feed';
import PostInFeed from '../components/home/PostInFeed';
import TopConnectWallet from '../components/home/TopConnectWallet';

export default function Home() {
  const { isAuthenticated } = useMoralis()

  return (
    <div>
      {isAuthenticated ? <PostInFeed /> : <TopConnectWallet />}
      <Feed />
    </div>
  )
}