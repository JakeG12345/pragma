import React, { useState } from "react"
import Image from "next/image"
import resolveLink from "../../helpers/resolveLink"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import { IndigoButton, OpenseaButton } from "../Buttons"
import Link from "next/link"

const Main = ({ userdata, address, isProfile }) => {
  const [isMouseOverAddress, setIsMouseOverAddress] = useState(false)
  const shortAddress = `${address.slice(0, 4)}...${address.slice(38)}`

  return (
    <span className='flex justify-between items-center'>
      <div className='-mt-24 ml-10 z-10'>
        <div className='border-white border-2 rounded-full w-40 h-40'>
          <Image
            src={
              userdata
                ? userdata[1]
                  ? resolveLink(userdata[1])
                  : pfpPlaceholder
                : pfpPlaceholder
            }
            alt='pfp'
            height={175}
            width={175}
            priority={true}
            style={{ borderRadius: 175 / 2 }}
          />
        </div>
        <div className='ml-3'>
          <h1 className='text-xl font-semibold mt-3'>
            {userdata && userdata[0]}
          </h1>
          <a
            href={`https://mumbai.polygonscan.com/address/${address}`}
            target='_blank'
            rel='noreferrer'
          >
            <p
              className='text-gray-300 cursor-pointer'
              onMouseEnter={() => setIsMouseOverAddress(true)}
              onMouseLeave={() => setIsMouseOverAddress(false)}
            >
              {isMouseOverAddress ? address : shortAddress}
            </p>
          </a>
        </div>
        <span className='flex ml-3 mt-5 space-x-10'>
          <span className='flex text-sm hover:underline cursor-pointer'>
            <h4 className='font-semibold cursor-pointer'>
              {userdata && userdata[5].length}
            </h4>
            &nbsp;
            <h5 className='text-gray-300'>Following</h5>
          </span>
          <span className='flex text-sm hover:underline cursor-pointer'>
            <h4 className='font-semibold cursor-pointer'>
              {userdata && userdata[4]}
            </h4>
            &nbsp;
            <h5 className='text-gray-300'>Followers</h5>
          </span>
        </span>
      </div>
      <span className='-mt-12 flex items-center'>
        <a
          href={`https://testnets.opensea.io/${address}`}
          target='_blank'
          rel='noreferrer'
        >
          <OpenseaButton />
        </a>
        {isProfile ? (
          <Link href='/settings' passHref>
            <IndigoButton text='Edit Profile' extraStyles='mr-12 font-bold' />
          </Link>
        ) : (
          <IndigoButton text='Follow' extraStyles='mr-12 font-bold px-7' />
        )}
      </span>
    </span>
  )
}

export default Main
