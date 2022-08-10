import React from "react"

const Article = ({ article }) => {
  return (
    <div>
      <h1 className='z-40'>{article.title}</h1>
      <img src={article.urlToImage} alt='' className='z-30' />
    </div>
  )
}

export default Article
