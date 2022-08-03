import { createContext, useEffect, useState } from "react"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { userdataAddress } from "../helpers/info"
import abi from "../helpers/userdataAbi.json"

export const AccountsContext = createContext()

export const AccountsProvider = ({ children }) => {
  const { native } = useMoralisWeb3Api()
  const [accountsData, setAccountsData] = useState([])
  const [addressesFetched, setAddressesFetched] = useState([])
  const [recentAddresses, setRecentAddresses] = useState()
  const [objectAccountsData, setObjectAccountsData] = useState({})

  const getAccountsDataOptions = {
    chain: "mumbai",
    address: userdataAddress,
    function_name: "getBulkUserData",
    abi: abi,
  }

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...getAccountsDataOptions }
  )

  const addAccountData = (addresses) => {
    const newAddresses = addresses.filter(
      (address) => !addressesFetched.includes(address)
    )

    setRecentAddresses(newAddresses)
    setAddressesFetched((prev) => [...prev, ...newAddresses])

    const options = {
      ...getAccountsDataOptions,
      params: { addresses: newAddresses },
    }

    fetch({ params: options })
  }

  useEffect(() => {
    if (data != null) {
      const dataWithAddress = recentAddresses.map((e, i) => {
        const accData = data[i]
        const address = { address: e }
        const objectAccData = {
          name: accData[0],
          pfp: accData[1],
          banner: accData[2],
          bio: accData[3],
          followers: accData[4],
          following: accData[5],
        }
        setObjectAccountsData((prev) => {
          prev[e] = objectAccData
          return prev
        })
        return { ...objectAccData, ...address }
      })
      setAccountsData((prev) => {
        return [...prev, ...dataWithAddress]
      })
    }
  }, [data])

  return (
    <AccountsContext.Provider
      value={{ accountsData, addAccountData, objectAccountsData }}
    >
      {children}
    </AccountsContext.Provider>
  )
}
