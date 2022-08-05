import React, { useContext } from "react"
import Post from "./Post"
import ReactLoading from "react-loading"
import { PostsContext } from "../../contexts/PostsContext"
import { AccountsContext } from "../../contexts/AccountsContext"

const Feed = () => {
  const postContext = useContext(PostsContext)
  const accountContext = useContext(AccountsContext)

  return (
    <div>
      {postContext.postData ? (
        postContext.postData.map((nft, i) => {
          const metadata = JSON.parse(nft.metadata)
          const address = nft.owner_of

          return (
            <Post
              header={metadata.name}
              text={metadata.description}
              image={metadata.image}
              tokenId={nft.token_id}
              posterData={nft.userdata}
              timestamp={nft.updated_at}
              posterAddress={address}
              isLast={i + 1 == postContext.postData.length}
              key={nft.token_id}
            />
          )
        })
      ) : (
        <div className='flex items-center justify-center mt-10'>
          <ReactLoading type='bubbles' width={200} />
        </div>
      )}
    </div>
  )
}

export default Feed
