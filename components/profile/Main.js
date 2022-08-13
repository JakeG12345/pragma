import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import resolveLink from "../../helpers/resolveLink"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import { IndigoButton, OpenseaButton } from "../Buttons"
import Link from "next/link"
import UserContext from "../../contexts/UserContext"
import { useMoralis } from "react-moralis"
import FollowButton from "./FollowButton"
import UnfollowButton from "./UnfollowButton"
import { useRouter } from "next/router"

const Main = ({ userdata, address, isProfile }) => {
  const [isMouseOverAddress, setIsMouseOverAddress] = useState(false)
  const [isFollowingAccount, setIsFollowingAccount] = useState(null)
  const currentUser = useContext(UserContext)
  const router = useRouter()
  const shortAddress = `${address.slice(0, 4)}...${address.slice(38)}`
  const { isAuthenticated, authenticate } = useMoralis()

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: "Please sign to connect to Pragma",
      })
        .then(function (user) {
          console.log("logged in user:", user)
          currentUser.updateData()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const checkIsFollowingAccount = () => {
    if (userdata == null || userdata.followers.length == 0) {
      setIsFollowingAccount(false)
    } else {
      userdata.followers.map((follower, i) => {
        if (currentUser.address.toLowerCase() === follower.toLowerCase()) {
          setIsFollowingAccount(true)
        } else if (i + 1 == userdata.following.length) {
          setIsFollowingAccount(false)
        }
      })
    }
  }

  useEffect(() => {
    checkIsFollowingAccount()
  }, [userdata, address, currentUser.address])

  return (
    <>
      <span className='flex justify-between items-center'>
        <div className='-mt-24 ml-10 z-10'>
          <div className='border-white border-2 rounded-full w-40 h-40'>
            <Image
              src={
                userdata
                  ? userdata.pfp
                    ? resolveLink(userdata.pfp)
                    : pfpPlaceholder
                  : pfpPlaceholder
              }
              alt='pfp'
              height={175}
              width={175}
              priority={true}
              style={{ borderRadius: 175 / 2 }}
            />
          </div>
          <div className='ml-3'>
            <h1 className='text-xl font-semibold mt-3'>
              {userdata && userdata.name}
            </h1>
            <a
              href={`https://mumbai.polygonscan.com/address/${address}`}
              target='_blank'
              rel='noreferrer'
            >
              <p
                className='text-gray-300 cursor-pointer'
                onMouseEnter={() => setIsMouseOverAddress(true)}
                onMouseLeave={() => setIsMouseOverAddress(false)}
              >
                {isMouseOverAddress ? address : shortAddress}
              </p>
            </a>
          </div>
          <span className='flex ml-3 mt-5 space-x-10'>
            <span
              className='flex text-sm hover:underline cursor-pointer'
              onClick={() =>
                router.push("/profile?state=following", undefined, {
                  shallow: true,
                })
              }
            >
              <h4 className='font-semibold cursor-pointer'>
                {userdata && userdata.following.length}
              </h4>
              &nbsp;
              <h5 className='text-gray-300'>Following</h5>
            </span>
            <span
              className='flex text-sm hover:underline cursor-pointer'
              onClick={() =>
                router.push("/profile?state=followers", undefined, {
                  shallow: true,
                })
              }
            >
              <h4 className='font-semibold cursor-pointer'>
                {userdata && userdata.followers.length}
              </h4>
              &nbsp;
              <h5 className='text-gray-300'>Followers</h5>
            </span>
          </span>
        </div>
        <span className='-mt-12 flex items-center'>
          <a
            href={`https://testnets.opensea.io/${address}`}
            target='_blank'
            rel='noreferrer'
          >
            <OpenseaButton />
          </a>
          {isProfile ? (
            <Link href='/settings'>
              <div>
                <IndigoButton
                  text='Edit Profile'
                  extraStyles='mr-12 font-bold'
                />
              </div>
            </Link>
          ) : isAuthenticated == false ? (
            <IndigoButton
              text='Connect'
              extraStyles='mr-12 font-bold px-7'
              onClick={login}
            />
          ) : isFollowingAccount == true ? (
            <UnfollowButton address={address} />
          ) : (
            <FollowButton address={address} />
          )}
        </span>
      </span>
    </>
  )
}

export default Main
