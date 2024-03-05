import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

const useRegister = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)
	const apiUrl = process.env.API_URL
	const router = useRouter()
	const dispatch = useDispatch()

	const register = async formData => {
		setLoading(true)
		try {
			const response = await axios.post(`${apiUrl}/users/register`, formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (response.status === 200 || response.status === 201) {
				document.cookie = `access_token=${response.data.data.access_token}; path=/`
				document.cookie = `refresh_token=${response.data.data.refresh_token}; path=/`
				setSuccess(true)
			} else {
				setError(response.data.message || 'An error occurred.')
			}
		} catch (err) {
			setError(err.response?.data?.message || 'An error occurred.')
		} finally {
			setLoading(false)
		}
	}

	return { register, loading, error, success }
}

export default useRegister
