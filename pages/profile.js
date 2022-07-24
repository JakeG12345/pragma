import React, { useContext } from "react"
import { useMoralis } from "react-moralis"
import NotAuthenticated from "../components/NotAuthenticated"
import AccountUI from '../components/profile/AccountUI'
import Context from '../contexts/Context'

const Profile = () => {
  const { isAuthenticated } = useMoralis()
  const [userAddress, userShortenedAddress, userdata, a, nftImages, nftData] = useContext(Context)

  return (
    <div>
      {isAuthenticated ? (
        <AccountUI userdata={userdata} address={userAddress} isProfile={true} nftImages={nftImages} nftData={nftData} />
      ) : (
        <NotAuthenticated pageName='profile' />
      )}
    </div>
  )
}

export default Profile
