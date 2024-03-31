import { useEffect, useState } from 'react'
import {
	Box,
	Typography,
	Button,
	Modal,
	TextField,
	IconButton,
	CircularProgress,
} from '@mui/material'
import { Add, Clear, Close, Done } from '@mui/icons-material'
import AuthButton from './AuthButton'

export default function CellModal({
	open,
	title,
	cellData,
	setAcceptedCount,
	acceptedCount,
	addFollowerLoading,
	addFollowerError,
	addSuccess,
	patchingLoading,
	patchingError,
	patchingSuccess,
	onAddUserClick,
	onDeleteUserClick,
	onApproveClick,
	handleClose,
	refreshFetch,
	closeSuccess,
	closeLoading,
	closeError,
	closeCell,
}) {
	const trimmedFollowers = cellData.cellUsers.slice(0, 6)
	const paddedFollowers = [
		...trimmedFollowers.slice(0, 6),
		...Array(6 - trimmedFollowers.length).fill({}),
	]
	const [inputValues, setInputValues] = useState(Array(6).fill(null))
	const handleChange = index => event => {
		const newInputValues = [...inputValues]
		newInputValues[index] = event.target.value
		setInputValues(newInputValues)
	}
	useEffect(() => {
		if (addSuccess || patchingSuccess) {
			refreshFetch(cellData.id)
		}
	}, [addFollowerLoading, patchingLoading, addSuccess, open, acceptedCount])

	useEffect(() => {
		setAcceptedCount(
			cellData.cellUsers?.filter(
				follower => follower?.isPayed && follower.isAccepted === true
			).length ?? 0
		)
	}, [cellData.cellUsers])

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
							<div
								key={index}
								style={{
									display: 'grid',
									gridTemplateColumns: '12fr 1fr 1fr',
									width: '100%',
								}}
							>
								{user.id ? (
									<>
										<Typography variant='outlined'>
											{user.follower.nickname} id - #{user.follower.id}
										</Typography>
										{patchingLoading ? (
											<CircularProgress />
										) : (
											<>
												{user.isAccepted !== true && (
													<Button
														style={{ color: '#119A48' }}
														onClick={() => onApproveClick(user.id)}
													>
														<Done />
													</Button>
												)}
												<Button onClick={() => onDeleteUserClick(user.id)}>
													<Clear />
												</Button>
											</>
										)}
										{patchingError && (
											<Typography variant='error'>{patchingError}</Typography>
										)}
									</>
								) : (
									<>
										<TextField
											style={{ width: '100%' }}
											type='number'
											label={'id'}
											value={inputValues[index]}
											onChange={handleChange(index)}
										/>
										{addFollowerLoading ? (
											<CircularProgress />
										) : (
											<Button
												style={{ color: '#119A48' }}
												onClick={() =>
													onAddUserClick(
														cellData.id,
														Number(inputValues[index])
													)
												}
											>
												<Add />
											</Button>
										)}
										{addFollowerError ? (
											<Typography variant='error'>
												{addFollowerError}
											</Typography>
										) : (
											<></>
										)}
									</>
								)}
							</div>
						</>
					))}
				</Box>
				{acceptedCount === 6 &&
					(closeLoading ? (
						<CircularProgress />
					) : (
						<AuthButton onClick={() => closeCell(cellData.id)}>
							Close the cell
						</AuthButton>
					))}
			</div>
		</Modal>
	)
}
