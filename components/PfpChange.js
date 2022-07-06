import React from "react"

const PfpChange = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-5'>
      <h2 className='text-xl font-semibold'>Change Profile Picture</h2>
      <p className='mx-5 text-center'>
        We recommend selecting one of your NFTs as a profile picture however if
        you would not like this, you can select an image instead. In both cases,
        the image location will be stored on the blockchain.
      </p>
      <h3 className='text-lg font-medium pt-5 self-start ml-14'>NFTs</h3>
    </div>
  )
}

export default PfpChange
