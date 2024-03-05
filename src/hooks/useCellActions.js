import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

export default function useCellActions() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const dispatch = useDispatch()
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')
	const baseCellUrl = `${apiUrl}/cells`

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
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

	const postFollower = async (cellId, followerId) => {
		setLoading(true)
		try {
			const response = await axios.post(
				`${baseCellUrl}/${cellId}/follower/${followerId}`,
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
			dispatch({ type: 'JOIN' })
			setLoading(false)
		}
	}

	const patchFollower = async (followerId, data) => {
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
		dispatch({ type: 'START_CELL_CLOSE' })
		setLoading(true)
		try {
			const response = await axios.patch(`${baseCellUrl}/${cellId}`, data, {
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

	return {
		loading,
		error,
		success,
		deleteFollower,
		postFollower,
		patchFollower,
		closeCell,
	}
}
