import Image from "next/image"
import React, { useContext } from "react"
import UserContext from "../../contexts/UserContext"

const NFTs = () => {
  const [userAddress, a, b, c, userNFTs] = useContext(UserContext)

  return (
    <div>
      <h1>Your NFTs</h1>
      <button onClick={() => console.log(userNFTs)}>Log NFTs</button>
      {userNFTs &&
        userNFTs.map((e, i) => {
          return (
            <div key={i}>
              <Image src={e} height={200} width={200} />
            </div>
          )
        })}
      {/* <div className='flex items-center justify-center -mx-10 xl:-mx-14'>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'>
          {userNFTs &&
            userNFTs.map((e, i) => {
              return (
                <Image
                  src={e}
                  height={300}
                  width={300}
                  key={i}
                  style={{ borderRadius: 300 / 2 }}
                />
              )
            })}
        </div>
      </div> */}
    </div>
  )
}

export default NFTs
