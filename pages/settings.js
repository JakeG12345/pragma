import React, { useState } from "react"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import NotAuthenticated from '../components/NotAuthenticated'
import abi from "../helpers/abi.json"

const Settings = () => {
  const { isAuthenticated, enableWeb3 } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()

  const [newUsername, setNewUsername] = useState("")

  const changeUsername = async () => {
    await enableWeb3()

    if (newUsername.trim().length < 1) {
      alert("Username must be at least 1 character")
      return
    }
    const options = {
      contractAddress: "0x0ac48D1524e665aF98Ffa98605D292B6e7feEFCf",
      functionName: "changeName",
      abi: abi,
      params: { newUsername: newUsername },
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Username should update shortly")
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  return (
    <div>
      {isAuthenticated ? (
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl mt-14 mb-10 font-bold'>Settings</h1>
          <p className='mx-10 text-center'>Your account details are stored on the blockchain hence meaning while changing them, there will be a gas fee</p>
          <div className='flex items-center space-x-6 mt-5'>
            <h3 className='text-xl font-semibold'>Change Account Username</h3>
            <input
              className='w-48 px-2 h-8 rounded-md text-[#150f2e] outline-none'
              value={newUsername}
              placeholder='Make it snappy'
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={changeUsername} className='w-24 py-1 rounded-full text-xl font-semibold bg-sky-500 hover:bg-sky-600'>Save</button>
          </div>
        </div>
      ) : (
        <NotAuthenticated pageName='settings' />
      )}
    </div>
  )
}

export default Settings
