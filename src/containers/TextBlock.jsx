import Wrapper from '@/components/UI/Wrapper'
import { Box, Typography } from '@mui/material'

export default function Rules({ header, text }) {
	return (
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				width: '100%',
			}}
		>
			<Wrapper
				header={header}
				notLoggedIn={true}
				style={{ minHeight: 700 }}
			>
				<Box
					style={{
						maxHeight: '100%',
						overflowY: 'auto',
						padding: '10px',
						'&::-webkit-scrollbar': {
							width: '10px',
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: '#E06B00',
							boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
							webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#000000',
						},
						scrollbarColor: '#000000 #E06B00',
					}}
				>
					<Typography style={{ overflow: 'auto' }}>{text}</Typography>
				</Box>
			</Wrapper>
		</Box>
	)
}
