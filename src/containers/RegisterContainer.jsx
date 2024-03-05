import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
import Wrapper from '../components/UI/Wrapper'
const RegisterComponent = dynamic(() =>
	import('@/components/RegisterComponent')
)

export default function RegisterContainer() {
	return (
		<Wrapper header={'register'}>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 30,
					height: '100%',
					overflow: 'auto',
				}}
			>
				<RegisterComponent />
			</Box>
		</Wrapper>
	)
}
