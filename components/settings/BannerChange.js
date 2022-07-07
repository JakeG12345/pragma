import Image from "next/image"
import React, { useRef, useState } from "react"
import { SaveButton } from "../Buttons"
import useNotification from "../notifications/useNotification"
import abi from "../../helpers/abi.json"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"

const BannerChange = () => {
  const { Moralis, enableWeb3 } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const dispatch = useNotification()

  const [selectedFile, setSelectedFile] = useState()
  const [theFile, setTheFile] = useState()
  const inputFile = useRef(null)

  const handleNewNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
    })
  }

  const selectNewBanner = () => {
    inputFile.current.click()
  }

  const changeHandler = (event) => {
    const img = event.target.files[0]
    if (img == null) return
    setTheFile(img)
    setSelectedFile(URL.createObjectURL(img))
  }

  const uploadBannerToIPFS = async () => {
    if (!theFile) {
      handleNewNotification("ERROR", "No banner image is selected")
      return
    }
    const data = theFile
    if (data.type !== "image/png") {
      handleNewNotification("ERROR", "Banner must be a png image")
      return
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
      changeBanner(file.ipfs())
    }
    else {
      handleNewNotification(
        "ERROR",
        "Something went wrong while uploading file to IPFS. Please try again later."
      )
    }
  }

  const changeBanner = async (banner) => {
    await enableWeb3()

    const options = {
      contractAddress: "0x8e156D34935d82466aF96E5b6B09DA9207004730",
      functionName: "changeBanner",
      abi: abi,
      params: { newBanner: banner },
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleNewNotification(
          "SUCCESS",
          "Name should update shortly. Check MetaMask to view transaction."
        )
      },
      onError: (error) => {
        handleNewNotification("ERROR", error.message)
      },
    })
  }

  return (
    <div className='space-y-3'>
      <span className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Change Banner Image</h2>
        <div>
          <input
            type='file'
            name='banner'
            ref={inputFile}
            onChange={changeHandler}
            className='hidden'
          />
        </div>
        <button
          className='text-lg font-medium mr-20 py-1 px-4 rounded-full bg-indigo-500'
          onClick={selectNewBanner}
        >
          Select Image
        </button>
        <div className='mr-5'>
          <SaveButton onClick={uploadBannerToIPFS} />
        </div>
      </span>
      {selectedFile && (
        <div className='mt-5 w-full cursor-pointer'>
          <Image
            src={selectedFile}
            alt='banner'
            width={1000}
            height={300}
            onClick={selectNewBanner}
          />
        </div>
      )}
    </div>
  )
}

export default BannerChange
