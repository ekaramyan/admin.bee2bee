import { Box, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import CellBoxElement from './CellBoxElement'

export default function DataBox({
	title,
	data,
	style,
	isNotClickable,
	showQueue,
}) {
	const defaultStyle = {
		width: '100%',
	}
	const combinedStyle = { ...defaultStyle, ...style }
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	return (
		<Box style={combinedStyle}>
			<Typography
				variant={isMobile ? 'join_cells_titles_mobile' : 'join_cells_titles'}
			>
				{title} - {data?.data?.length}
			</Typography>
			<Box
				className='ScrollbarWhite'
				style={{
					background: isMobile ? '#E06B00' : '#FFFFFF1A',
					minHeight: 120,
					maxHeight: 120,
					width: '100%',
					overflowY: 'auto',
					borderRadius: 5,
					padding: isMobile ? '5px 12px' : 3,
				}}
			>
				{data?.data &&
					data.data.map((cell, index) =>
						isNotClickable ? (
							<CellBoxElement
								key={cell.id}
								data={cell}
								isActive={null}
								isWhite={true}
								index={index}
								showQueue={showQueue}
							/>
						) : (
							<Link
								key={cell.id}
								href={`/cells/${cell.cellLevel.id}/info/${cell.id}`}
							>
								<CellBoxElement
									data={cell}
									isActive={null}
									isWhite={true}
									index={index}
									showQueue={showQueue}
								/>
							</Link>
						)
					)}
			</Box>
		</Box>
	)
}
