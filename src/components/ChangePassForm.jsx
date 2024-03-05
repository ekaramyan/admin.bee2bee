import {
	Box,
	Grid,
	Typography,
	TextField,
	useMediaQuery,
	InputAdornment,
	IconButton,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const AuthButton = dynamic(() => import('./UI/AuthButton'))

export default function ChangePassForm({
	isChange,
	handleSubmit,
	error,
	success,
	invalid,
}) {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [iconColors, setIconColors] = useState({
		password: '#8C7F77',
		confirmPassword: '#8C7F77',
	})

	const handleIconFocus = iconName => {
		setIconColors(prevColors => ({ ...prevColors, [iconName]: 'action' }))
	}

	const handleIconBlur = iconName => {
		setIconColors(prevColors => ({ ...prevColors, [iconName]: '#8C7F77' }))
	}

	const handlePasswordToggle = () => {
		setShowPassword(prevShow => !prevShow)
	}

	const handleConfirmPasswordToggle = () => {
		setShowConfirmPassword(prevShow => !prevShow)
	}
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	return (
		<>
			<Box
				style={{
					width: '100%',
					height: '90%',
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
						flex: '3',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 20,
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
						<TextField
							label={
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 5,
									}}
								>
									<LockOutlinedIcon
										sx={{ color: iconColors.confirmPassword }}
									/>
									Confirm Password
								</Box>
							}
							variant='standard'
							fullWidth
							type={showConfirmPassword ? 'text' : 'password'}
							name='passwordConfirmation'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton onClick={handleConfirmPasswordToggle}>
											{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							onFocus={() => handleIconFocus('confirmPassword')}
							onBlur={() => handleIconBlur('confirmPassword')}
						/>
					</Box>

					<Grid
						item
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: isMobile ? '100%' : '50%',
							alignSelf: isMobile ? 'center' : 'end',
						}}
					>
						<AuthButton type='submit'>Change Password</AuthButton>
					</Grid>

					{isChange && (
						<Grid
							item
							xs={12}
							style={{
								display: 'flex',
								flexDirection: isMobile ? 'column' : 'row',
								justifyContent: 'center',
								alignSelf: 'end',
							}}
						>
							<Typography variant='forgot'>Forgot Your Password?</Typography>
							<Link href='/auth/reset' style={{ color: '#E06B00' }}>
								Reset It Here
							</Link>
						</Grid>
					)}
				</form>
				{error && <div>{error}</div>}
				{success && <div>Successfully changed password!</div>}
				{invalid && <p>{invalid}</p>}
			</Box>
		</>
	)
}
