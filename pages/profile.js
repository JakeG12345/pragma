import React, { useContext } from "react"
import { useMoralis } from "react-moralis"
import NotAuthenticated from "../components/NotAuthenticated"
import bannerPlaceholder from "../images/bannerPlaceholder.png"
import pfpPlaceholder from "../images/pfpPlaceholder.jpeg"
import Image from "next/image"
import { UserContext } from "../contexts/UserContext"

const Profile = () => {
  const { isAuthenticated } = useMoralis()
  const [userAddress, userShortenedAddress, userdata] = useContext(UserContext)

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div>
            <Image src={bannerPlaceholder} alt='banner' height={250} />
            <div className='absolute top-32 ml-12 z-10'>
              <Image
                src={pfpPlaceholder}
                alt='profile picture'
                height={150}
                width={150}
              />
              <h1 className='text-xl font-semibold mt-3'>{userdata && userdata[0]}</h1>
              <p className='text-gray-300'>{userShortenedAddress}</p>
            </div>
          </div>
          <hr className='mt-40' />
        </div>
      ) : (
        <NotAuthenticated pageName='profile' />
      )}
    </div>
  )
}

export default Profile
