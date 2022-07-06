import React, { useState } from "react"
import abi from "../helpers/abi.json"
import useNotification from "../components/notifications/useNotification"
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'

const UsernameChange = () => {
  const { enableWeb3 } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const dispatch = useNotification()

  const [newUsername, setNewUsername] = useState("")

  const handleNewNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
    })
  }

  const changeUsername = async () => {
    await enableWeb3()

    if (newUsername.trim().length < 1) {
      alert("Username must be at least 1 character")
      return
    }
    if (newUsername.trim().length >= 15) {
      alert("Username must be at most 15 characters")
      return
    }
    const options = {
      contractAddress: "0x8e156D34935d82466aF96E5b6B09DA9207004730",
      functionName: "changeName",
      abi: abi,
      params: { newUsername: newUsername },
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleNewNotification(
          "SUCCESS",
          "Name should update shortly. Check MetaMask to view transaction."
        )
      },
      onError: (error) => {
        handleNewNotification("ERROR", error.message)
      },
    })
  }

  return (
    <div className='flex items-center space-x-6 mt-5'>
      <h3 className='text-xl font-semibold'>Change Account Username</h3>
      <input
        className='w-48 px-2 h-8 rounded-md text-[#150f2e] outline-none'
        value={newUsername}
        placeholder='Make it snappy'
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button
        onClick={changeUsername}
        className='w-24 py-1 rounded-full text-xl font-semibold bg-sky-500 hover:bg-sky-600'
      >
        Save
      </button>
    </div>
  )
}

export default UsernameChange
