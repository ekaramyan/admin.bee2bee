import { TableRow, TableCell, Button } from '@mui/material'
import { Delete, EditNote } from '@mui/icons-material'

const formatDate = dateString => {
	const datePart = dateString.split('T')[0]
	const [year, month, day] = datePart.split('-')
	return `${year}-${month}-${day}`
}
const truncateString = str => {
	const maxLength = 24
	if (str.length <= maxLength) {
		return str
	}
	return str.slice(0, maxLength - 3) + '...'
}

export default function TableItem({
	item,
	handleOpenModal,
	handleOpenEditModal,
	onDeleteClick,
	onEditClick,
}) {
	const { id, nickname, createdAt, email, levels, cellCount } = item

	const formattedLevels = [...levels].join(', ')

	return (
		<>
			<TableRow sx={{ fontSize: 12 }}>
				<TableCell>{id}</TableCell>
				<TableCell>{truncateString(nickname)}</TableCell>
				<TableCell>{formatDate(createdAt)}</TableCell>
				<TableCell>{truncateString(email)}</TableCell>
				<TableCell>{formattedLevels}</TableCell>
				<TableCell>{cellCount}</TableCell>
				<TableCell style={{ display: 'flex', gap: 15 }}>
					<Button
						variant='outlined'
						onClick={() => handleOpenEditModal(onEditClick, 'edit', id)}
					>
						<EditNote />
					</Button>
					<Button
						variant='outlined'
						onClick={() => handleOpenModal(onDeleteClick, 'delete', id)}
					>
						<Delete />
					</Button>
				</TableCell>
			</TableRow>
		</>
	)
}
