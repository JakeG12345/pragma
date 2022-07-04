import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"

const Tab = ({ tabName, icon, to }) => {
  const router = useRouter()

  return (
    <Link href={to}>
      <button
        className={`flex items-center w-44 py-2 rounded-full hover:bg-[#150f2e] ${
          router.asPath == to && "bg-[#22184c]"
        }`}
      >
        <div className='w-14'>
          <FontAwesomeIcon icon={icon} size='xl' />
        </div>
        <h3 className='text-2xl font-semibold'>{tabName}</h3>
      </button>
    </Link>
  )
}

export default Tab
