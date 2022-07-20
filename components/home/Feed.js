import React from "react"
import Post from "./Post"

const Feed = ({posts}) => {
  return (
    <div>
      {posts.result &&
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
