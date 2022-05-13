import { ReactElement } from "react"
import PopupScreen from "./PopupScreen"
import { PopupStatusWrapper } from "./styles"

interface PopupStatusProps {
  id: string
  message: string
}

export default function PopupStatus({
  notifications,
}: {
  notifications: PopupStatusProps[]
}): ReactElement {
  return (
    <PopupStatusWrapper>
      {notifications.length !== 0 &&
        notifications.map((notification, idx) => (
          <PopupScreen
            key={`app-notification-${idx}`}
            id={notification.id}
            message={notification.message}
          />
        ))}
    </PopupStatusWrapper>
  )
}

PopupStatus.defaultProps = {
  notifications: [],
}
