import React, { useEffect, useState, useContext, useRef } from "react"
import UserContext from "../../contexts/UserContext"
import {
  useMoralisWeb3Api,
  useWeb3ExecuteFunction,
  useMoralis,
} from "react-moralis"
import Image from "next/image"
import { SaveButton } from "../Buttons"
import useNotification from "../notifications/useNotification"
import resolveLink from "../../helpers/resolveLink"
import abi from "../../helpers/abi.json"

const PfpChange = () => {
  const Web3Api = useMoralisWeb3Api()
  const { enableWeb3, Moralis } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const [userAddress] = useContext(UserContext)
  const dispatch = useNotification()

  const [mumbaiNFTImages, setMumbaiNFTImages] = useState()
  const [selectedPfp, setSelectedPfp] = useState()
  const [selectedPfpIpfs, setSelectedPfpIpfs] = useState()

  const [selectedFile, setSelectedFile] = useState()
  const [theFile, setTheFile] = useState()
  const inputFile = useRef(null)

  const handleNewNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
    })
  }

  const getNFTs = async () => {
    const options = {
      chain: "mumbai",
      address: userAddress,
    }
    const nftData = await Web3Api.account.getNFTs(options)
    const nftImages = nftData.result.map((e) => {
      const image = JSON.parse(e.metadata)?.image
      if (image == null) return "no img"
      return resolveLink(image)
    })
    function imageFilterer(value) {
      return value != "no img"
    }
    const filteredNftImages = nftImages.filter(imageFilterer)
    setMumbaiNFTImages(filteredNftImages)
  }

  useEffect(() => {
    if (userAddress != "Loading...") getNFTs()
  }, [userAddress])

  const selectNewPfp = () => {
    inputFile.current.click()
  }

  const fileChangeHandler = (event) => {
    const img = event.target.files[0]
    if (img == null) return
    setTheFile(img)
    setSelectedFile(URL.createObjectURL(img))
  }

  const confirmSelectedNftPfp = () => {
    if (selectedPfp == undefined) {
      handleNewNotification("ERROR", "No NFT has been selected")
      return
    }
    if (
      !selectedPfpIpfs ||
      !selectedPfpIpfs.includes("https://gateway.ipfs.io/ipfs/")
    ) {
      handleNewNotification(
        "ERROR",
        "NFT ipfs image link does not start with https://gateway.ipfs.io/ipfs/"
      )
      return
    }
    const shortenedIpfs = selectedPfpIpfs.replace(
      "https://gateway.ipfs.io/ipfs/",
      ""
    )

    changePfp(shortenedIpfs)
  }

  const confirmSelectedPhotoImg = async () => {
    if (!theFile) {
      handleNewNotification("ERROR", "No profile picture is selected")
      return
    }
    const data = theFile
    if (data.type !== "image/png" && data.type !== "image/jpeg") {
      handleNewNotification(
        "ERROR",
        "Profile picture must be a png or jpeg image"
      )
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
      const shortenedIpfs = file
        .ipfs()
        .replace("https://ipfs.moralis.io:2053/ipfs/", "")
      console.log(shortenedIpfs)
      // changePfp(shortenedIpfs)
    } else {
      handleNewNotification(
        "ERROR",
        "Something went wrong while uploading file to IPFS. Please try again later."
      )
    }
  }

  const changePfp = async (newPfpIpfs) => {
    const options = {
      contractAddress: "0xfeCe8d74537C3246A959c6fBc34f5317F303af0c",
      functionName: "changePfp",
      abi: abi,
      params: { newPfp: newPfpIpfs },
    }

    await enableWeb3()

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleNewNotification(
          "SUCCESS",
          "Profile picture should update shortly. Check MetaMask to view transaction."
        )
      },
      onError: (error) => {
        handleNewNotification("ERROR", error.message)
      },
    })
  }

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-semibold'>Change Profile Picture</h2>
      <p className='text-sm'>
        We suggest choosing an NFT as your profile picture, however any image
        stored on IPFS will work so we have an option where you can select an
        image and we will upload it to IPFS and then put the IPFS link with your
        account details on the blockchain.
      </p>
      <span className='flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between'>
        <h2 className='text-lg font-medium'>Select Image</h2>
        <div className='flex justify-between lg:'>
          <div>
            <input
              type='file'
              name='pfp'
              ref={inputFile}
              onChange={fileChangeHandler}
              className='hidden'
            />
          </div>
          <button
            className='text-lg font-medium absolute lg:static lg:mr-8 xl:mr-20 py-1 px-4 rounded-full bg-indigo-500 hover:bg-indigo-600'
            onClick={fileChangeHandler}
          >
            Select Image
          </button>
          <SaveButton onClick={confirmSelectedPhotoImg} />
        </div>
      </span>
      {selectedFile && (
        <div className='mt-5 w-full flex items-center justify-center cursor-pointer'>
          <Image
            src={selectedFile}
            alt='pfp'
            height={300}
            width={300}
            style={{ borderRadius: 300 / 2 }}
            onClick={selectNewPfp}
          />
        </div>
      )}
      <span className='flex justify-between items-center'>
        <h3 className='text-lg font-medium'>Your NFTs</h3>
        <SaveButton onClick={confirmSelectedNftPfp} />
      </span>
      <div className='flex items-center justify-center -mx-10 xl:-mx-14'>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'>
          {mumbaiNFTImages &&
            mumbaiNFTImages.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`h-56 w-56 rounded-full hover:border-indigo-500 hover:border-4 ${
                    i == selectedPfp && "border-indigo-600 border-4"
                  }`}
                  onClick={() => {
                    setSelectedPfp(i)
                    setSelectedPfpIpfs(e)
                  }}
                >
                  <Image
                    src={e}
                    height={300}
                    width={300}
                    style={{ borderRadius: 300 / 2 }}
                  />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default PfpChange
