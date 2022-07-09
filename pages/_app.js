import { MoralisProvider } from "react-moralis"
import AdBar from "../components/AdBar"
import NotificationProvider from "../components/notifications/NotificationProvider"
import Sidebar from "../components/Sidebar"
import { UserProvider } from "../contexts/UserContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <div className='flex'>
        <div className='sticky top-0 h-screen z-20 bg-gradient-to-b from-sky-500 to-indigo-500'>
          <Sidebar />
        </div>
        <div className='w-full'>
          <Component {...pageProps} />
        </div>
        <div className='sticky hidden md:block top-0 h-screen bg-gradient-to-b from-sky-500 to-indigo-500'>
          <AdBar />
        </div>
      </div>
    </AppWrapper>
  )
}

const AppWrapper = ({ children }) => {
  return (
    <MoralisProvider
      serverUrl='https://vitfkaqzlt7v.usemoralis.com:2053/server'
      appId='xvr9Dhgt45W1cwe7Vjxb79OTNHGz6cHqH2cqvsUL'
    >
      <NotificationProvider>
        <UserProvider>{children}</UserProvider>
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
