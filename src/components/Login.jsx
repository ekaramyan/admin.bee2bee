import { Typography } from '@mui/material'
import LoginComponent from './LoginComponent'


export default function Login({ toggleOpen, isLoginOpen }) {
	return (
		<div
			style={{
				padding: '2% 35px',
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
						top: '20%',
						color: isLoginOpen ? '#E06B00' : '#1B170F',
						textShadow: isLoginOpen
							? '1px 1px 2px #1B170F'
							: '1px 1px 2px #E06B00',
					}}
				>
					Members Login
				</Typography>
			</div>
			<LoginComponent />
		</div>
	)
}
