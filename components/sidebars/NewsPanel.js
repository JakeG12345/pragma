import React, { useState } from "react"
import ReactLoading from "react-loading"
import Article from "./Article"

const NewsPanel = () => {
  const [headlines, setHeadlines] = useState()

  const getHeadlines = async () => {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.NEWS_API_KEY}`
    )
    const data = await res.json()
    const articles = data.articles
    const featuredArticles = articles.slice(0, 6)
    setHeadlines(featuredArticles)
  }

  useState(() => {
    getHeadlines()
  }, [])

  if (headlines)
    return (
      <div className='sticky hidden md:block top-0 bg-gradient-to-b h-screen from-sky-500 to-indigo-500'>
        <div className='w-72 xl:w-80'>
          <h1 className='text-xl text-center font-bold mt-5 mb-2'>
            News in Tech
          </h1>
          <div className='grid grid-cols-2' >
            {headlines.map((e, i) => {
              return <Article key={i} article={e} />
            })}
          </div>
        </div>
      </div>
    )
  else
    return (
      <div className='sticky hidden md:block top-0 bg-gradient-to-b h-screen from-sky-500 to-indigo-500'>
        <div className='w-72 xl:w-80 flex items-center justify-center'>
          <ReactLoading type='bubbles' width={200} />
        </div>
      </div>
    )
}

export default NewsPanel
