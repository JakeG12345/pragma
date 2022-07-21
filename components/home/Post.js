import React, { useEffect } from "react"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import abi from "../../helpers/userdataAbi.json"
import Image from "next/image"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import resolveLink from "../../helpers/resolveLink"
import { OpenseaButton } from "../Buttons"
import { userdataAddress } from '../../helpers/info'

const Post = ({ header, text, image, tokenId, posterAddress }) => {
  const { native } = useMoralisWeb3Api()

  const userdataOptions = {
    chain: "mumbai",
    address: userdataAddress,
    function_name: "getUserData",
    abi: abi,
    params: { userAddress: posterAddress },
  }

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...userdataOptions }
  )

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    const fetchData = async () => {
      await delay(500)
      fetch({ params: userdataOptions })
    }

    fetchData()
  }, [])

  return (
    <div className='bg-[#959cc484] border-b p-5 flex'>
      <div className='flex flex-col items-center'>
        <Image
          src={
            data
              ? data[1]
                ? resolveLink(data[1])
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
            {data ? (data[0] === "" ? "No name" : data[0]) : "Loading..."}
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
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Post
