import { useRouter } from "next/router"
import ReactLoading from "react-loading"
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis"
import { userdataAddress } from "../../helpers/info"
import abi from "../../helpers/userdataAbi.json"
import AccountUI from "../../components/profile/AccountUI"
import { useEffect, useState } from "react"
import resolveLink from "../../helpers/resolveLink"

const Account = () => {
  const { Moralis } = useMoralis()
  const { native, account } = useMoralisWeb3Api()
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

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...options }
  )

  useEffect(() => {
    const getNFTData = async () => {
      const getNftOptions = {
        chain: "mumbai",
        address: address,
      }
      try {
        const nftData = await account.getNFTs(getNftOptions)
        return nftData
      } catch {
        await Moralis.start({
          serverUrl: "https://vitfkaqzlt7v.usemoralis.com:2053/server",
          appId: "xvr9Dhgt45W1cwe7Vjxb79OTNHGz6cHqH2cqvsUL",
        })
        const nftData = await account.getNFTs(getNftOptions)
        return nftData
      }
    }
    const sortNFTData = async () => {
      const nftData = await getNFTData()
      const nftImages = nftData.result.map((e) => {
        const image = JSON.parse(e.metadata)?.image
        // If image does not exist or is less than a bit less than expected, it is classified as no image
        if (image == null || image.length < 40) return "no img"
        return resolveLink(image)
      })
      function imageFilterer(value) {
        return value != "no img"
      }
      const filteredNftImages = nftImages.filter(imageFilterer)
      setNftImages(filteredNftImages)
      setNftData(nftData)
    }

    fetch({ params: options })
    sortNFTData()
  }, [address])

  if (!address) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else if (address.slice(0, 2) != "0x" || address.length != 42)
    return <div>ERROR: Account address is not a valid address</div>
  else if (data == undefined) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else
    return (
      <AccountUI
        address={address}
        userdata={data}
        isProfile={false}
        nftImages={nftImages}
        nftData={nftData}
      />
    )
}

export default Account
