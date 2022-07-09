import React, { useContext, useState } from "react"
import { useMoralis } from "react-moralis"
import NotAuthenticated from "../components/NotAuthenticated"
import bannerPlaceholder from "../images/bannerPlaceholder.png"
import pfpPlaceholder from "../images/pfpPlaceholder.jpeg"
import Image from "next/image"
import { UserContext } from "../contexts/UserContext"
import resolveLink from "../helpers/resolveLink"
import Link from "next/link"
import About from "../components/profile/About"
import NFTs from '../components/profile/NFTs'

const Profile = () => {
  const { isAuthenticated } = useMoralis()
  const [userAddress, userShortenedAddress, userdata] = useContext(UserContext)
  const [isMouseOverAddress, setIsMouseOverAddress] = useState(false)
  const [selectedTab, setSelectedTab] = useState(1)

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className='bg-[#0000002e]'>
            <Image
              src={
                userdata
                  ? userdata[2]
                    ? resolveLink(userdata[2])
                    : bannerPlaceholder
                  : bannerPlaceholder
              }
              alt='banner'
              width={1000}
              height={250}
            />
            <span className='flex justify-between items-center'>
              <div className='-mt-24 ml-10 z-10'>
                <Image
                  src={
                    userdata
                      ? userdata[1]
                        ? resolveLink(userdata[1])
                        : pfpPlaceholder
                      : pfpPlaceholder
                  }
                  alt='profile picture'
                  height={175}
                  width={175}
                  priority={true}
                  style={{ borderRadius: 175 / 2 }}
                />
                <div className='ml-3'>
                  <h1 className='text-xl font-semibold mt-3'>
                    {userdata && userdata[0]}
                  </h1>
                  <a
                    href={`https://mumbai.polygonscan.com/address/${userAddress}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <p
                      className='text-gray-300 cursor-pointer'
                      onMouseEnter={() => setIsMouseOverAddress(true)}
                      onMouseLeave={() => setIsMouseOverAddress(false)}
                    >
                      {isMouseOverAddress ? userAddress : userShortenedAddress}
                    </p>
                  </a>
                </div>
                <span className='flex ml-3 mt-5 space-x-10'>
                  <span className='flex text-sm hover:underline cursor-pointer'>
                    <h4 className='font-semibold cursor-pointer'>73</h4>
                    &nbsp;
                    <h5 className='text-gray-300'>Following</h5>
                  </span>
                  <span className='flex text-sm hover:underline cursor-pointer'>
                    <h4 className='font-semibold cursor-pointer'>73</h4>
                    &nbsp;
                    <h5 className='text-gray-300'>Followers</h5>
                  </span>
                </span>
              </div>
              <Link href='/settings'>
                <button className='mr-12 -mt-12 py-1 px-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-lg font-bold'>
                  Edit profile
                </button>
              </Link>
            </span>
            <div className='flex justify-center border-b border-gray-500'>
              <span className='flex lg:w-1/2 justify-around mt-5 font-semibold'>
              <div
                  className={`${
                    selectedTab == 1 && "border-b-4 border-sky-500"
                  } cursor-pointer w-14 text-center`}
                  onClick={() => setSelectedTab(1)}
                >
                  Posts
                </div>
                <div
                  className={`${
                    selectedTab == 2 && "border-b-4 border-sky-500"
                  } cursor-pointer w-14 text-center`}
                  onClick={() => setSelectedTab(2)}
                >
                  About
                </div>
                <div
                  className={`${
                    selectedTab == 3 && "border-b-4 border-sky-500"
                  } cursor-pointer w-14 text-center`}
                  onClick={() => setSelectedTab(3)}
                >
                  NFTs
                </div>
              </span>
            </div>
          </div>
          <div>
            {selectedTab == 1 && <div>Posts</div>}
            {selectedTab == 2 && <About />}
            {selectedTab == 3 && <NFTs />}
          </div>
        </div>
      ) : (
        <NotAuthenticated pageName='profile' />
      )}
    </div>
  )
}

export default Profile
