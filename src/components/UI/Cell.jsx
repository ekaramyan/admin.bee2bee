import React from 'react'
import background from '../../assets/img/join_cell_bg.svg'
import { Button, Typography, Box, useMediaQuery } from '@mui/material'
import { EditNote } from '@mui/icons-material'

export default function Cell({
	id,
	consultant,
	leader,
	cellUsers,
	onModalOpen,
}) {
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	const { firstName, lastName } = consultant
	return (
		<Box
			style={{
				minWidth: isMobile ? '100%' : '33.3%',
				minHeight: '37.9vh',
				height: 300,
				width: 'fit-content',
				background: `url(${background.src})  center / contain no-repeat`,
				padding: '30px 0',
			}}
		>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 10,
					height: '100%',
				}}
			>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 10,
					}}
				>
					<Typography variant='cell_user_item'>Cell #{id}</Typography>
					<Typography variant='cell_user_item' style={{ opacity: '.75' }}>
						{firstName} {lastName}
					</Typography>
					<Typography variant='cell_user_item'>
						{leader.firstName} {leader.lastName}
					</Typography>
					{cellUsers.map(cellUser => (
						<>
							{cellUser.isAccepted !== false && (
								<Typography key={cellUser.id} variant='cell_user_subtext'>
									{cellUser.follower.firstName} {cellUser.follower.lastName} (
									{'ID-'}
									{cellUser.follower.id})
								</Typography>
							)}
						</>
					))}
				</Box>
				<Button
					variant='secondary'
					style={{ color: '#fff', cursor: 'pointer' }}
					onClick={() => onModalOpen(id)}
				>
					<EditNote fontSize='large' />
				</Button>
			</Box>
		</Box>
	)
}
