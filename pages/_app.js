import { MoralisProvider } from "react-moralis"
import AdBar from "../components/AdBar"
import Sidebar from "../components/Sidebar"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl='https://vitfkaqzlt7v.usemoralis.com:2053/server' appId='xvr9Dhgt45W1cwe7Vjxb79OTNHGz6cHqH2cqvsUL'>
      <div className='flex'>
        <div>
          <Sidebar />
        </div>
        <Component {...pageProps} />
        <div className='absolute right-0'>
          <AdBar />
        </div>
      </div>
    </MoralisProvider>
  )
}

export default MyApp
