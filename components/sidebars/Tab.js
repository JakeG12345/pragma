import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from 'next/image'

const Tab = ({ tabName, to, svgLocation }) => {
  const router = useRouter()

  return (
    <Link href={to}>
      <button
        className={`flex items-center w-12 h-12 lg:w-44 lg:py-2 rounded-full hover:bg-[#150f2e] ${
          ((router.asPath == to) || (router.asPath.slice(0,8) == to)) && "bg-[#22184c]"
        }`}
      >
        <div className='w-14 flex items-center justify-center'>
          <Image src={svgLocation} alt='' width={25} height={25} />
        </div>
        <h3 className='text-2xl font-semibold hidden lg:block'>{tabName}</h3>
      </button>
    </Link>
  )
}

export default Tab
