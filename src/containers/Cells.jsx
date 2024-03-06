import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { fetchData } from '@/api/fetchData'
import Wrapper from '../components/UI/Wrapper'
import { Grid, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const Confetti = dynamic(() => import('react-confetti'))
const Cell = dynamic(() => import('../components/UI/Cell'))

export default function Cells() {
	const [birthday, setBirthday] = useState(null)
	const [data, setData] = useState(null)
	const [showConfetti, setShowConfetti] = useState(false)
	const router = useRouter()
	const token = Cookies.get('access_token')
	const url = process.env.API_URL
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	useEffect(() => {
		const fetchDataAsync = async () => {
			try {
				const response = await fetchData(`${url}/cell-levels`, token)
				setData(response.data)
				const user = await fetchData(`${url}/users/me`, token)
				setBirthday(user.data.birth)
			} catch (err) {
				console.error(err)
			}
		}

		fetchDataAsync()
	}, [])

	const [confettiShown, setConfettiShown] = useState(false)

	useEffect(() => {
		const currentDate = new Date()
		const birthdayDate = new Date(birthday)

		if (
			currentDate.getDate() === birthdayDate.getDate() &&
			currentDate.getMonth() === birthdayDate.getMonth() &&
			!confettiShown
		) {
			setShowConfetti(true)
			setConfettiShown(true)

			const timeout = setTimeout(() => {
				setShowConfetti(false)
			}, 9000)

			return () => clearTimeout(timeout)
		}
	}, [birthday, confettiShown])
	useEffect(() => {
		const timer = setInterval(() => {
			setConfettiShown(false)
		}, 24 * 60 * 60 * 1000)

		return () => clearInterval(timer)
	}, [])

	return (
		<Wrapper
			header={'Cells'}
			style={{
				minHeight: 760,
				maxHeight: isMobile ? '80dvh' : 'none',
				overflow: isMobile ? 'auto' : 'hidden',
			}}
		>
			<Grid
				style={{
					width: '100%',
					height: isMobile ? 'auto' : '100%',
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					justifyContent: 'center',
					alignContent: 'center',
					gap: isMobile ? 10 : 0,
					userSelect: 'none',
				}}
			>
				{showConfetti && !confettiShown && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							zIndex: 1000,
						}}
					>
						<Confetti width={window.innerWidth} height={window.innerHeight} />
					</div>
				)}
				{data?.map((cell, index) => (
					<Cell
						key={cell?.id}
						style={{
							flexBasis: '33.33%',
							maxWidth: '33.33%',
							boxSizing: 'border-box',
						}}
					/>
				))}
			</Grid>
		</Wrapper>
	)
}
