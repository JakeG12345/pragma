import { createContext, useEffect, useState } from "react"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { userdataAddress } from "../helpers/info"
import abi from "../helpers/userdataAbi.json"

export const AccountsContext = createContext()

export const AccountsProvider = ({ children }) => {
  const { native } = useMoralisWeb3Api()
  const [accountsData, setAccountsData] = useState([])
  const [recentAddresses, setRecentAddresses] = useState()

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
      (address) => !accountsData.includes(address)
    )

    setRecentAddresses(newAddresses)

    const options = {
      ...getAccountsDataOptions,
      params: { addresses: newAddresses },
    }

    fetch({ params: options })
  }

  useEffect(() => {
    if (data != null)
      setAccountsData((prev) => {
        const dataWithAddress = recentAddresses.map((e, i) => {
          return {
            e,
            ...data[i],
          }
        })
        return dataWithAddress
      })
  }, [data])

  return (
    <AccountsContext.Provider value={{ accountsData, addAccountData }}>
      {children}
    </AccountsContext.Provider>
  )
}
