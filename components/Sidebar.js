import React, { useState, useEffect } from "react"
import Tab from "./Tab"
import abi from "../helpers/abi.json"
import {
  faHome,
  faUser,
  faGear,
  faSearch,
  faEllipsis,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import polygonLogo from "../images/polygonLogo.png"
import pfpPlaceholder from "../images/pfpPlaceholder.jpeg"
import Link from "next/link"
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis"

const Sidebar = () => {
  const { isAuthenticated, authenticate, logout, Moralis } = useMoralis()
  const { native } = useMoralisWeb3Api()

  const [isLogoutShowing, setIsLogoutShowing] = useState(false)
  const [shortenedAddress, setShortenedAddress] = useState("Loading...")
  const [userAddress, setUserAddress] = useState()

  const getUserDataOptions = {
    chain: "mumbai",
    address: "0x0ac48D1524e665aF98Ffa98605D292B6e7feEFCf",
    function_name: "getUserData",
    abi: abi,
    params: { userAddress: userAddress },
  }

  const startServer = async () => {
    await Moralis.start({
      serverUrl: "https://vitfkaqzlt7v.usemoralis.com:2053/server",
      appId: "xvr9Dhgt45W1cwe7Vjxb79OTNHGz6cHqH2cqvsUL",
    })
  }

  const updateData = () => {
    startServer()
    const user = Moralis.User.current()
    const ethAddress = user.attributes.ethAddress
    setShortenedAddress(`${ethAddress.slice(0, 4)}...${ethAddress.slice(38)}`)
    setUserAddress(ethAddress)
    const params = {
      chain: "mumbai",
      address: "0x0ac48D1524e665aF98Ffa98605D292B6e7feEFCf",
      function_name: "getUserData",
      abi: abi,
      params: { userAddress: ethAddress },
    }
    fetch({ params: params })
  }

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...getUserDataOptions }
  )

  useEffect(() => {
    if (isAuthenticated && userAddress == null) {
      updateData()
    }
  })

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: "Please sign to connect to Pragma",
      })
        .then(function (user) {
          console.log("logged in user:", user)
          setUserAddress(user.get("ethAddress"))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const logOut = async () => {
    console.log("logOut was called")
    await logout()
  }

  const post = () => {
    console.log("Post function was called")
  }

  return (
    <div className='flex flex-col items-center w-72'>
      <Link href='/'>
        <span className='flex space-x-3 my-12 cursor-pointer'>
          <h1 className='text-4xl font-bold'>Pragma</h1>
          <div>
            <Image
              src={polygonLogo}
              alt='polygon logo'
              height={40}
              width={45}
            />
          </div>
        </span>
      </Link>

      <nav className='space-y-3 -ml-16'>
        <Tab tabName='Home' icon={faHome} to='/' />
        <Tab tabName='Search' icon={faSearch} to='/search' />
        <Tab tabName='Profile' icon={faUser} to='/profile' />
        <Tab tabName='Settings' icon={faGear} to='/settings' />
      </nav>

      <div className='absolute bottom-20 space-y-5 flex flex-col items-center'>
        <button
          className='py-3 w-60 rounded-full text-xl font-semibold bg-[#22184c] hover:bg-[#150f2e]'
          onClick={isAuthenticated ? post : login}
        >
          {isAuthenticated ? "Mint Post" : "Connect Wallet"}
        </button>
        {isAuthenticated && (
          <span className='flex items-center space-x-3'>
            <Image src={pfpPlaceholder} alt='pfp' height={40} width={40} />
            <div>
              <h5 className='font-bold'>
                {data ? (data[0] === "" ? "No name" : data[0]) : "Loading..."}
              </h5>
              <p className='text-gray-300 text-sm'>{shortenedAddress}</p>
            </div>
            <div className='pl-2'>
              <button
                className='cursor-pointer'
                onClick={() => setIsLogoutShowing(!isLogoutShowing)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </div>
          </span>
        )}
      </div>
      {isAuthenticated && isLogoutShowing && (
        <span className='absolute bottom-5 bg-[#150f2e] w-48 h-12 rounded-xl flex items-center justify-center border-stone-100 border-2'>
          <button
            className='text-[#ff3c2e] text-lg font-semibold'
            onClick={() => {
              setIsLogoutShowing(false)
              logOut()
            }}
          >
            Disconnect
          </button>
          <button
            className='absolute right-4'
            onClick={() => setIsLogoutShowing(false)}
          >
            <FontAwesomeIcon icon={faXmark} size='xl' />
          </button>
        </span>
      )}
    </div>
  )
}

export default Sidebar