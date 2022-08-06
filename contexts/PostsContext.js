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

    const addresses = jsonData.result.map((e) => e.owner_of)
    accounts.addAccountData(addresses)

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    for (let index = 0; index < addresses.length; index++) {
      const address = addresses[index]

      let timeDelayed = 0
      while (
        accounts.objectAccountsData[address] == undefined &&
        timeDelayed < 1000
      ) {
        timeDelayed += 10
        await delay(timeDelayed)
      }
    }

    updatePostData(jsonData.result)
  }

  const updatePostData = (data) => {
    const postsWithUserdata = data.map((e) => {
      const address = e.owner_of
      const userdata = accounts.objectAccountsData[address]
      return { ...e, userdata: userdata }
    })
    setPostData(postsWithUserdata)
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
