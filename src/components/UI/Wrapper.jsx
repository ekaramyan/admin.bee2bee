import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, CircularProgress, useMediaQuery } from '@mui/material'

const Wrapper = ({ children, style, ...props }) => {
	const [loading, setLoading] = useState(true)
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	const router = useRouter()

	useEffect(() => {
		const handleRouteChangeStart = () => {
			console.log('Route change started')
			setLoading(true)
		}
		const handleRouteChangeComplete = () => {
			console.log('Route change complete')
			setLoading(false)
		}

		router.events.on('routeChangeStart', handleRouteChangeStart)
		router.events.on('routeChangeComplete', handleRouteChangeComplete)
		router.events.on('routeChangeError', error => {
			console.error('Route change error:', error)
			setLoading(false)
		})

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart)
			router.events.off('routeChangeComplete', handleRouteChangeComplete)
			router.events.off('routeChangeError', handleRouteChangeComplete)
		}
	}, [router.events])

	useEffect(() => {
		setLoading(false)
	}, [])

	const styles = {
		width: '100%',
		height: isMobile ? '100%' : '80dvh',
		maxHeight: isMobile ? 'unset' : '85vh',
		background: '#EAEEE8',
		borderRadius: 20,
		overflow: 'hidden',
		padding: isMobile ? '10px 30px 20px' : '25px 10px 20px 30px',
		display: 'flex',
		flexDirection: 'column',
		gap: 30,
		minHeight: 600,
		...style,
	}
	return (
		<Box style={styles} {...props} className='ScrollbarDefault'>
			<Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
					}}
				>
					<Typography
						variant='block_header'
						sx={{
							padding: '10px',
							alignSelf: 'start',
						}}
					>
						{props.header}
					</Typography>
					{loading && <CircularProgress size={24} />}
				</Box>
				<div
					style={{
						transform: 'translateX(-20px)',
						borderBottom: '1px solid #E06B00',
						width: 100,
					}}
				/>
			</Box>
			{children}
		</Box>
	)
}

export default Wrapper
