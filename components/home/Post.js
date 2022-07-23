import React, { useEffect } from "react"
import Image from "next/image"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import resolveLink from "../../helpers/resolveLink"
import { OpenseaButton } from "../Buttons"

const Post = ({ header, text, image, tokenId, posterAddress, posterData }) => {
  useEffect(() => {
    console.log(resolveLink(image))
  }, [])

  return (
    <div className='bg-[#959cc484] border-gray-300 border-b p-5 flex'>
      <div className='flex flex-col items-center'>
        <Image
          src={
            posterData
              ? posterData[1]
                ? resolveLink(posterData[1])
                : pfpPlaceholder
              : pfpPlaceholder
          }
          alt={pfpPlaceholder}
          height={45}
          width={45}
          style={{ borderRadius: 45 / 2 }}
        />
      </div>

      <div className='ml-4 w-full'>
        <span className='flex space-x-2'>
          <h3 className='font-medium'>
            {posterData
              ? posterData[0] === ""
                ? "No name"
                : posterData[0]
              : "Loading..."}
          </h3>
          <p className='text-gray-300'>
            {`${posterAddress.slice(0, 4)}...${posterAddress.slice(38)}`}
          </p>
        </span>
        <span className='flex justify-between items-center mb-2'>
          <h2 className='font-semibold text-lg'>{header}</h2>
          <a
            href={`https://testnets.opensea.io/assets/mumbai/0xf99f9f79bd478415807af5a0b7c49f17e40981d5/${tokenId}`}
            target='_blank'
            rel='noreferrer'
          >
            <OpenseaButton />
          </a>
        </span>
        <p className='mb-2'>{text}</p>
        {image != "ipfs://No img" && (
          <div className='w-3/4'>
            <img
              src={resolveLink(image)}
              alt='Post Image'
              style={{ maxHeight: 500 }}
              className='rounded-lg'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
