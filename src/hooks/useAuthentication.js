import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import useLogin from '@/hooks/useLogin'

export default function useAuthentication(loggedInPage = true) {
	const dispatch = useDispatch()
	const { refreshToken } = useLogin()
	const router = useRouter()
	useEffect(() => {
		const checkTokenValidity = () => {
			const token = Cookies.get('access_token')
			const refresh_token = Cookies.get('refresh_token')

			if (token && refresh_token) {
				dispatch({ type: 'LOG_IN' })
			} else if (!token && refresh_token) {
				refreshToken(refresh_token)
			} else if (!token && !refreshToken) {
				router.push('/login')
			} else if (loggedInPage) {
				Cookies.remove('refresh_token')
				dispatch({ type: 'LOG_OUT' })
				router.push('/')
			} else {
				Cookies.remove('refresh_token')
				dispatch({ type: 'LOG_OUT' })
			}
		}

		checkTokenValidity()

		const intervalId = setInterval(checkTokenValidity, 2000000)

		return () => clearInterval(intervalId)
	}, [dispatch, refreshToken])
}
