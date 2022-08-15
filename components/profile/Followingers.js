import Link from "next/link"
import Image from "next/image"
import React, { useContext, useEffect } from "react"
import ReactLoading from "react-loading"
import { AccountsContext } from "../../contexts/AccountsContext"
import UnfollowButton from "./UnfollowButton"
import pfpPlaceholder from "../../images/pfpPlaceholder.jpeg"
import resolveLink from "../../helpers/resolveLink"

const Followingers = ({ followingers, isFollowers }) => {
  const accounts = useContext(AccountsContext)

  useEffect(() => {
    if (followingers) {
      console.log(followingers)
      accounts.addAccountData(followingers)
    }
  }, [followingers])

  if (followingers == null)
    return (
      <div className='flex items-center justify-center mt-10'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
  else
    return (
      <div>
        <h1 className='text-2xl font-bold text-center my-5'>{isFollowers ? "Followers" : "Following"}</h1>
        <div>
          {followingers.length == 0
            ? "No Followingers"
            : followingers.map((e) => {
                const data = accounts.objectAccountsData[e]
                console.log(data)
                return (
                  <span
                    key={e}
                    className='h-24 bg-[#959cc484] flex items-center justify-between border-t pl-10'
                  >
                    <span className='flex items-center space-x-3'>
                      <Image
                        src={
                          data
                            ? data.pfp
                              ? resolveLink(data.pfp)
                              : pfpPlaceholder
                            : pfpPlaceholder
                        }
                        width={50}
                        height={50}
                        style={{ borderRadius: "100%" }}
                      />
                      <h1 className='text-lg font-semibold'>
                        {data
                          ? data.name
                            ? data.name
                            : "No name"
                          : "Loading..."}
                      </h1>
                      <div className='text-gray-100'>-</div>
                      <div className='flex items-center'>
                        <h6 className='text-gray-300'>{`${e.slice(
                          0,
                          5
                        )}...${e.slice(38)}`}</h6>
                      </div>
                    </span>
                    <UnfollowButton />
                  </span>
                )
              })}
        </div>
      </div>
    )
}

export default Followingers
