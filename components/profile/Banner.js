import React from "react"
import Image from "next/image"
import resolveLink from "../../helpers/resolveLink"
import bannerPlaceholder from "../../images/bannerPlaceholder.png"

const Banner = ({ userdata }) => {
  return (
    <div className='border-b border-gray-500'>
      <Image
        src={
          userdata
            ? userdata[2]
              ? resolveLink(userdata[2])
              : bannerPlaceholder
            : bannerPlaceholder
        }
        alt='banner'
        layout='responsive'
        width={900}
        priority
        height={250}
      />
    </div>
  )
}

export default Banner
