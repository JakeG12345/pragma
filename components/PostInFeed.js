import Image from "next/image"
import React, { useContext } from "react"
import UserContext from "../contexts/UserContext"
import pfpPlaceholder from "../images/pfpPlaceholder.jpeg"
import resolveLink from '../helpers/resolveLink'

const PostInFeed = () => {
  const [userAddress, userShortenedAddress, userdata] = useContext(UserContext)

  return (
    <div className='h-60 flex items-center bg-[#00000045] border-b border-gray-500'>
      <div className='ml-7'>
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
    </div>
  )
}

export default PostInFeed
