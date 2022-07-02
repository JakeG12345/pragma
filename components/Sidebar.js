import React from "react"
import Tab from "./Tab"
import { faHome, faUser, faGear } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import polygonLogo from "../images/polygonLogo.png"
import Link from "next/link"

const Sidebar = () => {
  return (
    <div className='bg-gradient-to-b from-sky-500 to-indigo-500 h-screen w-80 flex flex-col items-center'>
      <Link href='/'>
        <span className='flex space-x-3 my-12 cursor-pointer'>
          <h1 className='text-4xl font-bold'>Pragma</h1>
          <div>
            <Image
              src={polygonLogo}
              alt='polygon logo'
              height={40}
              width={45}
            />
          </div>
        </span>
      </Link>

      <nav className='space-y-3 -ml-16'>
        <Tab tabName='Home' icon={faHome} to='/' />
        <Tab tabName='Profile' icon={faUser} to='/profile' />
        <Tab tabName='Settings' icon={faGear} to='/settings' />
      </nav>
      <div className='absolute bottom-32 space-y-4 flex flex-col items-center'>
        <button className=' py-3 w-64 rounded-full text-xl font-semibold bg-[#22184c]'>
          Mint Post
        </button>
        <p>0x3Eb...23Fe</p>
      </div>
    </div>
  )
}

export default Sidebar
