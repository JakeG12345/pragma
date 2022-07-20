import React, { useContext } from "react"
import UserContext from "../../contexts/Context"
import Post from "./Post"

const Feed = ({ posts }) => {
  const [
    userAddress,
    userShortenedAddress,
    data,
    updateData,
    userNFTs,
    userNftData,
  ] = useContext(UserContext)

  return (
    <div>
      {posts &&
        posts.result.map((nft) => {
          const metadata = JSON.parse(nft.metadata)
          return (
            <Post
              header={metadata.name}
              text={metadata.description}
              image={metadata.image}
              posterAddress={nft.owner_of}
              key={nft.token_id}
            />
          )
        })}
    </div>
  )
}

export default Feed
