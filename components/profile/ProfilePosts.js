import React, { useEffect, useState } from "react"
import { postsAddress } from "../../helpers/info"
import Post from "../home/Post"
import ReactLoading from "react-loading"
import Link from "next/link"

const ProfilePosts = ({ nftData, userdata, address, isProfile }) => {
  const [posts, setPosts] = useState("not-set")

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
      {posts != "not-set" && posts ? (
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
      ) : posts == "not-set" ? (
        <div className='flex items-center justify-center mt-10'>
          <ReactLoading type='bubbles' width={200} />
        </div>
      ) : (
        <div className='flex flex-col items-center space-y-3'>
          <h1 className='ml-5 mt-5 text-2xl font-bold'>
            {isProfile ? "You Have No Posts" : "User Has No Posts"}
          </h1>
          {isProfile && (
            <p className='ml-5'>
              Mint a post{" "}
              <Link href='/'>
                <a className='text-blue-500 underline'>here</a>
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfilePosts
