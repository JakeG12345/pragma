import { useRouter } from "next/router"
import ReactLoading from "react-loading"
import AccountUI from "../../components/profile/AccountUI"
import { useContext } from "react"
import { AccountsContext } from '../../contexts/AccountsContext'

const Account = () => {
  const accounts = useContext(AccountsContext)
  const router = useRouter()
  const { address } = router.query

  if (!address) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else if (address.slice(0, 2) != "0x" || address.length != 42)
    return <div>ERROR: Account address is not a valid address</div>
  else if (accounts.objectAccountsData[address] == undefined) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  } else console.log(accounts.objectAccountsData[address])
    return (
      <AccountUI
        address={address}
        userdata={accounts.objectAccountsData[address]}
        isProfile={false}
      />
    )
}

export default Account
