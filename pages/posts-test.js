import React, { useContext } from "react"
import { AccountsContext } from '../contexts/AccountsContext'
import { PostsContext } from "../contexts/PostsContext"

const Test = () => {
  const posts = useContext(PostsContext)
  const accounts = useContext(AccountsContext)

  return (
    <div>
      <div onClick={posts.getPostNFTs}>PostNFTs</div>
      <div onClick={() => console.log(accounts.objectAccountsData)}>Test</div>
    </div>
  )
}

export default Test
