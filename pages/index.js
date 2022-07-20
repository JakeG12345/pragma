import { useMoralis } from 'react-moralis';
import Feed from '../components/home/Feed';
import PostInFeed from '../components/home/PostInFeed';
import TopConnectWallet from '../components/home/TopConnectWallet';

export default function Home({posts}) {
  const { isAuthenticated } = useMoralis()

  return (
    <div>
      {isAuthenticated ? <PostInFeed /> : <TopConnectWallet />}
      <Feed posts={posts} />
    </div>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch(
      "https://deep-index.moralis.io/api/v2/nft/0xf99F9f79BD478415807aF5a0b7C49f17E40981D5/owners?chain=mumbai&format=decimal",
      {
        method: "GET",
        headers: {
          accept: "applications/json",
          "X-API-Key":
            process.env.MORALIS_API_KEY,
        },
      }
    )
    const posts = await res.json()
  
    return {
      props: {
        posts,
      },
    }
  }
  catch {
    console.log("error with fetching post nfts")
  }
}