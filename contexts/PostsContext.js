import { createContext, useContext, useEffect, useState } from "react"
import { postsAddress } from "../helpers/info"
import { AccountsContext } from "./AccountsContext"

export const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
  const accounts = useContext(AccountsContext)
  const [postData, setPostData] = useState()

  const getPostNFTs = async () => {
    const res = await fetch(
      `https://deep-index.moralis.io/api/v2/nft/${postsAddress}/owners?chain=mumbai&format=decimal`,
      {
        method: "GET",
        headers: {
          accept: "applications/json",
          "X-API-Key": process.env.MORALIS_API_KEY,
        },
      }
    )
    const jsonData = await res.json()
    setPostData(jsonData.result)

    console.log(jsonData.result)

    if (postData) {
      const addresses = postData.map((e) => e.owner_of)
      console.log(addresses)
      accounts.addAccountData(addresses)
    }
  }

  useEffect(() => {
    getPostNFTs()
  }, [])

  return (
    <PostsContext.Provider value={{ getPostNFTs, postData }}>
      {children}
    </PostsContext.Provider>
  )
}
