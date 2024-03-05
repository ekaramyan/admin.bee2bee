import { Typography } from '@mui/material'
import RegisterComponent from './RegisterComponent'

export default function Register({ toggleOpen, isRegisterOpen }) {
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
			<RegisterComponent />
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
						transform: 'rotate(90deg) translateY(-88%) translateX(100%)',
						top: '-350%',
						left: '0%',
						alignSelf: 'end',
						right: 0,
						color: isRegisterOpen ? '#E06B00' : '#1B170F',
						textShadow: isRegisterOpen
							? '1px 1px 2px #1B170F'
							: '1px 1px 2px #E06B00',
					}}
				>
					New Members
				</Typography>
			</div>
		</div>
	)
}
