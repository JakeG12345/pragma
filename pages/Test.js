import React, { useContext, useState } from "react"
import { AccountsContext } from "../contexts/AccountsContext"

const Test = () => {
  const accounts = useContext(AccountsContext)
  const [addresses, setAddresses] = useState([])

  return (
    <div>
      <div onClick={() => console.log(accounts.accountsData)}>Log Accounts</div>
      <div onClick={() => accounts.addAccountData(addresses)}>Update Data</div>
      <div>
        {addresses.map((e, i) => {
          return (
            <span key={i} className='flex my-1'>
              <h1 className='w-10 pl-3'>{i + 1}</h1>
              <input
                className='bg-orange-800 w-96'
                value={e}
                onChange={(event) =>
                  setAddresses((prev) => {
                    const newAddressArray = prev.map((e, prevIndex) => {
                      if (prevIndex === i) return event.target.value
                      else return e
                    })

                    return newAddressArray
                  })
                }
              />
            </span>
          )
        })}
      </div>
      <div className='flex flex-col space-y-2 mt-10'>
        <button onClick={() => setAddresses((prev) => [...prev, ""])}>
          Add Row
        </button>
        <button
          onClick={() =>
            setAddresses((prev) => prev.filter((_, i) => i !== prev.length - 1))
          }
        >
          Delete Row
        </button>
        <button onClick={() => console.log(addresses)}>address</button>
      </div>
    </div>
  )
}

export default Test
