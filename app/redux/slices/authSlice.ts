import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import store from '../store'

type AppState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

import {
    AuthState,
    FireyErrors,
    LoginRequest,
    RegistrationRequest,
    UserResponse,
} from '../../../typings/interfaces/mains'
import authService from '../../services/authService'

const initialState = {
    user:
        typeof window !== 'undefined' && window.localStorage.getItem('user')
            ? JSON.parse(window.localStorage.getItem('user') || '{}')
            : null,
    status: 'idle',
    error: '',
} as AuthState

export const userLogin = createAsyncThunk<
    UserResponse,
    LoginRequest,
    {
        rejectValue: FireyErrors
    }
>(
    'auth/userLogin',
    async ({ email, password }: LoginRequest, { rejectWithValue }) => {
        const response = await authService.login(email, password)

        if (response.status !== 200) {
            return rejectWithValue((await response.json()) as FireyErrors)
        }

        return (await response.json()) as UserResponse
    }
)

export const userRegister = createAsyncThunk<
    UserResponse,
    RegistrationRequest,
    {
        state: AppState
        dispatch: AppDispatch
        rejectValue: FireyErrors
    }
>(
    'auth/userRegistration',
    async (userInfo: RegistrationRequest, { rejectWithValue, getState }) => {
        const response = await authService.register(userInfo)
        const {
            auth: { user },
        } = getState()

        if (response.status !== 201) {
            return rejectWithValue((await response.json()) as FireyErrors)
        }

        return (await response.json()) as UserResponse
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userRegister.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'finished'
                state.user = action.payload.data
                typeof window !== 'undefined' &&
                    localStorage.setItem(
                        'user',
                        JSON.stringify(action.payload.data)
                    )
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.status = 'finished'
                state.user = action.payload.data
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload?.message
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload?.message
            })
    },
})

const { actions, reducer } = authSlice

export const {} = actions

export default reducer
