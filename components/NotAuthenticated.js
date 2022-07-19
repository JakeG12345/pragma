import React, { useContext } from "react"
import { useMoralis } from "react-moralis"
import Context from '../contexts/Context'

const NotAuthenticated = ({ pageName }) => {
  const { authenticate, isAuthenticated } = useMoralis()
  const [userAddress, userShortenedAddress, userdata, updateUserdata] = useContext(Context)

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
    <div className='flex flex-col items-center space-y-5'>
      <h1 className='text-4xl mt-20 font-bold text-center mx-3'>Please Connect Wallet</h1>
      <p className='mx-3 md:mx-10 mb-3 text-center'>
        In order to view and interact with the {pageName} page, you need to
        authenticate with MetaMask
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

export default NotAuthenticated
