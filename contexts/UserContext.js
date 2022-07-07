import { createContext, useState, useEffect } from "react"
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis"
import abi from "../helpers/abi.json"

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const { Moralis } = useMoralis()
  const { native } = useMoralisWeb3Api()

  const [userAddress, setUserAddress] = useState("Loading...")
  const [userShortenedAddress, setUserShortenedAddress] = useState("Loading...")

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

    const options = {
      chain: "mumbai",
      address: "0xfeCe8d74537C3246A959c6fBc34f5317F303af0c",
      function_name: "getUserData",
      abi: abi,
      params: { userAddress: ethAddress },
    }
    fetch({ params: options })
  }

  useEffect(() => {
    updateUserdata()
  }, [])

  return (
    <UserContext.Provider
      value={[userAddress, userShortenedAddress, data, updateUserdata]}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
