import Link from "next/link"
import React, { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import ReactLoading from 'react-loading';

const About = () => {
  const [userAddress, userShortenedAddress, userdata] = useContext(UserContext)

  if (userdata == null) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type="bubbles" width={200} />
      </div>
    )
  } else {
    if (userdata[3] == "") {
      return (
        <div className='flex flex-col items-center justify-center mt-5'>
          <h1 className='font-bold text-2xl'>
            You Don&apos;t Have an Account Bio
          </h1>
          <p className='text-center mt-3'>
            Please go and make a bio{" "}
            <Link href='/settings'>
              <a className='text-blue-500 underline'>here</a>
            </Link>{" "}
            in settings
          </p>
        </div>
      )
    } else {
      return (
        <div className='mx-10 mt-10 space-y-1'>
          <h1 className='text-xl font-bold'>Bio</h1>
          <h1 className=''>{userdata[3]}</h1>
        </div>
      )
    }
  }
}

export default About
