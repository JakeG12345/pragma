import { MoralisProvider } from "react-moralis"
import AdBar from "../components/AdBar"
import NotificationProvider from "../components/notifications/NotificationProvider"
import Sidebar from "../components/Sidebar"
import { AccountsProvider } from "../contexts/AccountsContext"
import { PostsProvider } from '../contexts/PostsContext'
import { UserContextProvider } from '../contexts/UserContext'
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
      serverUrl={process.env.MORALIS_SERVER_URL}
      appId={process.env.MORALIS_APP_ID}
    >
      <NotificationProvider>
        <AccountsProvider>
          <PostsProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </PostsProvider>
        </AccountsProvider>
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
