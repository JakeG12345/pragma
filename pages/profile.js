import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import NotAuthenticated from "../components/NotAuthenticated"
import AccountUI from "../components/profile/AccountUI"
import Followers from "../components/profile/Followers"
import Following from "../components/profile/Following"
import UserContext from "../contexts/UserContext"

const Profile = () => {
  const { isAuthenticated } = useMoralis()
  const { address, nftImages, nftData, data } = useContext(UserContext)
  const [state, setState] = useState("posts")

  const router = useRouter()

  useEffect(() => {
    const theState = router.asPath.slice(15)
    if (
      router.asPath.slice(9, 14) != "state" ||
      (theState != "posts" &&
        theState != "about" &&
        theState != "nfts" &&
        theState != "following" &&
        theState != "followers")
    ) {
      router.push("/profile?state=posts", undefined, { shallow: true })
    }
  }, [router.asPath])

  useEffect(() => {
    const theState = router.query.state
    if (theState != undefined) setState(theState)
  }, [router.query.state])

  return (
    <div>
      {isAuthenticated ? (
        state == "following" ? (
          <Following />
        ) : state == "followers" ? (
          <Followers />
        ) : (
          <AccountUI
            state={state}
            userdata={{
              name: data && data[0],
              pfp: data && data[1],
              banner: data && data[2],
              bio: data && data[3],
              followers: data ? data[4] : [],
              following: data ? data[5] : [],
              nftData: nftData && nftData,
              nftResult: nftData && nftData.result && nftData.result,
              nftImages: nftImages && nftImages,
            }}
            address={address}
            isProfile={true}
            nftImages={nftImages}
            nftData={nftData}
          />
        )
      ) : (
        <NotAuthenticated pageName='profile' />
      )}
    </div>
  )
}

export default Profile
