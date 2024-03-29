import { TableRow, TableCell, Button } from '@mui/material'
import { Delete, EditNote } from '@mui/icons-material'

export default function TableItem({
	item,
	handleOpenModal,
	handleOpenEditModal,
	onDeleteClick,
	onEditClick,
}) {
	const { id, nickname, email, levels, cellCount } = item

	const formattedLevels = [...levels].join(', ')

	return (
		<>
			<TableRow>
				<TableCell>{id}</TableCell>
				<TableCell>{nickname}</TableCell>
				<TableCell>{email}</TableCell>
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
