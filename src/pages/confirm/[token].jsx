import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Box, Typography } from '@mui/material'

export default function Token() {
	const apiUrl = process.env.API_URL
	const router = useRouter()
	const { token } = router.query

	const [timer, setTimer] = useState(5)

	useEffect(() => {
		const countdown = setInterval(() => {
			setTimer(prevTime => prevTime - 1)
		}, 1000)

		if (timer === 0) {
			router.push('/')
		}

		return () => clearInterval(countdown)
	}, [timer])

	useEffect(() => {
		const confirmToken = async () => {
			try {
				await axios.post(`${apiUrl}/users/confirm?token=${token}`)
			} catch (error) {
				console.error('Error confirming token:', error)
			}
		}

		if (token) {
			confirmToken()
		}
	}, [token])

	return (
		<Box>
			<Typography>
				Your account is approved. You will be redirected to the main page in{' '}
				{timer} seconds.
			</Typography>
		</Box>
	)
}
