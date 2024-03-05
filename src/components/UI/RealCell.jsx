import { Grid, Box, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import cell from '@/assets/img/join_cell_bg.svg'

export default function RealCell({ data }) {
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	return (
		<Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
			<Grid
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					rowGap: 20,
				}}
			>
				{data && data[0] && (
					<Typography variant='level_dark' style={{ minWidth: 195 }}>
						{data[0]?.cellLevel.level} {data[0]?.cellLevel.price}$
					</Typography>
				)}
				<Grid
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 0.7fr)',
						gap: 10,
					}}
				>
					{data.map((item, index) => (
						<Link
							key={index}
							href={`/cells/${item.cellLevel.id}/info/${item.id}`}
						>
							<div
								style={{
									background: `url(${cell.src}) no-repeat center / contain`,
									width: isMobile ? 90 : 115,
									height: isMobile ? 90 : 115,
									padding: '20%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
								}}
							>
								<Typography variant='real_cells_queue'>
									№{index + 1} <br /> {item.cellLevel.level.slice(0, 1)}-#
									{item.id}
								</Typography>
							</div>
						</Link>
					))}
				</Grid>
			</Grid>
		</Box>
	)
}
