import React, { useContext, useEffect } from "react"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { userdataAddress } from "../../helpers/info"
import Post from "./Post"
import abi from "../../helpers/userdataAbi.json"
import ReactLoading from "react-loading"
import { PostsContext } from '../../contexts/PostsContext'
import { AccountsContext } from '../../contexts/AccountsContext'

const Feed = ({ posts }) => {
  const postContext = useContext(PostsContext)
  const accountContext = useContext(AccountsContext)

  return (
    <div>
      {postContext.postData ? (
        postContext.postData.map((nft, i) => {
          const metadata = JSON.parse(nft.metadata)
          const address = nft.owner_of
          console.log(accountContext.objectAccountData?.address)
          return (
            <Post
              header={metadata.name}
              text={metadata.description}
              image={metadata.image}
              tokenId={nft.token_id}
              posterData={accountContext.objectAccountData?.address}
              timestamp={nft.updated_at}
              posterAddress={address}
              isLast={i+1 == postContext.postData.length}
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
