import React, { useState } from "react"
import abi from "../../helpers/abi.json"
import useNotification from "../notifications/useNotification"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { SaveButton } from "../Buttons"

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
      handleNewNotification("ERROR", "Username must be at least 1 characters")
      return
    }
    if (newUsername.trim().length >= 15) {
      handleNewNotification("ERROR", "Username must be at most 15 characters")
      return
    }
    const options = {
      contractAddress: "0xfeCe8d74537C3246A959c6fBc34f5317F303af0c",
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
    <>
      <div className='block xl:hidden space-y-2'>
        <h3 className='text-xl font-semibold'>Change Account Username</h3>
        <span className='flex justify-between'>
          <input
            className='w-48 px-2 h-8 rounded-md text-[#150f2e] outline-none'
            value={newUsername}
            placeholder='Username'
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <SaveButton onClick={changeUsername} />
        </span>
      </div>
      <div className='items-center justify-between hidden xl:flex'>
        <h3 className='text-xl font-semibold'>Change Account Username</h3>
        <input
          className='w-48 px-2 h-8 rounded-md text-[#150f2e] outline-none'
          value={newUsername}
          placeholder='Username'
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <SaveButton onClick={changeUsername} />
      </div>
    </>
  )
}

export default UsernameChange
