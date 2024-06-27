import React from 'react'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function Paginator({ totalPages, currentPage, onPageChange }) {
	const handleChange = (event, value) => {
		onPageChange(value)
	}
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 2,
			}}
		>
			<Stack spacing={2}>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handleChange}
					boundaryCount={1}
					siblingCount={2}
					color='primary'
				/>
			</Stack>
		</Box>
	)
}
