import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function useUsers() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)
	const [data, setData] = useState(null)
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')

	const getUsers = async (page, limit) => {
		setLoading(true)
		setError(null)

		const url = `${apiUrl}/users?page=${page}&limit=${limit}`

		try {
			const response = await axios.get(url, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 200) {
				setSuccess(true)
				setData(response.data)
				return response.data
			} else {
				setError('Failed to fetch the data.')
			}
		} catch (err) {
			setError(err.message || 'Error occurred while fetching the data.')
		} finally {
			setLoading(false)
		}
	}

	const editUser = (id) =>{

	}

	const deleteUser = (id) =>{
		
	}

	return { data, loading, error, success, getUsers }
}
