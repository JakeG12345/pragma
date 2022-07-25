import Image from "next/image"
import ReactLoading from "react-loading"

const NFTs = ({ userdata, isProfile, nftImages }) => {
  return (
    <div className='m-14 mt-5 mx-5 space-y-3'>
      <h1 className='ml-5 text-2xl font-bold'>
        {isProfile ? "Your" : userdata[0] ? `${userdata[0]}'s` : "No name's"}{" "}
        NFT Images
      </h1>
      <div>
        {nftImages ? (
          nftImages.length == 0 ? (
            <h3 className='text-lg ml-5'>
              {isProfile
                ? "It appears you don't have any NFT Images in your wallet"
                : "The user does not have any NFT Images"}
            </h3>
          ) : (
            <div className='flex items-center justify-center'>
              <div className='grid grid-cols-2 gap-5'>
                {nftImages.map((e, i) => {
                  return (
                    <div key={i}>
                      <Image
                        src={e}
                        alt='Image could not be fetched from ipfs gateway in time'
                        height={300}
                        width={300}
                        className='rounded-2xl'
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        ) : (
          <div className='flex items-center justify-center mt-10'>
            <ReactLoading type='bubbles' width={200} />
          </div>
        )}
      </div>
    </div>
  )
}

export default NFTs
