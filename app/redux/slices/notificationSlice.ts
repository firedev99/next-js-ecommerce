import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface NotificationsProps {
  id: string
  message: string
}

interface StateProps {
  notifications: NotificationsProps[]
}

const initialState = {
  notifications: [],
} as StateProps

const notificationSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<NotificationsProps>) {
      state.notifications = state.notifications.concat(action.payload)
    },

    deleteNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notification) => action.payload !== notification.id
      )
    },
  },
})

const { actions, reducer } = notificationSlice

export const { setNotification, deleteNotification } = actions

export default reducer
