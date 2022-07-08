import React from "react"
import NotAuthenticated from "../components/NotAuthenticated"
import { useMoralis } from "react-moralis"
import UsernameChange from "../components/settings/UsernameChange"
import PfpChange from "../components/settings/PfpChange"
import BannerChange from "../components/settings/BannerChange"
import BioChange from "../components/settings/BioChange"

const Settings = () => {
  const { isAuthenticated } = useMoralis()
  return (
    <div>
      {isAuthenticated ? (
        <div className='flex flex-col w-full px-5 md:px-10 xl:px-14 pb-20 items-center'>
          <h1 className='text-4xl mt-14 mb-10 font-bold'>
            Settings
          </h1>
          <p className='text-center'>
            Every Pragma account&apos;s details are stored on the blockchain
          </p>
          <div className='space-y-14 mt-10 xl:mt-0 w-full'>
            <UsernameChange />
            <BioChange />
            <BannerChange />
            <PfpChange />
          </div>
        </div>
      ) : (
        <NotAuthenticated pageName='settings' />
      )}
    </div>
  )
}

export default Settings
