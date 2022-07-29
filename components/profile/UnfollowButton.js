import React from "react"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { userdataAddress } from '../../helpers/info'
import { IndigoButton } from "../Buttons"
import abi from "../../helpers/userdataAbi.json"

const UnfollowButton = ({ address }) => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()

  const unfollow = async () => {
    if (!isWeb3Enabled) await enableWeb3()

    const options = {
      contractAddress: userdataAddress,
      functionName: "unfollow",
      abi: abi,
      params: { account: address },
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Successfully unfollowing")
      },
      onError: (error) => {
        console.log(error.message)
      },
    })
  }

  return (
    <IndigoButton
      text='Unfollow'
      extraStyles='mr-12 font-bold px-7'
      onClick={unfollow}
    />
  )
}

export default UnfollowButton
