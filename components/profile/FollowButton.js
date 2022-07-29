import React from "react"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { userdataAddress } from '../../helpers/info'
import { IndigoButton } from "../Buttons"
import abi from "../../helpers/userdataAbi.json"

const FollowButton = ({ address }) => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()

  const follow = async () => {
    if (!isWeb3Enabled) await enableWeb3()

    const options = {
      contractAddress: userdataAddress,
      functionName: "follow",
      abi: abi,
      params: { account: address },
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Successfully following")
      },
      onError: (error) => {
        console.log(error.message)
      },
    })
  }

  return (
    <IndigoButton
      text='Follow'
      extraStyles='mr-12 font-bold px-7'
      onClick={follow}
    />
  )
}

export default FollowButton
