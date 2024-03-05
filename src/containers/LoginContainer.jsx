import { Box } from '@mui/material'
import Wrapper from '../components/UI/Wrapper'
import LoginComponent from '@/components/LoginComponent'

export default function LoginContainer() {
	return (
		<Wrapper header={'Login'}>
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
				<LoginComponent />
			</Box>
		</Wrapper>
	)
}
