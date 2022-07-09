import Image from "next/image"
import React, { useContext } from "react"
import UserContext from "../../contexts/UserContext"

const NFTs = () => {
  const [userAddress, a, b, c, userNFTs] = useContext(UserContext)

  return (
    <div className='m-14 mt-5 mx-5 space-y-3'>
      <h1 className='ml-5 text-2xl font-bold'>Your NFTs</h1>
      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-2 gap-5'>
          {userNFTs &&
            userNFTs.map((e, i) => {
              return (
                <div key={i}>
                  <Image src={e} height={300} width={300} />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default NFTs
