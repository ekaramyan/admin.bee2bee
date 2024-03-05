import { Box, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const CellBoxElement = dynamic(() => import('./CellBoxElement'))

export default function CellBox({ isActive, data, showQueue = false }) {
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	return (
		<Box
			style={{
				width: isMobile ? '100%' : '40%',
				minWidth: 275,
				marginTop: 15,
			}}
		>
			<Typography variant='my_cells_titles'>
				{isActive ? 'Active' : 'Closed'} cells
			</Typography>
			<Box
				className='ScrollbarOrange'
				style={{
					background: '#fff',
					height: '150px',
					width: '100%',
					minWidth: 150,
					overflowY: 'auto',
					borderRadius: 5,
				}}
			>
				{data?.data &&
					data.data.map((cell, index) => (
						<Link
							key={index}
							href={`/cells/${cell.cellLevel.id}/info/${cell.id}`}
						>
							<CellBoxElement
								data={cell}
								isActive={isActive}
								index={index}
								showQueue={showQueue}
							/>
						</Link>
					))}
			</Box>
		</Box>
	)
}
