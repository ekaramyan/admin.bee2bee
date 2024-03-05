import axios from 'axios'
import Cookies from 'js-cookie'

export const fetchData = async (url, token) => {
	const apiUrl = process.env.API_URL
	try {
		const response = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data
	} catch (error) {
		if (error.response && error.response.status === 401) {
			Cookies.remove('access_token')
			const refresh_token = Cookies.get('refresh_token')
			if (!refresh_token) {
				throw new Error('No refresh token found')
			}

			try {
				const refresh_response = await axios.post(`${apiUrl}/auth/refresh`, {
					refresh_token: refresh_token,
				})
				document.cookie = `access_token=${refresh_response.data.data.access_token}; path=/`
				document.cookie = `refresh_token=${refresh_response.data.data.refresh_token}; path=/`
				const retryResponse = await axios.get(url, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${refresh_response.data.data.access_token}`,
					},
				})
				return retryResponse.data
			} catch (refreshError) {
				throw refreshError
			}
		}
		throw error
	}
}
