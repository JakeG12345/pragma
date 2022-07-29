import React, { useContext } from "react"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { userdataAddress } from "../../helpers/info"
import { IndigoButton } from "../Buttons"
import abi from "../../helpers/userdataAbi.json"
import Context from "../../contexts/Context"
import useNotification from "../notifications/useNotification"

const FollowButton = ({ address }) => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const contractProcessor = useWeb3ExecuteFunction()
  const [userAddress] = useContext(Context)
  const dispatch = useNotification()

  const follow = async () => {
    if ((address = userAddress))
      return dispatch({ type: "ERROR", message: "You can't follow yourself!" })

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
        dispatch({
          type: "SUCCESS",
          message:
            "Following account looks to be successful. Check wallet to see transaction.",
        })
      },
      onError: (error) => {
        dispatch({
          type: "SUCCESS",
          message: error.message,
        })
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
