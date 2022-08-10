import React, { useState } from "react"
import FeaturedHeadline from "./FeaturedHeadline"
import ReactLoading from "react-loading"
import Article from "./Article"

// 7c3f6be619fd4f3188e242d365e28613

const Rightbar = () => {
  const [headlines, setHeadlines] = useState()

  const getHeadlines = async () => {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=7c3f6be619fd4f3188e242d365e28613"
    )
    const data = await res.json()
    const articles = data.articles
    const featuredArticles = articles.slice(0, 5)
    setHeadlines(featuredArticles)
  }

  useState(() => {
    getHeadlines()
  }, [])

  if (headlines)
    return (
      <div className='sticky hidden md:block top-0 bg-gradient-to-b h-full from-sky-500 to-indigo-500'>
        <div className='w-72 xl:w-80'>
          <div className='mt-3'>
            <FeaturedHeadline article={headlines[0]} />
          </div>
          {headlines.map((e, i) => {
            if (i != 0) return <Article key={i} article={e} />
          })}
          <button onClick={() => console.log(headlines)}>Get Headlines</button>
        </div>
      </div>
    )
  else
    return (
      <div className='w-72 xl:w-80 sticky hidden md:block items-center justify-center top-0 bg-gradient-to-b h-screen from-sky-500 to-indigo-500'>
        <ReactLoading type='bubbles' width={200} />
      </div>
    )
}

export default Rightbar
