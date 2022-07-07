import React, { useState } from "react"
import abi from "../../helpers/abi.json"
import useNotification from "../notifications/useNotification"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { SaveButton } from "../Buttons"

const BioChange = () => {
  const { enableWeb3 } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const dispatch = useNotification()

  const [newBio, setNewBio] = useState()

  const handleNewNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
    })
  }

  const changeBio = async () => {
    await enableWeb3()

    if (newBio.trim().length < 1) {
      alert("Bio must be at least 1 character")
      return
    }
    if (newBio.trim().length >= 150) {
      alert("Bio must be at most 150 characters")
      return
    }
    const options = {
      contractAddress: "0x8e156D34935d82466aF96E5b6B09DA9207004730",
      functionName: "changeBio",
      abi: abi,
      params: { newBio: newBio },
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleNewNotification(
          "SUCCESS",
          "Bio should update shortly. Check MetaMask to view transaction."
        )
      },
      onError: (error) => {
        handleNewNotification("ERROR", error.message)
      },
    })
  }

  return (
    <div className='space-y-2'>
      <h2 className='text-xl font-semibold'>Change Bio Description</h2>
      <span className='flex items-center justify-between'>
        <textarea
          className='w-9/12 p-1 rounded-md text-[#150f2e] outline-none'
          value={newBio}
          placeholder='Bio'
          onChange={(e) => setNewBio(e.target.value)}
        />
        <div className='mr-5'>
          <SaveButton onClick={changeBio} />
        </div>
      </span>
    </div>
  )
}

export default BioChange
