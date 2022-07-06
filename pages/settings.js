import React from "react"
import NotAuthenticated from "../components/NotAuthenticated"
import { useMoralis } from "react-moralis"
import UsernameChange from "../components/UsernameChange"
import PfpChange from "../components/PfpChange"
import BannerChange from '../components/BannerChange'

const Settings = () => {
  const { isAuthenticated } = useMoralis()
  return (
    <div>
      {isAuthenticated ? (
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl mt-14 mb-10 font-bold'>Settings</h1>
          <p className='mx-10 text-center'>
            Your account details are stored on the blockchain hence meaning
            while changing them, there will be a gas fee
          </p>
          <UsernameChange />
          <div className='mt-14'>
            <BannerChange />
          </div>
          <div className='mt-14'>
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
