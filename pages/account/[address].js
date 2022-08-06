import { useRouter } from "next/router"
import ReactLoading from "react-loading"
import AccountUI from "../../components/profile/AccountUI"
import { useContext, useEffect, useState } from "react"
import { AccountsContext } from "../../contexts/AccountsContext"

const Account = () => {
  const accounts = useContext(AccountsContext)
  const router = useRouter()
  const { address } = router.query
  const [userdata, setUserdata] = useState(accounts.objectAccountsData[address])
  const [delayTime, setDelayTime] = useState(10)

  const addNFTs = async () => {
    await accounts.updateUserNFTs(address)
    setUserdata(accounts.objectAccountsData[address])
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    const checkForUserdata = async () => {
      accounts.addAccountData([address])
      let dt = 10
      while (accounts.objectAccountsData[address] == undefined && dt != 1000) {
        await delay(10)
        setUserdata(accounts.objectAccountsData[address])
        dt += 10
        setDelayTime((prev) => prev + 10)
      }
    }

    if (address && userdata == undefined) checkForUserdata()
  }, [address, userdata])

  if (!address) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else if (address.slice(0, 2) != "0x" || address.length != 42)
    return <div>ERROR: Account address is not a valid address</div>
  else if (userdata == undefined) {
    if (delayTime == 1000)
      return (
        <div>
          <h1>
            Looks like the address your searching for doesn&apos;t have any account
            details, nfts/posts or the time taken to get those details took to long
          </h1>
        </div>
      )
    else
      return (
        <div
          className='flex items-center justify-center mt-10'
          onClick={() => console.log(delayTime)}
        >
          <ReactLoading type='bubbles' width={200} />
        </div>
      )
  } else {
    if (userdata.nftData == undefined) addNFTs()
    return <AccountUI address={address} userdata={userdata} isProfile={false} />
  }
}

export default Account
