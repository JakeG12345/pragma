import Link from 'next/link'
import React from 'react'

const Following = () => {
  return (
    <div>
        <h1 onClick={() => console.log("au")}>FOllowing</h1>
        <Link href={'/profile'}>
            GO BACK
        </Link>
    </div>
  )
}

export default Following