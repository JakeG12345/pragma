import { createContext, useEffect, useState } from "react"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { userdataAddress } from "../helpers/info"
import abi from "../helpers/userdataAbi.json"

export const AccountsContext = createContext()

export const AccountsProvider = ({ children }) => {
  const { native } = useMoralisWeb3Api()
  const [addressesFetched, setAddressesFetched] = useState([])
  const [recentAddresses, setRecentAddresses] = useState()
  const [objectAccountsData, setObjectAccountsData] = useState({})

  const getAccountsDataOptions = {
    chain: "mumbai",
    address: userdataAddress,
    function_name: "getBulkUserData",
    abi: abi,
  }

  const getAccounts = useMoralisWeb3ApiCall(native.runContractFunction, {
    ...getAccountsDataOptions,
  })

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

    newAddresses.map(async (e) => {
      const userNftRes = await fetch(`/api/account/${e}`)
      const userNftData = await userNftRes.json()
      setObjectAccountsData((prev) => {
        prev[e] = {
          ...prev[e],
          nftData: userNftData.nftData,
          nftResult: userNftData.nftData.result,
          nftImages: userNftData.nftImages,
        }
        return prev
      })
    })
    getAccounts.fetch({ params: options })
  }

  const updateData = (data) => {
    recentAddresses.map((e, i) => {
      const accData = data[i]
      const objectAccData = {
        name: accData[0],
        pfp: accData[1],
        banner: accData[2],
        bio: accData[3],
        followers: accData[4],
        following: accData[5],
      }
      setObjectAccountsData((prev) => {
        prev[e] = { ...prev[e], ...objectAccData }
        return prev
      })
    })
  }

  useEffect(() => {
    if (getAccounts.data != null) {
      updateData(getAccounts.data)
    }
  }, [getAccounts.data])

  return (
    <AccountsContext.Provider value={{ addAccountData, objectAccountsData }}>
      {children}
    </AccountsContext.Provider>
  )
}
