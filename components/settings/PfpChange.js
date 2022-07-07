import React, { useEffect, useState, useContext } from "react"
import UserContext from "../../contexts/UserContext"
import { useMoralisWeb3Api } from "react-moralis"

const resolveLink = (url) => {
  if (!url || !url.includes("ipfs://")) return url
  return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
}

const PfpChange = () => {
  const Web3Api = useMoralisWeb3Api()
  const [mumbaiNFTImages, setMumbaiNFTImages] = useState()
  const [userAddress] = useContext(UserContext)

  const getNFTs = async () => {
    const options = {
      chain: "mumbai",
      address: userAddress,
    }
    const nftData = await Web3Api.account.getNFTs(options)
    console.log(nftData)
    const nftImages = nftData.result.map((e) => {
      const image = JSON.parse(e.metadata)?.image
      if (image == null) return
      return resolveLink(image)
    })
    setMumbaiNFTImages(nftImages)
  }

  useEffect(() => {
    getNFTs()
  }, [])

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-semibold'>Change Profile Picture</h2>
      <span className='flex space-x-3'>
        <h3 className='text-lg font-medium'>NFTs</h3>
        <div>-</div>
        <p className='text-sm'>
          Test
        </p>
      </span>

      <button onClick={() => console.log(mumbaiNFTImages)}>
        Console Log User NFTs
      </button>
    </div>
  )
}

export default PfpChange
