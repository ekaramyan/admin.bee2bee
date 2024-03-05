import { Typography } from '@mui/material'
import MyCellsComponent from './MyCellsComponent'

export default function MyCells({ toggleOpen, isLoginOpen }) {
	return (
		<div
			style={{
				padding: '2% 20px',
				height: '100%',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<div
				style={{
					flex: '1',
					position: 'relative',
					height: '100%',
				}}
			>
				<Typography
					variant='auth_head'
					gutterBottom
					onClick={toggleOpen}
					style={{
						top: '8%',
						color: isLoginOpen ? '#E06B00' : '#1B170F',
						transform: 'rotate(-90deg) translateY(49%) translateX(25%)',
						textShadow: isLoginOpen
							? '1px 1px 2px #1B170F'
							: '1px 1px 2px #E06B00',
					}}
				>
					My Cells
				</Typography>
			</div>
			<MyCellsComponent isOpen={isLoginOpen} />
		</div>
	)
}
