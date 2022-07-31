import { createContext } from 'react';

export const AccountsContext = createContext()

export const AccountsProvider = ({ children }) => {

    return (
        <AccountsContext.Provider value='hey'>
            {children}
        </AccountsContext.Provider>
    )
}