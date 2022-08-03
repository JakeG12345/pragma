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
      const dataWithAddress = recentAddresses.map(async (e, i) => {
        const getNftOptions = {
          chain: "mumbai",
          address: e,
        }
        const nftData = await account.getNFTs(getNftOptions)
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
        const accData = data[i]
        const address = { address: e }
        const objectAccData = {
          name: accData[0],
          pfp: accData[1],
          banner: accData[2],
          bio: accData[3],
          followers: accData[4],
          following: accData[5],
          nftData: nftData,
          nftResult: nftData.result,
          nftImages: filteredNftImages,
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
