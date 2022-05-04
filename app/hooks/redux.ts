import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import store from '../redux/store'

const { getState, dispatch } = store

export type AppState = ReturnType<typeof getState>
export type AppDispatch = typeof dispatch

// typed hooks for `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
