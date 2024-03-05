import { configureStore } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
	loggedIn: false,
	userId: null,
	avatarUrl: null,
	cellClosing: false,
	isFirstLoad: true,
	isJoinClicked: false,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOG_IN':
			return { ...state, loggedIn: true }
		case 'LOG_OUT':
			Cookies.remove('userId')
			Cookies.remove('access_token')
			Cookies.remove('refresh_token')
			return { ...state, loggedIn: false, userId: null, isFirstLoad: true }
		case 'SET_USER_ID':
			return { ...state, userId: action.payload }
		case 'SET_AVATAR_URL':
			return { ...state, avatarUrl: action.payload }
		case 'START_CELL_CLOSE':
			return { ...state, cellClosing: true }
		case 'STOP_CELL_CLOSE':
			return { ...state, cellClosing: false }
		case 'LOADED':
			return { ...state, isFirstLoad: false }
		case 'JOIN':
			return { ...state, isJoinClicked: true }
		default:
			return state
	}
}

const store = configureStore({
	reducer: {
		user: userReducer,
	},
})

export default store
