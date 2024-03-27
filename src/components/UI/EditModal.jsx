import { useEffect } from 'react'
import {
	Modal,
	TextField,
	Checkbox,
	FormControlLabel,
	IconButton,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import AuthButton from './AuthButton'

export default function EditModal({
	open,
	id,
	title,
	formData,
	setFormData,
	handleConfirm,
	handleClose,
}) {
	const handleChange = name => event => {
		setFormData({ ...formData, [name]: event.target.value })
	}
	useEffect(() => {
		console.log(formData)
	}, [formData, setFormData])
	const handleSaveChanges = async () => {
		await handleConfirm(id, formData)
		await handleClose()
	}

	const getInputField = (type, name) => {
		switch (type) {
			case 'boolean':
				return (
					<FormControlLabel
						style={{ width: '100%' }}
						control={
							<Checkbox
								checked={formData[name] || false}
								onChange={handleChange(name)}
							/>
						}
						label={name}
					/>
				)
			case 'string':
				return (
					<TextField
						style={{ width: '100%' }}
						label={name}
						value={formData[name] || ''}
						onChange={handleChange(name)}
					/>
				)
			case 'number':
				return (
					<TextField
						style={{ width: '100%' }}
						type='number'
						label={name}
						value={formData[name] || ''}
						onChange={handleChange(name)}
					/>
				)
			default:
				return null
		}
	}

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
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
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
				{Object.keys(formData).map((name, index) => (
					<div
						key={name}
						style={{
							gridColumn: index % 2 === 0 ? '1 / span 1' : '2 / span 1',
							width: '100%',
						}}
					>
						{getInputField(typeof formData[name], name)}
					</div>
				))}
				<div style={{ gridColumn: '1 / span 2', textAlign: 'center' }}>
					<AuthButton onClick={handleSaveChanges}>Save Changes</AuthButton>
				</div>
			</div>
		</Modal>
	)
}
