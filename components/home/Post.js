import React, { useEffect } from 'react'

const Post = ({header, text, image, posterAddress}) => {
  

  const getPosterDetails = () => {
    console.log("Yo")
  }

  useEffect(() => {
    getPosterDetails()
  }, [])

  return (
    <div>
        <div>
            
        </div>
        <h2>{header}</h2>
        <p>{text}</p>
        <p>{image}</p>
        <p>{posterAddress}</p>
    </div>
  )
}

export default Post