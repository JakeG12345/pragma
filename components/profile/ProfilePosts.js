import React, { useContext } from "react"
import Context from "../../contexts/Context"
import { postsAddress } from "../../helpers/info"
import Post from "../home/Post"
import ReactLoading from "react-loading"

const ProfilePosts = () => {
  const [userAddress, a, userdata, b, c, nftData] = useContext(Context)

  return (
    <div>
      {nftData ? (
        nftData.result.map((nft, i) => {
          if (nft.token_address == postsAddress.toLowerCase()) {
            const metadata = JSON.parse(nft.metadata)
            return (
              <Post
                header={metadata.name}
                text={metadata.description}
                image={metadata.image}
                tokenId={nft.token_id}
                posterData={userdata}
                posterAddress={userAddress}
                isLast={i+1 == nftData.result.length}
                key={nft.token_id}
              />
            )
          }
        })
      ) : (
        <div className='flex items-center justify-center mt-10'>
          <ReactLoading type='bubbles' width={200} />
        </div>
      )}
    </div>
  )
}

export default ProfilePosts
