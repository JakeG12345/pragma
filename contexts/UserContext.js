import { createContext, useState, useEffect } from "react"
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis"
import abi from "../helpers/userdataAbi.json"
import { userdataAddress } from "../helpers/info"

export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const { Moralis } = useMoralis()
  const { native } = useMoralisWeb3Api()

  const [userAddress, setUserAddress] = useState("Loading...")
  const [userShortenedAddress, setUserShortenedAddress] = useState("Loading...")
  const [userNFTs, setUserNFTs] = useState()
  const [userNftData, setUserNftData] = useState()

  const getUserdataOptions = {
    chain: "mumbai",
    address: userdataAddress,
    function_name: "getUserData",
    abi: abi,
  }

  const getUserdata = useMoralisWeb3ApiCall(native.runContractFunction, {
    ...getUserdataOptions,
  })

  const updateUserData = async () => {
    await Moralis.start({
      serverUrl: process.env.MORALIS_SERVER_URL,
      appId: process.env.MORALIS_APP_ID,
      logLevel: 'verbose',
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
      address: userdataAddress,
      function_name: "getUserData",
      abi: abi,
      params: { userAddress: ethAddress },
    }
    getUserdata.fetch({ params: userdataOptions })

    const userNftRes = await fetch(`/api/account/${ethAddress}`)
    const userNftData = await userNftRes.json()

    setUserNftData(userNftData.nftData)
    setUserNFTs(userNftData.nftImages)
  }

  useEffect(() => {
    updateUserData()
  }, [])


  return (
    <UserContext.Provider
      value={{
        address: userAddress,
        addressShort: userShortenedAddress,
        data: getUserdata.data,
        updateData: updateUserData,
        nftImages: userNFTs,
        nftData: userNftData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
