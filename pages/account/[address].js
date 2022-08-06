import { useRouter } from "next/router"
import ReactLoading from "react-loading"
import AccountUI from "../../components/profile/AccountUI"
import { useContext, useState } from "react"
import { AccountsContext } from '../../contexts/AccountsContext'

const Account = () => {
  const accounts = useContext(AccountsContext)
  const router = useRouter()
  const { address } = router.query
  const [userdata, setUserdata] = useState(accounts.objectAccountsData[address])

  const addNFTs = async () => {
    await accounts.updateUserNFTs(address)
    setUserdata(accounts.objectAccountsData[address])
  }

  if (!address) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else if (address.slice(0, 2) != "0x" || address.length != 42)
    return <div>ERROR: Account address is not a valid address</div>
  else if (userdata == undefined) {
    // accounts.addAccountData([address])
    console.log("Ay")
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else {
    if (userdata.nftData == undefined) addNFTs()
    return (
      <AccountUI
        address={address}
        userdata={userdata}
        isProfile={false}
      />
    )
  }
}

export default Account
