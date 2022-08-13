import React, { useState } from "react"
import Banner from "./Banner"
import Main from "./Main"
import ProfilePosts from "./ProfilePosts"
import About from "./About"
import NFTs from "./NFTs"
import { useRouter } from 'next/router'

const AccountUI = ({ userdata, address, isProfile, state }) => {
  const router = useRouter()

  const getTabClassName = (tabName) => {
    const defaultStyles = "cursor-pointer w-14 text-center"
    const isSelectedStyles = "border-b-4 border-sky-500"
    const style = `${state == tabName && isSelectedStyles} ${defaultStyles}`
    return style
  }

  return (
    <div>
      <div className='bg-[#00000045]'>
        <Banner userdata={userdata} />

        <Main userdata={userdata} address={address} isProfile={isProfile} />

        <div className='flex justify-center border-b border-gray-500'>
          <span className='flex w-3/4 justify-around mt-5 font-semibold'>
            <div
              className={getTabClassName("posts")}
              onClick={() =>
                router.push("/profile?state=posts", undefined, {
                  shallow: true,
                })
              }
            >
              Posts
            </div>
            <div
              className={getTabClassName("about")}
              onClick={() =>
                router.push("/profile?state=about", undefined, {
                  shallow: true,
                })
              }
            >
              About
            </div>
            <div
              className={getTabClassName("nfts")}
              onClick={() =>
                router.push("/profile?state=nfts", undefined, { shallow: true })
              }
            >
              NFTs
            </div>
          </span>
        </div>
      </div>
      <div>
        {state == "posts" && (
          <ProfilePosts
            userdata={userdata}
            isProfile={isProfile}
            address={address}
          />
        )}
        {state == "about" && (
          <About userdata={userdata} isProfile={isProfile} />
        )}
        {state == "nfts" && <NFTs userdata={userdata} isProfile={isProfile} />}
      </div>
    </div>
  )
}

export default AccountUI
