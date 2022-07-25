import Image from "next/image"

const NFTs = ({ userdata, isProfile, nftImages }) => {
  return (
    <div className='m-14 mt-5 mx-5 space-y-3'>
      <h1 className='ml-5 text-2xl font-bold'>
        {isProfile ? "Your" : userdata[0] ? `${userdata[0]}'s` : "No name's"}{" "}
        NFT Images
      </h1>
      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-2 gap-5'>
          {nftImages ? (
            nftImages.map((e, i) => {
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
            })
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NFTs
