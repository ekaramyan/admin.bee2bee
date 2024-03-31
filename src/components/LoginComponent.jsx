import {
	Box,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	InputAdornment,
	IconButton,
	Typography,
	useMediaQuery,
	CircularProgress,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useLogin from '@/hooks/useLogin'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
const AuthButton = dynamic(() => import('./UI/AuthButton'))
import Link from 'next/link'

export default function LoginComponent() {
	const { login, loading, error, success } = useLogin()
	const [err, setError] = useState(null)

	const router = useRouter()
	const handleSubmit = async event => {
		event.preventDefault()
		const formData = {
			grant_type: '',
			username: event.target.email.value.toLowerCase(),
			password: event.target.password.value,
			scope: '',
			client_id: '',
			client_secret: '',
		}
		login(formData)
		if (success) {
			router.push('/users')
		}
	}
	const [showPassword, setShowPassword] = useState(false)

	const handlePasswordToggle = () => {
		setShowPassword(prevShow => !prevShow)
	}

	const [iconColors, setIconColors] = useState({
		email: '#8C7F77',
		password: '#8C7F77',
	})

	const handleIconFocus = iconName => {
		setIconColors(prevColors => ({ ...prevColors, [iconName]: 'action' }))
	}

	const handleIconBlur = iconName => {
		setIconColors(prevColors => ({ ...prevColors, [iconName]: '#8C7F77' }))
	}

	const isMobile = useMediaQuery('@media(max-width:1300px)')

	return (
		<Box
			style={{
				width: '75%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 20,
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: isMobile ? 'column' : 'row',
					flex: '3',
					flexDirection: 'column',
					gap: 10,
				}}
			>
				<Box
					item
					xs={12}
					style={{
						display: 'flex',
						flexDirection: isMobile ? 'column' : 'row',
						gap: 20,
					}}
				>
					<TextField
						label={
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 5,
								}}
							>
								<EmailOutlinedIcon sx={{ color: iconColors.email }} />
								Email
							</Box>
						}
						variant='standard'
						fullWidth
						type='email'
						name='email'
						onFocus={() => handleIconFocus('email')}
						onBlur={() => handleIconBlur('email')}
					/>
					<TextField
						label={
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 5,
								}}
							>
								<LockOutlinedIcon sx={{ color: iconColors.password }} />
								Password
							</Box>
						}
						variant='standard'
						fullWidth
						type={showPassword ? 'text' : 'password'}
						name='password'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={handlePasswordToggle}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						onFocus={() => handleIconFocus('password')}
						onBlur={() => handleIconBlur('password')}
					/>
				</Box>

				<Box
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: isMobile ? 'column' : 'row',
						width: '100%',
						flex: 1,
						columnGap: 15,
					}}
				>
					<Grid
						item
						style={{
							width: '50%',
							display: 'flex',
							justifyContent: 'center',
						}}
					></Grid>

					<Grid
						item
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: isMobile ? '100%' : '50%',
						}}
					>
						<FormControlLabel
							control={<Checkbox name='remember' color='primary' />}
							label='Remember me'
						/>
						<Box
							style={{
								display: 'flex',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{loading ? (
								<CircularProgress />
							) : (
								<AuthButton type='submit' style={{ width: '100%' }}>
									Login
								</AuthButton>
							)}
						</Box>
					</Grid>
				</Box>

				<Grid
					item
					xs={12}
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Typography variant='forgot'>
						Forgot Your Password?
						<Link href='/auth/reset' style={{ color: '#E06B00' }}>
							Reset It Here
						</Link>
					</Typography>
				</Grid>
			</form>
			{(error || err) && <div>{error || err}</div>}
			{success && <div>Successfully signed in!</div>}
		</Box>
	)
}
