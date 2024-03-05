import {
	Box,
	CircularProgress,
	Grid,
	TextField,
	useMediaQuery,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const AuthButton = dynamic(() => import('./UI/AuthButton'))
import useReset from '@/hooks/useReset'

export default function ChangePassForm() {
	const { loading, error, success, getEmail, sendNewPass } = useReset()
	const [iconColors, setIconColors] = useState('#8C7F77')

	const handleSubmit = async event => {
		event.preventDefault()
		const email = event.target.email.value.toLowerCase()
		getEmail(email)
	}

	return (
		<>
			<Box
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 20,
					padding: '20px 10px',
				}}
			>
				<form
					onSubmit={handleSubmit}
					style={{
						display: 'flex',
						flex: '3',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 20,
					}}
				>
					<Box item xs={12} style={{ display: 'flex', gap: 20 }}>
						<TextField
							label={
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 5,
									}}
								>
									<EmailOutlinedIcon sx={{ color: iconColors }} />
									Email
								</Box>
							}
							variant='standard'
							fullWidth
							type='email'
							name='email'
							onFocus={() => setIconColors('action')}
							onBlur={() => setIconColors('#8C7F77')}
						/>
					</Box>

					<Grid
						item
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: '100%',
							alignSelf: 'end',
						}}
					>
						{loading ? (
							<CircularProgress />
						) : (
							<AuthButton type='submit'>Send email</AuthButton>
						)}
					</Grid>
				</form>
				{error ? (
					<div>{error}</div>
				) : success ? (
					<div>Successfully sent email for password reset!</div>
				) : (
					<></>
				)}
			</Box>
		</>
	)
}
