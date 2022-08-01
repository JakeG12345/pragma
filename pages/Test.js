import React, { useContext } from 'react'
import { AccountsContext } from '../contexts/AccountsContext'

const Test = () => {
  const accounts = useContext(AccountsContext)

  return (
    <div>
      <div onClick={() => console.log(accounts.accountsData)}>Log Accounts</div>
      <div onClick={() => accounts.addAccountData(['0x371fafd40757b82ee3d9139475c2814c1da1a2c5', '0x27a1E7C34eD5977469B902c59f39D179f17A24e5'])}>Update Data</div>
    </div>
  )
}

export default Test