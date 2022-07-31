import React, { useContext } from 'react'
import { AccountsContext } from '../contexts/AccountsContext'

const Test = () => {
  const test = useContext(AccountsContext)

  return (
    <div>{test}</div>
  )
}

export default Test