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
		setData(null)
		setLoading(true)
		setError(null)
		setSuccess(false)

		const url = `${apiUrl}/users?page=${page}&limit=${limit}&sort=created_at`

		try {
			const response = await axios.get(url, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			console.log(response)

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

	const getUserById = async id => {
		setLoading(true)
		setError(null)
		setSuccess(null)

		const url = `${apiUrl}/users/${id}`

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

	const editUser = async (id, formData) => {
		const url = `${apiUrl}/users/${id}`
		setLoading(true)
		setError(null)
		setSuccess(null)

		const filteredFormData = Object.fromEntries(
			Object.entries(formData).filter(
				([key, value]) => value !== null && value !== ''
			)
		)

		try {
			const response = await axios.patch(url, filteredFormData, {
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

	const deleteUser = async id => {
		const url = `${apiUrl}/users/${id}`
		setLoading(true)
		setError(null)
		setSuccess(null)
		try {
			axios.delete(url, {
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

	return {
		data,
		loading,
		error,
		success,
		getUsers,
		getUserById,
		editUser,
		deleteUser,
	}
}
