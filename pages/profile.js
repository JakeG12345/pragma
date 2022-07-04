import React from "react"
import { useMoralis } from "react-moralis"
import NotAuthenticated from "../components/NotAuthenticated"

const profile = () => {
  const { isAuthenticated } = useMoralis()

  return (
    <div>
      {isAuthenticated ? (
        <div>connected</div>
      ) : (
        <NotAuthenticated pageName='profile' />
      )}
    </div>
  )
}

export default profile
