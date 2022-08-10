import React from "react"

const FeaturedHeadline = ({ article }) => {
  return (
    <div className='mx-2'>
      <h1 className='text-center text-lg font-bold'>{article.title}</h1>
      <p className='mt-3 mx-1 text-sm'>{article.description}</p>
      <div className='p-3'>
        <img src={article.urlToImage} alt='' />
      </div>
    </div>
  )
}

export default FeaturedHeadline
