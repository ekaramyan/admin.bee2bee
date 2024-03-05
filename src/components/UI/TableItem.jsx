import React from 'react'
import { TableRow, TableCell, Button } from '@mui/material'

export default function TableItem({ item }) {
	const { id, nickname, email, levels, cellCount } = item

	const handleEdit = () => {
		// Обработчик для действия редактирования пользователя
	}

	const handleDelete = () => {
		// Обработчик для действия удаления пользователя
	}
	const formattedLevels = [...levels].join(', ')

	return (
		<TableRow>
			<TableCell>{id}</TableCell>
			<TableCell>{nickname}</TableCell>
			<TableCell>{email}</TableCell>
			<TableCell>{formattedLevels}</TableCell>
			<TableCell>{cellCount}</TableCell>
			<TableCell>
				<Button variant='outlined' onClick={handleEdit}>
					Edit
				</Button>
				<Button variant='outlined' onClick={handleDelete}>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	)
}
