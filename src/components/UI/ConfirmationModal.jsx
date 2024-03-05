import React from 'react'
import {
	Box,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
} from '@mui/material'
import AuthButton from './AuthButton'

const ConfirmationModal = ({
	open,
	handleClose,
	handleConfirm,
	title,
	isLoading,
	children,
}) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			BackdropProps={{
				style: {
					backdropFilter: 'grayscale(30%)',
				},
			}}
			PaperProps={{
				style: {
					background: '#E06B00',
					borderRadius: 74,
					border: '10px solid #A5560F',
					overflow: 'hidden',
					padding: 15,
					aspectRatio: '1.1/1',
					minHeight: 400,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				},
			}}
		>
			<DialogTitle style={{ color: '#fff', textAlign: 'center', fontSize: 25 }}>
				{title}
			</DialogTitle>
			<DialogContent
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					overflow: 'hidden',
				}}
			>
				<DialogContentText
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{children}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Box style={{ display: 'flex', gap: 10 }}>
					<AuthButton
						onClick={handleClose}
						style={{
							background: '#FF0000',
							width: '100%',
						}}
					>
						Cancel
					</AuthButton>
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{isLoading ? (
							<CircularProgress />
						) : (
							<AuthButton
								onClick={handleConfirm}
								style={{
									background: '#119A48',
									width: '100%',
								}}
								autoFocus
							>
								Confirm
							</AuthButton>
						)}
					</Box>
				</Box>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmationModal
