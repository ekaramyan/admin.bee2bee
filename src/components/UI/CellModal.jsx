import { useEffect } from 'react'
import {
	Box,
	Typography,
	Button,
	Modal,
	TextField,
	IconButton,
} from '@mui/material'
import { Add, Clear, Close, Done } from '@mui/icons-material'
import AuthButton from './AuthButton'

export default function CellModal({
	open,
	id,
	title,
	cellData,
	setAcceptedCount,
	acceptedCount,
	formData,
	setFormData,
	setFollowerId,
	followerId,
	handleConfirm,
	handleClose,
}) {
	const trimmedFollowers = cellData.cellUsers.slice(0, 6)
	const paddedFollowers = [
		...trimmedFollowers.slice(0, 6),
		...Array(6 - trimmedFollowers.length).fill({}),
	]
	const handleChange = name => event => {
		console.log(event.target.value)
	}
	useEffect(() => {
		// refreshFetch()
		setAcceptedCount(
			cellData.cellUsers?.filter(
				follower => follower?.isPayed && follower.isAccepted === true
			).length ?? 0
		)
	}, [])

	return (
		<Modal open={open} onClose={handleClose}>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					backgroundColor: 'white',
					padding: 20,
					borderRadius: 5,
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
				}}
			>
				<IconButton
					onClick={handleClose}
					style={{ position: 'absolute', top: 5, right: 5 }}
				>
					<Close />
				</IconButton>
				<h2>{title}</h2>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						width: '100%',
						gap: 15,
					}}
				>
					<Typography variant='outlined'>
						Consultant: {cellData.consultant.firstName}{' '}
						{cellData.consultant.lastName}
					</Typography>

					<Typography variant='outlined'>
						Leader: {cellData.leader.firstName} {cellData.leader.lastName} (id #
						{cellData.leader.id} )
					</Typography>
				</div>
				<Box style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
					{paddedFollowers.map((user, index) => (
						<>
							{user.id ? (
								<div
									key={index}
									style={{
										display: 'grid',
										gridTemplateColumns: '12fr 1fr 1fr',
										width: '100%',
									}}
								>
									<Typography variant='outlined'>
										{user.follower.nickname} id - #{user.follower.id}
									</Typography>
									<Button style={{ color: '#119A48' }}>
										<Done />
									</Button>
									<Button>
										<Clear />
									</Button>
								</div>
							) : (
								<div
									key={index}
									style={{
										display: 'grid',
										gridTemplateColumns: '6fr 1fr',
										width: '100%',
									}}
								>
									<TextField
										style={{ width: '100%' }}
										type='number'
										label={'id'}
										value={followerId}
										onChange={handleChange(followerId)}
									/>
									<Button style={{ color: '#119A48' }}>
										<Add />
									</Button>
								</div>
							)}
						</>
					))}
				</Box>
				{acceptedCount === 6 && <AuthButton>Close the cell</AuthButton>}
			</div>
		</Modal>
	)
}
