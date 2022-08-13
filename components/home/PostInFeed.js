import Image from "next/image"
import React, { useContext, useState, useRef } from "react"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import resolveLink from "../../helpers/resolveLink"
import { IndigoButton } from "../Buttons"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import abi from "../../helpers/postsAbi.json"
import useNotification from "../notifications/useNotification"
import { postsAddress } from "../../helpers/info"
import UserContext from '../../contexts/UserContext'

const PostInFeed = () => {
  const { enableWeb3, Moralis } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const user = useContext(UserContext)
  const dispatch = useNotification()
  const [heading, setHeading] = useState("")
  const [text, setText] = useState("")
  const [selectedFile, setSelectedFile] = useState()
  const [theFile, setTheFile] = useState()
  const inputFile = useRef(null)

  const handleNewNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
    })
  }

  const imageChangeHandler = (event) => {
    const img = event.target.files[0]
    if (img == null) return
    setTheFile(img)
    setSelectedFile(URL.createObjectURL(img))
  }

  const selectNewImage = () => {
    inputFile.current.click()
  }

  const uploadImageToIPFS = async () => {
    if (!theFile) return "No img"

    const data = theFile
    if (data.type !== "image/png" && data.type !== "image/jpeg") {
      handleNewNotification("ERROR", "Image must be a png or jpeg image")
      return "invalid image"
    }
    handleNewNotification(
      "SUCCESS",
      "Image will upload to IPFS shortly and then a MetaMask transaction will pop up. Please do not reload page"
    )
    const file = new Moralis.File(data.name, data)
    await file.saveIPFS()
    if (file.ipfs()) {
      handleNewNotification(
        "SUCCESS",
        "Image has successfully uploaded to IPFS"
      )
      return file.ipfs().replace("https://ipfs.moralis.io:2053/ipfs/", "")
    } else {
      handleNewNotification(
        "ERROR",
        "Something went wrong while uploading file to IPFS. Please try again later."
      )
      return "invalid image"
    }
  }

  const post = async () => {
    if (heading.length == 0)
      return handleNewNotification(
        "ERROR",
        "Heading is required for all NFT posts"
      )
    if (heading.length > 30)
      return handleNewNotification(
        "ERROR",
        "Heading must not be more than 30 characters"
      )
    if (text.length == 0)
      return handleNewNotification(
        "ERROR",
        "Text is required for all NFT posts"
      )
    if (text.length > 100)
      return handleNewNotification(
        "ERROR",
        "Text must not be more than 100 characters"
      )

    const image = await uploadImageToIPFS()
    if (image == "invalid image") return

    await enableWeb3()

    const options = {
      contractAddress: postsAddress,
      functionName: "mintPost",
      abi: abi,
      params: { title: heading, description: text, image: image },
    }

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
    <div className='bg-[#00000045] border-b border-white'>
      <span className='py-5 flex pr-5 md:pr-10 lg:pr-20 xl:pr-28'>
        <div className='flex justify-center w-44'>
          <div className='mt-5 h-20 w-20 rounded-full border-2 border-white'>
            <Image
              src={
                user.data
                  ? user.data[1]
                    ? resolveLink(user.data[1])
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

        <div className='space-y-1 w-full'>
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
          <div className='space-y-2'>
            {selectedFile && (
              <img
                src={selectedFile}
                onClick={selectNewImage}
                alt='Selected Image'
                style={{ maxHeight: 500 }}
                className='w-full rounded-lg'
              />
            )}
            <span className='flex items-center justify-between'>
              <IndigoButton
                text='Select Image'
                onClick={selectNewImage}
                extraStyles='font-semibold'
              />
              <div>
                <input
                  type='file'
                  name='banner'
                  ref={inputFile}
                  onChange={imageChangeHandler}
                  className='hidden'
                />
              </div>
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
