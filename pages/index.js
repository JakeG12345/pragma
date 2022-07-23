import { useMoralis } from "react-moralis"
import Feed from "../components/home/Feed"
import PostInFeed from "../components/home/PostInFeed"
import TopConnectWallet from "../components/home/TopConnectWallet"
import { postsAddress } from "../helpers/info"

export default function Home({ posts }) {
  const { isAuthenticated } = useMoralis()

  return (
    <div>
      {isAuthenticated ? <PostInFeed /> : <TopConnectWallet />}
      <Feed posts={posts} />
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(
      `https://deep-index.moralis.io/api/v2/nft/${postsAddress}/owners?chain=mumbai&format=decimal`,
      {
        method: "GET",
        headers: {
          accept: "applications/json",
          "X-API-Key": process.env.MORALIS_API_KEY,
        },
      }
    )
    const postData = await res.json()
    const posterAddresses = postData.result.map((p) => {
      return p.owner_of
    })
    const posts = {
      data: postData,
      addresses: posterAddresses
    }

    return {
      props: {
        posts,
      },
    }
  } catch {
    return {
      props: {
        msg: "ERROR",
      },
    }
  }
}
