import React, { useContext } from "react"
import { useMoralis } from "react-moralis"
import UserContext from '../../contexts/UserContext'

const TopConnectWallet = () => {
  const { authenticate, isAuthenticated } = useMoralis()
  const [userAddress, userShortenedAddress, userdata, updateUserdata] = useContext(UserContext)

//0x2B6326DC3cf0aDDd9920C0721c9fFEB23D9160c5

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: "Please sign to connect to Pragma",
      })
        .then(function (user) {
          console.log("logged in user:", user)
          updateUserdata()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <div className='flex flex-col items-center space-y-5 bg-[#00000045] border-b border-gray-500 py-5'>
      <h1 className='text-3xl mt-2 font-bold text-center mx-3'>Please Connect Wallet</h1>
      <p className='mx-3 md:mx-10 mb-3 text-center'>
        To create and interact with posts, please connect your MetaMask wallet below
      </p>
      <button
        className='py-3 w-60 rounded-full text-xl font-semibold bg-sky-500 hover:bg-sky-600'
        onClick={login}
      >
        Connect Wallet
      </button>
    </div>
  )
}

export default TopConnectWallet