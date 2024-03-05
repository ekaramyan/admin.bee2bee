import { Box, LinearProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useCells from '@/hooks/useCells'
import dynamic from 'next/dynamic'
const RealCell = dynamic(() => import('@/components/UI/RealCell'))

export default function RealCells({ toggleOpen, isRegisterOpen }) {
	const { getCells, loading } = useCells()
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
		<div
			style={{
				padding: '2% 20px',
				height: '100%',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				userSelect: 'none',
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
				{loading ? (
					<LinearProgress />
				) : (
					<>
						{data.map((item, index) => (
							<RealCell key={index} data={item} />
						))}
					</>
				)}
			</Box>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					justifySelf: 'end',
					position: 'relative',
					height: 50,
					width: 80,
				}}
			>
				<Typography
					variant='auth_head'
					gutterBottom
					onClick={toggleOpen}
					style={{
						transform: 'rotate(90deg) translateY(-80%) translateX(100%)',
						top: '-300%',
						left: '0%',
						alignSelf: 'end',
						right: 0,
						color: isRegisterOpen ? '#E06B00' : '#1B170F',
						textShadow: isRegisterOpen
							? '1px 1px 2px #1B170F'
							: '1px 1px 2px #E06B00',
					}}
				>
					Real Cells
				</Typography>
			</div>
		</div>
	)
}
