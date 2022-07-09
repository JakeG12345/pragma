import { createContext, useState, useEffect } from "react"
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis"
import abi from "../helpers/abi.json"
import resolveLink from "../helpers/resolveLink"

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const { Moralis } = useMoralis()
  const { native, account } = useMoralisWeb3Api()

  const [userAddress, setUserAddress] = useState("Loading...")
  const [userShortenedAddress, setUserShortenedAddress] = useState("Loading...")
  const [userNFTs, setUserNFTs] = useState()

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

  const updateUserdata = async () => {
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
    const nftImages = nftData.result.map((e) => {
      const image = JSON.parse(e.metadata)?.image
      if (image == null) return "no img"
      return resolveLink(image)
    })
    function imageFilterer(value) {
      return value != "no img"
    }
    const filteredNftImages = nftImages.filter(imageFilterer)
    setUserNFTs(filteredNftImages)
  }

  useEffect(() => {
    updateUserdata()
  }, [])

  return (
    <UserContext.Provider
      value={[
        userAddress,
        userShortenedAddress,
        data,
        updateUserdata,
        userNFTs,
      ]}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
