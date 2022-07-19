import React from 'react'

const Post = ({header, text, image, owner}) => {
  return (
    <div>
        <div>
            
        </div>
        <h2>{header}</h2>
        <p>{text}</p>
        <p>{image}</p>
        <p>{owner}</p>
    </div>
  )
}

export default Post