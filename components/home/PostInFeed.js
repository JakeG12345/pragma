import Image from "next/image"
import React, { useContext, useState } from "react"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import resolveLink from "../../helpers/resolveLink"
import { IndigoButton } from "../Buttons"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import abi from "../../helpers/postsAbi.json"
import useNotification from "../notifications/useNotification"
import Context from '../../contexts/Context'

const PostInFeed = () => {
  const { enableWeb3 } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const [userAddress, userShortenedAddress, userdata] = useContext(Context)
  const dispatch = useNotification()
  const [heading, setHeading] = useState("")
  const [text, setText] = useState("")

  const handleNewNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
    })
  }

  const post = async () => {
    const options = {
      contractAddress: "0xf99F9f79BD478415807aF5a0b7C49f17E40981D5",
      functionName: "mintPost",
      abi: abi,
      params: { title: heading, description: text, image: "No img" },
    }

    await enableWeb3()

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleNewNotification(
          "SUCCESS",
          "Post should be minted as NFT onto blockchain shorty"
        )
      },
      onError: (error) => {
        handleNewNotification("ERROR", error.message)
      },
    })
  }

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
              <button
                className='px-5 py-1 rounded-full text-lg font-semibold bg-sky-500 hover:bg-sky-600'
                onClick={post}
              >
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
