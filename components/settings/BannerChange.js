import Image from "next/image"
import React, { useRef, useState } from "react"
import { IndigoButton, SaveButton } from "../Buttons"
import useNotification from "../notifications/useNotification"
import abi from "../../helpers/userdataAbi.json"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { userdataAddress } from '../../helpers/info'

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
    if (data.type !== "image/png" && data.type !== "image/jpeg") {
      handleNewNotification("ERROR", "Banner must be a png or jpeg image")
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
    } else {
      handleNewNotification(
        "ERROR",
        "Something went wrong while uploading file to IPFS. Please try again later."
      )
    }
  }

  const changeBanner = async (bannerLink) => {
    await enableWeb3()

    const ipfsBannerLink = bannerLink.replace(
      "https://ipfs.moralis.io:2053/ipfs/",
      ""
    )

    const options = {
      contractAddress: userdataAddress,
      functionName: "changeBanner",
      abi: abi,
      params: { newBanner: ipfsBannerLink },
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleNewNotification(
          "SUCCESS",
          "Banner should update shortly. Check MetaMask to view transaction."
        )
      },
      onError: (error) => {
        handleNewNotification("ERROR", error.message)
      },
    })
  }

  return (
    <div className='space-y-3'>
      <span className='flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between'>
        <h2 className='text-xl font-semibold'>Change Banner</h2>
        <div className='flex justify-between lg:'>
          <div>
            <input
              type='file'
              name='banner'
              ref={inputFile}
              onChange={changeHandler}
              className='hidden'
            />
          </div>
          <IndigoButton
            onClick={selectNewBanner}
            extraStyles='absolute font-medium lg:static lg:mr-8 xl:mr-20'
            text='Select Image'
          />
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
