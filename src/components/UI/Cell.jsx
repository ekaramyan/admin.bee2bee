import React from 'react'
import background from '../../assets/img/join_cell_bg.svg'
import { Button, Typography, Box, useMediaQuery } from '@mui/material'
import { Edit } from '@mui/icons-material'

export default function Cell({ id, consultant, leader, cellUsers }) {
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	const { firstName, lastName } = consultant
	console.log(cellUsers)
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
				padding: '30px 0',
			}}
		>
			<Typography variant='cell_user_item'>Cell #{id}</Typography>
			<Typography variant='cell_user_item' style={{ opacity: '.75' }}>
				{firstName} {lastName}
			</Typography>
			<Typography variant='cell_user_item'>
				{leader.firstName} {leader.lastName}
			</Typography>
			{cellUsers.map((cellUser, index) => (
				<Typography key={cellUser.id} variant='cell_user_subtext'>
					{cellUser.follower.firstName} {cellUser.follower.lastName} ({'ID-'}
					{cellUser.follower.id})
				</Typography>
			))}
			<Button variant='secondary' style={{ color: '#fff' }}>
				<Edit />
			</Button>
		</Box>
	)
}
