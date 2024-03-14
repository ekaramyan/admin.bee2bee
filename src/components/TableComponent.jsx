import React from 'react'
import { Table, TableHead, TableRow, TableCell } from '@mui/material'
import TableItem from './UI/TableItem'

export default function TableComponent({ users }) {
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>ID</TableCell>
					<TableCell>Nickname</TableCell>
					<TableCell>Email</TableCell>
					<TableCell>Levels</TableCell>
					<TableCell>Cells</TableCell>
					<TableCell>Actions</TableCell>
				</TableRow>
			</TableHead>
			<tbody>
				{users?.map((user, index) => (
					<TableItem key={index} item={user} />
				))}
			</tbody>
		</Table>
	)
}
