import React, { useEffect, useState } from "react"
import { postsAddress } from "../../helpers/info"
import Post from "../home/Post"
import ReactLoading from "react-loading"

const ProfilePosts = ({ nftData, userdata, address }) => {
  const [posts, setPosts] = useState()

  useEffect(() => {
    if (nftData) {
      setPosts(null)
      nftData.result.map((nft) => {
        if (nft.token_address == postsAddress.toLowerCase()) {
          setPosts((prev) => {
            if (prev == null) return [nft]
            else return [...prev, nft]
          })
        }
      })
    }
  }, [nftData])

  return (
    <div>
      {posts ? (
        posts.map((post, i) => {
          const metadata = JSON.parse(post.metadata)
          return (
            <Post
              header={metadata.name}
              text={metadata.description}
              image={metadata.image}
              tokenId={post.token_id}
              posterData={userdata}
              posterAddress={address}
              isLast={i + 1 == posts.length}
              key={post.token_id}
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

export default ProfilePosts
