import React from "react"
import { useMoralis } from "react-moralis"

const settings = () => {
  const { isAuthenticated } = useMoralis()
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1 className='text-4xl mt-16 font-bold'>Settings</h1>
        </div>
      ) : (
        <div>please authenticate</div>
      )}
    </div>
  )
}

export default settings
