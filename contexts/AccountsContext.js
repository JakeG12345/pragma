import { createContext, useEffect, useState } from "react"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { userdataAddress } from "../helpers/info"
import resolveLink from "../helpers/resolveLink"
import abi from "../helpers/userdataAbi.json"

export const AccountsContext = createContext()

export const AccountsProvider = ({ children }) => {
  const { native, account } = useMoralisWeb3Api()
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

    getAccounts.fetch({ params: options })
  }

  useEffect(() => {
    if (getAccounts.data != null) {
      const dataWithAddress = recentAddresses.map(async (e, i) => {
        const userNftRes = await fetch(`/api/account/${e}`)
        const userNftData = await userNftRes.json()
        // console.log(userNftData)
        const accData = getAccounts.data[i]
        const address = { address: e }
        const objectAccData = {
          name: accData[0],
          pfp: accData[1],
          banner: accData[2],
          bio: accData[3],
          followers: accData[4],
          following: accData[5],
          nftData: userNftData.nftData,
          nftResult: userNftData.nftData.result,
          nftImages: userNftData.nftImages,
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
  }, [getAccounts.data])

  return (
    <AccountsContext.Provider
      value={{ accountsData, addAccountData, objectAccountsData }}
    >
      {children}
    </AccountsContext.Provider>
  )
}
