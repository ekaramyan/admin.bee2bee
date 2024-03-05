import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const useUploadPhoto = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')

	const upload = async file => {
		const formData = new FormData()
		formData.append('file', file)

		setLoading(true)
		try {
			const response = await axios.patch(`${apiUrl}/users/me/photo`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 200 || response.status === 201) {
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

	return { upload, loading, error, success }
}

export default useUploadPhoto
