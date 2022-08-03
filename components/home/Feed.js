import React, { useContext } from "react"
import UserContext from "../../contexts/Context"
import Post from "./Post"

const Feed = () => {
  const [
    userAddress,
    userShortenedAddress,
    data,
    updateData,
    userNFTs,
    userNftData,
    postNftData,
  ] = useContext(UserContext)

  return (
    <div onClick={() => console.log(postNftData)}>
      {postNftData &&
        postNftData.result.map((nft) => {
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
      Yo
    </div>
  )
}

export default Feed
