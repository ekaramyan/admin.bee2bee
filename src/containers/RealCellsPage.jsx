import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import useRealCells from '@/hooks/useRealCells'
import Wrapper from '../components/UI/Wrapper'
const RealCell = dynamic(() => import('@/components/UI/RealCell'))

export default function RealCells() {
	const { getCells } = useRealCells()
	const [data, setData] = useState([])

	useEffect(() => {
		const numberOfLevels = 5
		const tempData = []

		const fetchData = async () => {
			for (let i = 1; i <= numberOfLevels; i++) {
				const dataForLevel = await getCells('real_cells', { levelId: i })
				tempData.push(dataForLevel?.data || [])
			}
			setData(tempData)
		}

		fetchData()
	}, [])
	return (
		<Wrapper header={'Real Cells'}>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 35,
					height: '100%',
				}}
			>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 10,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{data.map((item, index) => (
						<RealCell key={index} data={item} />
					))}
				</Box>
			</Box>
		</Wrapper>
	)
}
