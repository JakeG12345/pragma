import React from "react"

const CryptoPrice = ({ data }) => {
  return (
    <div className='m-2'>
      <h1 className='z-40 text-sm'>{data.name}</h1>
      {/* <img src={article.urlToImage} alt='' className='z-30' /> */}
    </div>
  )
}

export default CryptoPrice
