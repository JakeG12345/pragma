import React, { useEffect } from "react"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { userdataAddress } from "../../helpers/info"
import Post from "./Post"
import abi from "../../helpers/userdataAbi.json"
import ReactLoading from "react-loading"

const Feed = ({ posts }) => {
  const { native } = useMoralisWeb3Api()

  const userdataOptions = {
    chain: "mumbai",
    address: userdataAddress,
    function_name: "getBulkUserData",
    abi: abi,
    params: { addresses: posts.addresses },
  }

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...userdataOptions }
  )

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    const updatePostersData = async () => {
      await delay(500)
      fetch({ params: userdataOptions })
    }
    updatePostersData()
  }, [posts])

  return (
    <div>
      {data ? (
        posts.data.result &&
        posts.data.result.map((nft, i) => {
          const metadata = JSON.parse(nft.metadata)
          return (
            <Post
              header={metadata.name}
              text={metadata.description}
              image={metadata.image}
              tokenId={nft.token_id}
              posterData={data[i]}
              posterAddress={nft.owner_of}
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
