import React from "react"
import Image from "next/image"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import resolveLink from "../../helpers/resolveLink"
import { OpenseaButton } from "../Buttons"
import Link from "next/link"

const Post = ({
  header,
  text,
  image,
  tokenId,
  timestamp,
  posterAddress,
  posterData,
  isLast,
}) => {
  const longDate = new Date(timestamp * 1000)
  const date = longDate.toLocaleDateString()

  return (
    <div
      className={`bg-[#959cc484] ${
        !isLast && "border-gray-300 border-b"
      } p-5 flex`}
    >
      <div className='flex flex-col items-center'>
        <Link href={`/account/${posterAddress}`}>
          <div>
            <Image
              src={
                posterData
                  ? posterData.pfp
                    ? resolveLink(posterData.pfp)
                    : pfpPlaceholder
                  : pfpPlaceholder
              }
              alt={pfpPlaceholder}
              height={45}
              width={45}
              className='cursor-pointer'
              style={{ borderRadius: 45 / 2 }}
            />
          </div>
        </Link>
      </div>

      <div className='ml-4 w-full'>
        <span className='flex space-x-2'>
          <Link href={`/account/${posterAddress}`}>
            <h3 className='font-medium cursor-pointer hover:underline'>
              {posterData
                ? posterData.name == ""
                  ? "No name"
                  : posterData.name
                : "Loading..."}
            </h3>
          </Link>

          <Link href={`/account/${posterAddress}`}>
            <p className='text-gray-300 cursor-pointer'>
              {`${posterAddress.slice(0, 4)}...${posterAddress.slice(38)}`}
            </p>
          </Link>

          <p className='pl-5 text-gray-300' onClick={() => console.log(when)}>
            {date.slice(0, 5)}
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
