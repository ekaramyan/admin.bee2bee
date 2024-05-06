import { useEffect, useState } from 'react'
import {
	Box,
	Typography,
	Button,
	Modal,
	TextField,
	IconButton,
	CircularProgress,
	Select,
	MenuItem,
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
	editCaL,
	consultants,
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

	const [formData, setFormData] = useState({
		leaderId: cellData?.leader.id || '',
		consultantId: cellData?.consultant.id || '',
	})

	const handleInputChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
		e.target.size = e.target.value.length || 1
	}

	const consultantName = consultants?.data?.find(
		consultant => consultant.id === formData.consultantId
	)

	console.log(cellData)

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
						gridTemplateColumns: '6.5fr 6.5fr 2fr',
						width: '100%',
						gap: 15,
					}}
				>
					{/* <Typography variant='outlined'>
						Consultant: {cellData.consultant.firstName}{' '}
            {cellData.consultant.lastName}
					</Typography> */}

					<TextField
						label='Consultant'
						variant='outlined'
						value={formData.consultantId}
						onChange={handleInputChange}
						fullWidth
						select
						name='consultantId'
					>
						{consultants?.data?.map(consultant => (
							<MenuItem key={consultant.id} value={consultant.id}>
								{consultant.firstName} {consultant.lastName}
							</MenuItem>
						))}
					</TextField>

					<TextField
						variant='outlined'
						type='number'
						value={formData?.leaderId || cellData.leader.id}
						onChange={handleInputChange}
						name='leaderId'
						label='Leader'
					/>
					<Button
						style={{ color: '#119A48' }}
						onClick={() => editCaL(cellData.id, formData)}
					>
						<Done />
					</Button>
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
