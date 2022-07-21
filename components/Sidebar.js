import React, { useState, useContext } from "react"
import Tab from "./Tab"
import Image from "next/image"
import polygonLogo from "../images/polygonLogo.png"
import pfpPlaceholder from "../images/pfpPlaceholder.jpeg"
import Link from "next/link"
import { useMoralis } from "react-moralis"
import Context from "../contexts/Context"
import resolveLink from "../helpers/resolveLink"
import useNotification from "./notifications/useNotification"

const Sidebar = () => {
  const { isAuthenticated, authenticate, logout } = useMoralis()
  const [userAddress, userShortenedAddress, userdata, updateUserdata] =
    useContext(Context)
  const dispatch = useNotification()
  const [isLogoutShowing, setIsLogoutShowing] = useState(false)
  const [isDetailsShowing, setIsDetailsShowing] = useState(false)
  const [isLogoutHover, setIsLogoutHover] = useState(false)

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: "Please sign to connect to Pragma",
      })
        .then(function (user) {
          console.log("logged in user:", user)
          updateUserdata()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const logOut = async () => {
    await logout()
    dispatch({
      type: "SUCCESS",
      message: "You have successfully disconnected your wallet",
    })
  }

  const post = () => {
    console.log("Post function was called")
  }

  return (
    <div className='flex flex-col items-center w-16 md:20 lg:w-64 xl:w-72'>
      <Link href='/'>
        <div className='my-12 cursor-pointer'>
          <span className='hidden lg:flex space-x-3'>
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
          <div className='block lg:hidden'>
            <Image
              src={polygonLogo}
              alt='polygon logo'
              height={40}
              width={45}
            />
          </div>
        </div>
      </Link>

      <nav className='space-y-3 lg:-ml-6 xl:-ml-10'>
        <Tab tabName='Home' to='/' svgLocation='/house-solid.svg' />
        <Tab tabName='Profile' to='/profile' svgLocation='/user-solid.svg' />
        <Tab tabName='Settings' to='/settings' svgLocation='/gear-solid.svg' />
      </nav>

      <div className='absolute bottom-20 space-y-5 flex flex-col items-center'>
        <button
          className='py-3 w-52 xl:w-60 rounded-full text-xl font-semibold bg-[#22184c] hover:bg-[#150f2e] hidden lg:block'
          onClick={isAuthenticated ? post : login}
        >
          {isAuthenticated ? "Mint Post" : "Connect Wallet"}
        </button>
        {isAuthenticated && (
          <div>
            <span className='flex items-center justify-center'>
              <div
                className='cursor-pointer lg:hidden'
                onMouseLeave={() => setIsDetailsShowing(false)}
                onMouseEnter={() => setIsDetailsShowing(true)}
              >
                {!isDetailsShowing ? (
                  <Link href='/profile'>
                    <div>
                      <Image
                        src={
                          userdata
                            ? userdata[1]
                              ? resolveLink(userdata[1])
                              : pfpPlaceholder
                            : pfpPlaceholder
                        }
                        alt='pfp'
                        height={45}
                        width={45}
                        style={{ borderRadius: 45 / 2 }}
                      />
                    </div>
                  </Link>
                ) : (
                  <Link href='/profile'>
                    <span className='flex items-center space-x-3 ml-36 h-16 px-2 w-48 bg-[#000000d0] border-white border-2 rounded-lg'>
                      <div className='w-12 h-12 rounded-full border-white border-2'>
                        <Image
                          src={
                            userdata
                              ? userdata[1]
                                ? resolveLink(userdata[1])
                                : pfpPlaceholder
                              : pfpPlaceholder
                          }
                          alt='pfp'
                          height={45}
                          width={45}
                          style={{ borderRadius: 45 / 2 }}
                        />
                      </div>
                      <div className='pr-2'>
                        <h5 className='font-bold'>
                          {userdata
                            ? userdata[0] === ""
                              ? "No name"
                              : userdata[0]
                            : "Loading..."}
                        </h5>
                        <p className='text-gray-300 text-sm'>
                          {userShortenedAddress}
                        </p>
                      </div>
                    </span>
                  </Link>
                )}
              </div>
              <span className='hidden lg:flex items-center space-x-2'>
                <Link href='/profile'>
                  <div className='flex flex-col items-center cursor-pointer'>
                    <Image
                      src={
                        userdata
                          ? userdata[1]
                            ? resolveLink(userdata[1])
                            : pfpPlaceholder
                          : pfpPlaceholder
                      }
                      alt='pfp'
                      height={45}
                      width={45}
                      style={{ borderRadius: 45 / 2 }}
                    />
                  </div>
                </Link>
                <div>
                  <h5 className='font-bold'>
                    {userdata
                      ? userdata[0] === ""
                        ? "No name"
                        : userdata[0]
                      : "Loading..."}
                  </h5>
                  <p className='text-gray-300 text-sm'>
                    {userShortenedAddress}
                  </p>
                </div>
                <div className='hidden lg:block pl-1 xl:pl-2'>
                  <button
                    className='cursor-pointer'
                    onClick={() => setIsLogoutShowing((prev) => !prev)}
                  >
                    <Image
                      src='/more.svg'
                      height={17.5}
                      width={17.5}
                      alt='more'
                    />
                  </button>
                </div>
              </span>
            </span>
            <div className='mt-5 flex justify-center lg:hidden'>
              <button
                onClick={() => {
                  setIsLogoutHover(false)
                  logOut()
                }}
              >
                <Image
                  src={isLogoutHover ? "/logout-red.svg" : "/logout-white.svg"}
                  alt='logout'
                  width={35}
                  height={35}
                  onMouseEnter={() => setIsLogoutHover(true)}
                  onMouseLeave={() => setIsLogoutHover(false)}
                />
              </button>
            </div>
          </div>
        )}
      </div>
      {isAuthenticated && isLogoutShowing && (
        <span className='absolute bottom-5 bg-[#150f2e] w-48 h-12 rounded-xl flex items-center justify-center border-stone-100 border-2'>
          <button
            className='text-[#ff3c2e] text-lg font-semibold'
            onClick={() => {
              setIsLogoutShowing(false)
              logout()
            }}
          >
            Disconnect
          </button>
          <button
            className='absolute right-4'
            onClick={() => setIsLogoutShowing(false)}
          >
            <div className='flex items-center justify-center'>
              <Image src='/xmark-solid.svg' width={25} height={25} alt='X' />
            </div>
          </button>
        </span>
      )}
    </div>
  )
}

export default Sidebar
