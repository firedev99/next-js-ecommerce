import { AnimatePresence } from "framer-motion"
import { ReactElement, useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks/redux"
import { deleteNotification } from "../../app/redux/slices/notificationSlice"
import { PopupScreenWrapper } from "./styles"

interface PopopuScreenProps {
  message: string
  id: string
}

export default function PopupScreen({
  message,
  id,
}: PopopuScreenProps): ReactElement {
  const [available, setAvailable] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const intervalID = setInterval(() => {
      setAvailable(false)
    }, 2800)

    const timerID = setTimeout(() => {
      dispatch(deleteNotification(id))
    }, 3600)

    return () => {
      clearInterval(intervalID)
      clearTimeout(timerID)
    }
  }, [dispatch, id])

  return (
    <AnimatePresence exitBeforeEnter>
      {available && (
        <PopupScreenWrapper
          initial={{ x: "120%" }}
          animate={{ x: 0 }}
          exit={{ x: "120%", transition: { duration: 0.2 } }}
        >
          <h3>{message}</h3>
        </PopupScreenWrapper>
      )}
    </AnimatePresence>
  )
}
