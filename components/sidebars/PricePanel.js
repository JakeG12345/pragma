import React, { useState } from "react"
import ReactLoading from "react-loading"
import CryptoPrice from "./CryptoPrice"

const PricePanel = () => {
  const [topTen, setTopTen] = useState()

  useState(() => {
    const getData = async () => {
      const res = await fetch("/api/getTopTen")
      const data = await res.json()
      console.log(data.data.data)
      setTopTen(data.data.data)
    }

    getData()
  }, [])

  if (topTen)
    return (
      <div className='sticky hidden md:block top-0 bg-gradient-to-b h-screen from-sky-500 to-indigo-500'>
        <div className='w-72 xl:w-80'>
          <h1 className='text-xl text-center font-bold mt-5 mb-2'>
            Top Crypto&apos;s
          </h1>
          <div>
            {topTen.map((e) => {
              return <CryptoPrice key={e.id} data={e} />
            })}
          </div>
        </div>
      </div>
    )
  else
    return (
      <div className='sticky hidden md:block top-0 bg-gradient-to-b h-screen from-sky-500 to-indigo-500'>
        <div className='w-72 xl:w-80 flex items-center justify-center'>
          <ReactLoading type='bubbles' width={200} />
        </div>
      </div>
    )
}

export default PricePanel
