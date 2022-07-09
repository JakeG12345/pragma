import useNotification from '../components/notifications/useNotification'

const handleNewNotification = (type, message) => {
  const dispatch = useNotification()

  dispatch({
    type: type,
    message: message
  })
}

export default handleNewNotification