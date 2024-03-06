import React from 'react'
import background from '../../assets/img/join_cell_bg.svg'
import { Button, Typography, Box, useMediaQuery } from '@mui/material'

export default function Cell({

}) {
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	return (
		<Box
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 10,
				minWidth: isMobile ? '100%' : '33.3%',
				minHeight: '33vh',
				height: 300,
				width: 'fit-content',
				background: `url(${background.src})  center / contain no-repeat`,
				// cursor: canJoin ? 'pointer' : 'default',
			}}
		>

		</Box>
	)
}
