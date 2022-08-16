import Image from "next/image"
import React from "react"

const CryptoPrice = ({ data }) => {
  return (
    <div className='m-3'>
      <span className='flex items-center justify-between'>
        <span className='flex items-center space-x-2'>
          <Image
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${data.id}.png`}
            width={27}
            height={27}
          />
          <h3 className='text-lg font-semibold'>{data.name}</h3>
          <h4 className='text-gray-300'>{data.symbol}</h4>
        </span>
        <h3>
          ${data.quote.USD.price.toFixed(2)}
        </h3>
      </span>
    </div>
  )
}

export default CryptoPrice
