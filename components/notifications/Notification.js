import React, { useState, useEffect } from "react"

const Notification = (props) => {
  const [exit, setExit] = useState(false)
  const [width, setWidth] = useState(0)
  const [intervalID, setIntervalID] = useState(null)

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5
        }

        clearInterval(id)
        return prev
      })
    }, 20)

    setIntervalID(id)
  }

  const handlePauseTimer = () => {
    clearInterval(intervalID)
  }

  const handleCloseNotification = () => {
    handlePauseTimer()
    setExit(true)
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
      })
    }, 400)
  }

  useEffect(() => {
    if (width === 100) handleCloseNotification()
  }, [width])

  useEffect(() => {
    handleStartTimer()
  }, [])

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit && "exit"}`}
    >
      <h2
        className={`pl-4 pt-4 text-xl font-bold ${
          props.type === "SUCCESS" ? "text-[#65d266]" : "text-[#ff0000]"
        }`}
      >
        {props.type}
      </h2>
      <p className={`py-1 px-4 pb-3`}>{props.message}</p>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  )
}

export default Notification
