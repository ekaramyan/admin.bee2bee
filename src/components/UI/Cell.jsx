import React from 'react'
import background from '../../assets/img/join_cell_bg.svg'
import Image from 'next/image'
import { Button, Typography, Box, useMediaQuery } from '@mui/material'
import Link from 'next/link'

export default function Cell({
	bee,
	join,
	canJoin,
	level,
	price,
	index,
	onJoinClick,
}) {
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	return (
		<Box
			href={`cells/${join}`}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: index === 3 || index === 4 ? 'center' : 'start',
				gap: 10,
				minWidth: isMobile ? '100%' : '33.3%',
				minHeight: '33vh',
				height: 300,
				width: 'fit-content',
				background: `url(${background.src})  center / contain no-repeat`,
				paddingBottom: index === 3 || index === 4 ? 20 : 0,
				// cursor: canJoin ? 'pointer' : 'default',
			}}
		>

		</Box>
	)
}
