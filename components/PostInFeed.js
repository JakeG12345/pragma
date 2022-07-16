import Image from "next/image"
import React, { useContext, useState } from "react"
import UserContext from "../contexts/UserContext"
import pfpPlaceholder from "../images/pfpPlaceholder.jpeg"
import resolveLink from "../helpers/resolveLink"

const PostInFeed = () => {
  const [userAddress, userShortenedAddress, userdata] = useContext(UserContext)
  const [heading, setHeading] = useState()
  const [text, setText] = useState()

  return (
    <div className='bg-[#00000045] border-b border-gray-500'>
      <span className='h-60 space-x-10 flex items-center'>
        <div className='ml-7 h-20 w-20 rounded-full border-2 border-white'>
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
        <div className='space-y-1 w-96'>
          <input
            className='px-2 h-8 rounded-md text-[#150f2e] outline-none'
            value={heading}
            placeholder='Heading'
            onChange={(e) => setHeading(e.target.value)}
          />
          <textarea
            className='p-1 rounded-md text-[#150f2e] outline-none h-12'
            value={text}
            placeholder='Text'
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </span>
    </div>
  )
}

export default PostInFeed
