import Image from "next/image"
import React, { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import resolveLink from "../../helpers/resolveLink"
import { IndigoButton } from "../Buttons"

const PostInFeed = () => {
  const [userAddress, userShortenedAddress, userdata] = useContext(UserContext)
  const [heading, setHeading] = useState("")
  const [text, setText] = useState("")

  return (
    <div className='bg-[#00000045] border-b border-gray-500'>
      <span className='py-5 space-x-10 flex'>
        <div className='ml-7 mt-5 h-20 w-20 rounded-full border-2 border-white'>
          <Image
            src={
              userdata
                ? userdata[1]
                  ? resolveLink(userdata[1])
                  : pfpPlaceholder
                : pfpPlaceholder
            }
            alt='profile picture'
            height={85}
            width={85}
            priority={true}
            style={{ borderRadius: 85 / 2 }}
          />
        </div>
        <div className='space-y-1 w-3/4'>
          <input
            className='px-2 h-8 rounded-md text-[#150f2e] outline-none w-full'
            value={heading}
            placeholder='Heading'
            onChange={(e) => setHeading(e.target.value)}
          />
          <textarea
            className='p-1 rounded-md text-[#150f2e] outline-none w-full resize-none'
            rows={3}
            value={text}
            placeholder='Text'
            onChange={(e) => {
              setText(e.target.value)
            }}
          />
          <div className='space-y-1'>
            <div className=''>
              {/* <Image src={pfpPlaceholder} layout='responsive' /> */}
            </div>
            <span className='flex items-center justify-between'>
              <IndigoButton text='Select Image' extraStyles='font-semibold' />
              <button className='px-5 py-1 rounded-full text-lg font-semibold bg-sky-500 hover:bg-sky-600'>
                Mint Post
              </button>
            </span>
          </div>
        </div>
      </span>
    </div>
  )
}

export default PostInFeed
