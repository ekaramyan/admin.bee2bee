import React, { useState } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { Box, Typography, useMediaQuery } from '@mui/material'
import main from '../assets/img/main.webp'

export default function MainPage() {
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				userSelect: 'none',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: isMobile ? '70%' : '60%',
					margin: isMobile ? '0' : '0 auto',
				}}
			>
				<Image
					src={main.src}
					alt='main page'
					width={isMobile ? 245 : 600}
					height={isMobile ? 218 : 530}
				/>
				<Typography variant='main_head'>BEE2BEE</Typography>
				<Typography variant='main_bottom_highlight'> ADMIN</Typography>
			</div>
		</div>
	)
}
