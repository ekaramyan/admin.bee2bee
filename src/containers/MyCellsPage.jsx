import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import Wrapper from '../components/UI/Wrapper'
const MyCellsComponent = dynamic(() => import('@/components/MyCellsComponent'))

export default function MyCells() {
	return (
		<Wrapper header={'My Cells'}>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 30,
					height: '60vh',
				}}
			>
				<MyCellsComponent />
			</Box>
		</Wrapper>
	)
}
