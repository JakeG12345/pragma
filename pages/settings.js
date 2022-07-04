import React, { useState } from "react"
import { useMoralis } from "react-moralis"

const Settings = () => {
  const { isAuthenticated } = useMoralis()
  const [newUsername, setNewUsername] = useState("")

  const changeUsername = () => {

  }

  return (
    <div className='w-full'>
      {isAuthenticated ? (
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl mt-14 mb-10 font-bold'>Settings</h1>
          <p className='mx-10'>Your account details are stored on the blockchain hence meaning while changing them, there will be a gas fee.</p>
          <div className='flex items-center space-x-6 mt-5'>
            <h3 className='text-xl font-semibold'>Change Account Username</h3>
            <input
              className='w-60 px-2 h-8 rounded-md text-[#150f2e] outline-none'
              value={newUsername}
              placeholder='Make it snappy'
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={changeUsername} className='w-32 py-1 rounded-full text-xl font-semibold bg-sky-500'>Save</button>
          </div>
        </div>
      ) : (
        <div>please authenticate</div>
      )}
    </div>
  )
}

export default Settings
