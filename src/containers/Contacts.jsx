import {
	Box,
	Typography,
	Grid,
	TextField,
	FormControlLabel,
	Checkbox,
	useMediaQuery,
} from '@mui/material'
import { styled } from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import ReCAPTCHA from 'react-google-recaptcha'
import Wrapper from '@/components/UI/Wrapper'
import useContact from '@/hooks/useContact'
const AuthButton = dynamic(() => import('@/components/UI/AuthButton'))
const Socials = dynamic(() => import('@/components/UI/Socials'))

const FlexBox = styled(Box)`
	display: flex;
	gap: 20px;
	width: 100%;
`

export default function Contacts() {
	const captchaKey = process.env.CAPTCHA_KEY
	const { sendContactForm, loading, error, success } = useContact()
	const [iconColors, setIconColors] = useState({
		name: '#8C7F77',
		lastName: '#8C7F77',
		email: '#8C7F77',
		subject: '#8C7F77',
		message: '#8C7F77',
	})
	const [validationError, setValidationError] = useState(null)

	const handleIconFocus = iconName => {
		setIconColors(prevColors => ({ ...prevColors, [iconName]: 'action' }))
	}

	const handleIconBlur = iconName => {
		setIconColors(prevColors => ({ ...prevColors, [iconName]: '#8C7F77' }))
	}
	const [captchaValue, setCaptchaValue] = useState(null)

	const handleCaptchaChange = value => {
		setCaptchaValue(value)
	}
	const handleSubmit = async event => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const data = {
			email: formData.get('email'),
			firstName: formData.get('name'),
			lastName: formData.get('last name'),
			subject: formData.get('subject'),
			text: formData.get('message'),
			isConfirmationSent: formData.get('send_me') === 'on',
		}

		if (
			!data.email ||
			!data.firstName ||
			!data.lastName ||
			!data.subject ||
			!data.text
		) {
			setValidationError('Please fill all fields')
			return
		}
		if (!captchaValue) {
			setValidationError('Please pass captcha')
			return
		}

		await sendContactForm(data)
	}
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	return (
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				minHeight: 700,
			}}
		>
			<Wrapper
				header={'Contact us'}
				notLoggedIn={true}
				style={{ minHeight: 700 }}
			>
				<Typography>If you have any questions fill this form</Typography>
				<Grid
					sx={{
						display: isMobile ? 'flex' : 'grid',
						flexDirection: 'column',
						gridTemplateColumns: '1fr 1fr',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingBottom: isMobile && '20%',
					}}
				>
					<form
						onSubmit={handleSubmit}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 15,
							flex: 1,
							flexDirection: 'column',
							width: '100%',
						}}
					>
						<Grid container gap={1}>
							<Box
								item
								xs={12}
								style={{
									display: 'flex',
									flexDirection: isMobile ? 'column' : 'row',
									gap: 20,
									width: '100%',
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
											<PermIdentityOutlinedIcon
												sx={{ color: iconColors.name }}
											/>
											Name
										</Box>
									}
									variant='standard'
									fullWidth
									type='text'
									name='name'
									required
									InputLabelProps={{
										required: false,
									}}
									onFocus={() => handleIconFocus('name')}
									onBlur={() => handleIconBlur('name')}
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
											<PersonAddOutlinedIcon
												sx={{ color: iconColors.lastName }}
											/>
											Last name
										</Box>
									}
									variant='standard'
									fullWidth
									type='text'
									name='last name'
									required
									InputLabelProps={{
										required: false,
									}}
									onFocus={() => handleIconFocus('lastName')}
									onBlur={() => handleIconBlur('lastName')}
								/>
							</Box>
							<Box
								item
								xs={12}
								style={{
									display: 'flex',
									flexDirection: isMobile ? 'column' : 'row',
									gap: 20,
									width: '100%',
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
									required
									InputLabelProps={{
										required: false,
									}}
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
											<SubjectOutlinedIcon sx={{ color: iconColors.subject }} />
											Subject
										</Box>
									}
									variant='standard'
									fullWidth
									type='text'
									name='subject'
									required
									InputLabelProps={{
										required: false,
									}}
									onFocus={() => handleIconFocus('subject')}
									onBlur={() => handleIconBlur('subject')}
								/>
							</Box>
							<FlexBox item xs={12}>
								<TextField
									label={
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: 5,
											}}
										>
											<DriveFileRenameOutlineOutlinedIcon
												sx={{ color: iconColors.message }}
											/>
											Your message text
										</Box>
									}
									name='message'
									fullWidth
									variant='standard'
									color='primary'
									multiline
									rows={3}
									required
									InputLabelProps={{
										required: false,
									}}
									onFocus={() => handleIconFocus('message')}
									onBlur={() => handleIconBlur('message')}
								></TextField>
							</FlexBox>
							<Box
								sx={{
									display: 'flex',
									flexDirection: isMobile ? 'column' : 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									alignItems: 'center',
									width: '100%',
									flex: 1,
								}}
							>
								<Grid
									item
									style={{
										width: '50%',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<div style={{ transform: 'scale(0.8)' }}>
										<ReCAPTCHA
											sitekey={captchaKey}
											theme='light'
											size='normal'
											onChange={handleCaptchaChange}
										/>
									</div>
								</Grid>
								<Grid
									item
									sx={{
										display: 'flex',
										flexDirection: 'column',
										width: isMobile ? '100%' : '50%',
										alignItems: isMobile && 'center',
										gap: 2,
									}}
								>
									<FormControlLabel
										control={<Checkbox name='send_me' color='primary' />}
										label='Send Me Conformation Email'
									/>
									<AuthButton type='submit'>submit form</AuthButton>
								</Grid>
							</Box>
						</Grid>
						{validationError && (
							<Typography variant='body1'>{validationError}</Typography>
						)}
					</form>
					{!isMobile && (
						<Box
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 20,
							}}
						>
							<>
								<Typography variant='level_dark'>Social Media</Typography>
								<Socials width={30} height={30} />
							</>
						</Box>
					)}
				</Grid>
			</Wrapper>
		</Box>
	)
}
