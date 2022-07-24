import React, { useState } from "react"
import Banner from "./Banner"
import Main from "./Main"
import ProfilePosts from "./ProfilePosts"
import About from "./About"
import NFTs from "./NFTs"

const AccountUI = ({ userdata, address, isProfile }) => {
  const [selectedTab, setSelectedTab] = useState(1)

  const getTabClassName = (tabNum) => {
    const defaultStyles = "cursor-pointer w-14 text-center"
    const isSelectedStyles = "border-b-4 border-sky-500"
    const style = `${
      selectedTab == tabNum && isSelectedStyles
    } ${defaultStyles}`
    return style
  }

  return (
    <div>
      <div className='bg-[#00000045]'>
        <Banner userdata={userdata} />

        <Main userdata={userdata} address={address} isProfile={isProfile} />

        <div className='flex justify-center border-b border-gray-500'>
          <span className='flex lg:w-3/5 justify-around mt-5 font-semibold'>
            <div
              className={getTabClassName(1)}
              onClick={() => setSelectedTab(1)}
            >
              Posts
            </div>
            <div
              className={getTabClassName(2)}
              onClick={() => setSelectedTab(2)}
            >
              About
            </div>
            <div
              className={getTabClassName(3)}
              onClick={() => setSelectedTab(3)}
            >
              NFTs
            </div>
          </span>
        </div>
      </div>
      <div>
        {selectedTab == 1 && <ProfilePosts />}
        {selectedTab == 2 && <About />}
        {selectedTab == 3 && <NFTs />}
      </div>
    </div>
  )
}

export default AccountUI
