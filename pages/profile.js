import React, { useContext } from "react"
import { useMoralis } from "react-moralis"
import NotAuthenticated from "../components/NotAuthenticated"
import AccountUI from "../components/profile/AccountUI"
import UserContext from "../contexts/UserContext"

const Profile = () => {
  const { isAuthenticated } = useMoralis()
  const { address, nftImages, nftData, data } =
    useContext(UserContext)

  return (
    <div>
      {isAuthenticated ? (
        <AccountUI
          userdata={{
            name: data && data[0],
            pfp: data && data[1],
            banner: data && data[2],
            bio: data && data[3],
            followers: data ? data[4] : [],
            following: data ? data[5] : [],
            nftData: nftData && nftData,
            nftResult: nftData && (nftData.result && nftData.result),
            nftImages: nftImages && nftImages,
          }}
          address={address}
          isProfile={true}
          nftImages={nftImages}
          nftData={nftData}
        />
      ) : (
        <NotAuthenticated pageName='profile' />
      )}
    </div>
  )
}

export default Profile
