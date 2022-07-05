import React, { useReducer, createContext } from "react"
import Notification from "./Notification"

export const NotificationContext = createContext()

const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, { ...action.payload }]
      case "REMOVE_NOTIFICATION":
        return state.filter((el) => el.id !== action.id)
      default:
        return state
    }
  }, [])

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={"fixed top-5 right-10 w-72 z-20"}>
        {state.map((note) => {
          return <Notification dispatch={dispatch} key={note.id} {...note} />
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider