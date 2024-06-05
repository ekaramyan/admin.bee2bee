import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function useCells() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)
	const [data, setData] = useState(null)
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	}

	const getCells = async ({ page, limit, active, level, search }) => {
		setLoading(true)
		setError(null)
		console.log(search)
		const searchQuery = search ? `&search=${search}` : ''
		const archivedQuery =
			active !== (null || undefined)
				? `&is_active=${active ? true : false}&is_archived=${
						active ? false : true
				  }`
				: ''
		const levelQuery = level ? `&level_id=${level}` : ''

		const url = `${apiUrl}/cells/v2/all/list?page=${page}&limit=${limit}${archivedQuery}${levelQuery}${searchQuery}`

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

	const getCellById = async id => {
		setLoading(true)
		setError(null)

		const url = `${apiUrl}/cells/${id}`

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

	const deleteFollower = async followerId => {
		setLoading(true)
		try {
			const response = await axios.delete(
				`${apiUrl}/cells-followers/${followerId}`,
				{
					headers: headers,
				}
			)
			setSuccess(true)
			return response.data
		} catch (err) {
			setError(err.message || 'Error occurred while deleting the follower.')
			throw err
		} finally {
			setLoading(false)
		}
	}

	const addFollower = async (cellId, followerId) => {
		console.log(cellId, followerId)
		setLoading(true)
		try {
			const response = await axios.post(
				`${apiUrl}/cells/${cellId}/follower/${followerId}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			if (response.data.isSuccess) {
				setSuccess(true)
				return response.data
			} else {
				console.log('Unsuccessful operation')
			}
		} catch (err) {
			if (err.response && err.response.status === 403) {
				setError(
					'You cannot join this cell cause you have ran out your join limit'
				)
			} else {
				if (process.env.NODE_ENV === 'development') {
					console.error('Axios error:', err)
				}
				setError('Error while joining the cell.')
			}
		} finally {
			setLoading(false)
		}
	}

	const editFollower = async (followerId, data) => {
		setLoading(true)
		try {
			const response = await axios.patch(
				`${apiUrl}/cells-followers/${followerId}`,
				data,
				{
					headers: headers,
				}
			)
			if (response.data.isSuccess) {
				setSuccess(true)
				return response.data.isSuccess
			} else {
				throw new Error(
					'Failed to patch the follower. API returned false for isSuccess.'
				)
			}
		} catch (err) {
			setError(err.message || 'Error occurred while patching the follower.')
			throw err
		} finally {
			setLoading(false)
		}
	}

	const closeCell = async (cellId, data) => {
		setLoading(true)
		try {
			const response = await axios.patch(`${apiUrl}/cells/${cellId}`, data, {
				headers: headers,
			})
			if (response.data.isSuccess) {
				setSuccess(true)
				return response.data
			} else {
				throw new Error(
					'Failed to post the follower. API returned false for isSuccess.'
				)
			}
		} catch (err) {
			setError(err.message || 'Error occurred while closing the cell.')
			throw err
		} finally {
			setLoading(false)
		}
	}

	const getConsultants = async level => {
		setLoading(true)
		setError(null)

		const url = `${apiUrl}/cells-consultants/list?level_id=${level}`

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

	const editConsultantAndLeader = async (cellId, data) => {
		setLoading(true)
		try {
			const response = await axios.patch(`${apiUrl}/cells/cl/${cellId}`, data, {
				headers: headers,
			})
			if (response.data.isSuccess) {
				setSuccess(true)
				return response.data.isSuccess
			} else {
				throw new Error(
					'Failed to patch the follower. API returned false for isSuccess.'
				)
			}
		} catch (err) {
			setError(err.message || 'Error occurred while patching the follower.')
			throw err
		} finally {
			setLoading(false)
		}
	}

	return {
		data,
		loading,
		error,
		success,
		getCells,
		getCellById,
		addFollower,
		deleteFollower,
		editFollower,
		closeCell,
		getConsultants,
		editConsultantAndLeader,
	}
}
