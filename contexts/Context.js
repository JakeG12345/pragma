import { createContext, useState, useEffect } from "react"
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis"
import abi from "../helpers/userdataAbi.json"
import resolveLink from "../helpers/resolveLink"

export const Context = createContext(null)

export const ContextProvider = ({ children }) => {
  const { Moralis } = useMoralis()
  const { native, account } = useMoralisWeb3Api()

  const [userAddress, setUserAddress] = useState("Loading...")
  const [userShortenedAddress, setUserShortenedAddress] = useState("Loading...")
  const [userNFTs, setUserNFTs] = useState()
  const [userNftData, setUserNftData] = useState()
  const [postNftData, setPostNftData] = useState()

  const getUserdataOptions = {
    chain: "mumbai",
    address: "0xfeCe8d74537C3246A959c6fBc34f5317F303af0c",
    function_name: "getUserData",
    abi: abi,
    params: { userAddress: userAddress },
  }

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...getUserdataOptions }
  )

  const updateData = async () => {
    await Moralis.start({
      serverUrl: "https://vitfkaqzlt7v.usemoralis.com:2053/server",
      appId: "xvr9Dhgt45W1cwe7Vjxb79OTNHGz6cHqH2cqvsUL",
    })
    const user = Moralis.User.current()
    if (user == null) return

    const ethAddress = user.attributes.ethAddress
    setUserShortenedAddress(
      `${ethAddress.slice(0, 4)}...${ethAddress.slice(38)}`
    )
    setUserAddress(ethAddress)

    const userdataOptions = {
      chain: "mumbai",
      address: "0xfeCe8d74537C3246A959c6fBc34f5317F303af0c",
      function_name: "getUserData",
      abi: abi,
      params: { userAddress: ethAddress },
    }
    fetch({ params: userdataOptions })

    const getNftOptions = {
      chain: "mumbai",
      address: ethAddress,
    }
    const nftData = await account.getNFTs(getNftOptions)
    setUserNftData(nftData)
    const nftImages = nftData.result.map((e) => {
      const image = JSON.parse(e.metadata)?.image
      // Image would be classified if less than 40 characters so is classified as no img
      if (image == null || image.length < 40) return "no img"
      return resolveLink(image)
    })
    function imageFilterer(value) {
      return value != "no img"
    }
    const filteredNftImages = nftImages.filter(imageFilterer)
    setUserNFTs(filteredNftImages)

    const postsOptions = {
      chain: "mumbai",
      token_address: "0xf99F9f79BD478415807aF5a0b7C49f17E40981D5",
    }
    const postData = await account.getNFTsForContract(postsOptions)
    setPostNftData(postData)
  }

  useEffect(() => {
    updateData()
  }, [])

  return (
    <Context.Provider
      value={[
        userAddress,
        userShortenedAddress,
        data,
        updateData,
        userNFTs,
        userNftData,
        postNftData,
      ]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
