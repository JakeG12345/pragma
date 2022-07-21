import React, { useEffect } from "react"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { userdataAddress } from "../../helpers/info"
import Post from "./Post"
import abi from "../../helpers/userdataAbi.json"

const Feed = ({ posts }) => {
  // const { native } = useMoralisWeb3Api()

  // const userdataOptions = {
  //   chain: "mumbai",
  //   address: userdataAddress,
  //   function_name: "getUserData",
  //   abi: abi,
  //   params: { addresses: posts.posterAddresses },
  // }

  // const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
  //   native.runContractFunction,
  //   { ...userdataOptions }
  // )

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  // useEffect(() => {
  //   const updatePostersData = async () => {
  //     await delay(500)
  //     fetch({ params: userdataOptions })
  //   }
  // }, [posts])

  return (
    <div>
      {posts.data.result &&
        posts.data.result.map((nft) => {
          const metadata = JSON.parse(nft.metadata)
          return (
            <Post
              header={metadata.name}
              text={metadata.description}
              image={metadata.image}
              tokenId={nft.token_id}
              posterAddress={nft.owner_of}
              key={nft.token_id}
            />
          )
        })}
      {/* <button onClick={() => console.log(posts)}>Posts</button> */}
    </div>
  )
}

export default Feed
