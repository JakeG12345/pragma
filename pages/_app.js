import { MoralisProvider } from "react-moralis"
import AdBar from "../components/AdBar"
import Sidebar from "../components/Sidebar"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl='https://vitfkaqzlt7v.usemoralis.com:2053/server'
      appId='xvr9Dhgt45W1cwe7Vjxb79OTNHGz6cHqH2cqvsUL'
    >
      <div className='flex'>
        <div className='w-72'>
          <div className='fixed w-72'>
            <Sidebar />
          </div>
        </div>

        <Component {...pageProps} />

        <div className='w-72'>
          <div className='fixed right-0 top-0 w-72'>
            <AdBar />
          </div>
        </div>
      </div>
    </MoralisProvider>
  )
}

export default MyApp
