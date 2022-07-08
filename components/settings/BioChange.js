import React, { useState } from "react"
import abi from "../../helpers/abi.json"
import useNotification from "../notifications/useNotification"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { SaveButton } from "../Buttons"

const BioChange = () => {
  const { enableWeb3 } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const dispatch = useNotification()

  const handleNewNotification = (type, message) => {
    dispatch({
      type: type,
      message: message,
    })
  }

  const [newBio, setNewBio] = useState("")

  const changeBio = async () => {
    await enableWeb3()

    if (newBio.trim().length < 1) {
      handleNewNotification("ERROR", "Bio must be at least 1 character")
      return
    }
    if (newBio.trim().length >= 150) {
      handleNewNotification("ERROR", "Bio must be at most 150 characters")
      return
    }
    const options = {
      contractAddress: "0xfeCe8d74537C3246A959c6fBc34f5317F303af0c",
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
          className='w-8/12 lg:w-9/12 p-1 rounded-md text-[#150f2e] outline-none'
          value={newBio}
          placeholder='Bio'
          onChange={(e) => setNewBio(e.target.value)}
        />
        <SaveButton onClick={changeBio} />
      </span>
    </div>
  )
}

export default BioChange
