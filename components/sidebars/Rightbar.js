import Image from "next/image"
import React, { useState } from "react"
import testImg from "../../images/pfpPlaceholder.jpeg"

// 7c3f6be619fd4f3188e242d365e28613

const Rightbar = () => {
  const [headlines, setHeadlines] = useState([])

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

  return (
    <div className='w-64 xl:w-72'>
      <h1 className='mt-10 text-center text-xl font-bold'>
        Bitcoin Crashes Over 52%
      </h1>
      <p className='mt-3 mx-3'>
        It appears bitcoin is going to continue to crash over the next few
        months as holders are selling all their tokens. It is currently expected
        that they will reach a valuation of under $40,000 before the end of the
        year
      </p>
      <div className='p-3'>
        <Image src={testImg} alt='' width={300} height={300} />
      </div>
      {headlines.map((e, i) => {
        return <div key={i}>{e.title}</div>
      })}
      <button onClick={() => console.log(headlines)}>Get Headlines</button>
    </div>
  )
}

export default Rightbar
