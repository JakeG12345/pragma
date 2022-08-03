import { useRouter } from "next/router"
import ReactLoading from "react-loading"
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis"
import { userdataAddress } from "../../helpers/info"
import abi from "../../helpers/userdataAbi.json"
import AccountUI from "../../components/profile/AccountUI"
import { useEffect, useState } from "react"

const Account = () => {
  const { native } = useMoralisWeb3Api()
  const [nftImages, setNftImages] = useState()
  const [nftData, setNftData] = useState()
  const router = useRouter()
  const { address } = router.query

  const options = {
    chain: "mumbai",
    address: userdataAddress,
    function_name: "getUserData",
    abi: abi,
    params: { userAddress: address },
  }

  const userdata = useMoralisWeb3ApiCall(native.runContractFunction, {
    ...options,
  })

  useEffect(() => {
    const fetchUserNFTData = async () => {
      try {
        const res = await fetch(`/api/account/${address}`)
        const data = await res.json()
        setNftImages(data.nftImages)
        setNftData(data.nftData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserNFTData()

    userdata.fetch({ params: options })
  }, [address])

  if (!address) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else if (address.slice(0, 2) != "0x" || address.length != 42)
    return <div>ERROR: Account address is not a valid address</div>
  else if (userdata.data == undefined) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else
    return (
      <AccountUI
        address={address}
        userdata={userdata.data}
        isProfile={false}
        nftImages={nftImages}
        nftData={nftData}
      />
    )
}

export default Account
