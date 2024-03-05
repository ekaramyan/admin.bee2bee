import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function useReset() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')
	const baseUrl = `${apiUrl}/users`

	const getEmail = async email => {
		setError(null)
		setSuccess(null)
		setLoading(true)
		try {
			const response = await axios.get(`${baseUrl}/reset?email=${email}`)
			setSuccess(true)
			return response.data
		} catch (err) {
			if (process.env.NODE_ENV === 'development') {
				console.error('Axios error:', err.message)
			}
			const message =
				err.response?.data?.message || 'Error while requesting password reset'
			setError(message)
			throw err
		} finally {
			setLoading(false)
		}
	}

	const sendNewPass = async formData => {
		setLoading(true)
		try {
			const response = await axios.post(
				`${baseUrl}/reset-password`,
				{ ...formData },
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			setSuccess(true)
			return response.data
		} catch (err) {
			setError(err.message || 'Error occurred while reseting password.')
			throw err
		} finally {
			setLoading(false)
		}
	}

	return {
		loading,
		error,
		success,
		getEmail,
		sendNewPass,
	}
}
