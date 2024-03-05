import { useRouter } from 'next/router'
import {
	Box,
	Typography,
	Select,
	MenuItem,
	useMediaQuery,
	LinearProgress,
	TextField,
} from '@mui/material'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import ImageCompression from 'browser-image-compression'
import { useDispatch } from 'react-redux'
import countryList from '@/countryList'
import useUploadPhoto from '@/hooks/useUploadPhoto'
import useUpdateUser from '@/hooks/useUpdateUser'
const AuthButton = dynamic(() => import('./UI/AuthButton'))
const UserAvatar = dynamic(() => import('./UI/UserAvatar'))
import avatarBg from '@/assets/img/user_avatar_big.svg'

export default function EditAccount({ onChangeClick, onResetClick, data }) {
	const { upload, loading, error, success } = useUploadPhoto()
	const { update, load, err, suc } = useUpdateUser()
	const [previewImage, setPreviewImage] = useState(null)
	const [compressedFileObject, setCompressedFileObject] = useState(null)
	const [formData, setFormData] = useState({
		firstName: data?.firstName || '',
		lastName: data?.lastName || '',
		birth: data?.birth || Date(''),
		id: data?.id || '',
		email: data?.email || '',
		country: data?.country || '',
		nickname: data?.nickname || '',
		phone: data?.phone || '',
		telegram: data?.telegram || '',
		additionalEmail: data?.additionalEmail || '',
		additionalTelegram: data?.additionalTelegram || '',
	})
	const [validationError, setValidationError] = useState(null)
	const dispatch = useDispatch()
	const handleImageChange = async e => {
		const file = e.target.files[0]
		if (file) {
			try {
				const options = {
					maxSizeMB: 0.1,
					maxWidthOrHeight: 900,
					useWebWorker: true,
				}

				const compressedFile = await ImageCompression(file, options)
				setCompressedFileObject(compressedFile)
				setPreviewImage(URL.createObjectURL(compressedFile))
			} catch (error) {
				console.error('Error during image compression:', error)
			}
		}
	}

	const handleConfirmPhoto = () => {
		if (compressedFileObject) {
			upload(compressedFileObject)
			if (success) {
				setPreviewImage(null)
			}
		}
	}

	const validateDateOfBirth = date => {
		const birthDate = new Date(date)
		const today = new Date()
		const year1900 = new Date('1900-01-01')
		const sixteenYearsAgo = new Date(
			today.getFullYear() - 16,
			today.getMonth(),
			today.getDate()
		)
		return birthDate >= year1900 && birthDate <= sixteenYearsAgo
	}

	const onSaveClick = async e => {
		e.preventDefault()
		handleConfirmPhoto()
		if (!validateDateOfBirth(formData.birth)) {
			setValidationError('You must be older than 16 years')
		} else {
			update(formData)
		}

		const newAvatarUrl = String(Math.random())
		dispatch({ type: 'SET_AVATAR_URL', payload: newAvatarUrl })
	}

	const handleInputChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
		e.target.size = e.target.value.length || 1
	}

	const isMobile = useMediaQuery('@media(max-width:1300px)')

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 1,
				}}
			>
				<div
					style={{
						position: 'relative',
						width: '174px',
						height: '204px',
						backgroundImage: `url(${avatarBg.src})`,
						zIndex: 2,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<UserAvatar
						previewImage={previewImage}
						avatarUrl='/users/me/photo'
						width={158}
						height={184}
						isClickable={true}
						clickUrl=''
					/>
					<div
						style={{
							position: 'absolute',
							bottom: 10,
							right: 10,
							width: '50px',
							height: '50px',
							overflow: 'hidden',
							borderRadius: '50%',
						}}
					>
						<input
							type='file'
							onChange={handleImageChange}
							style={{
								cursor: 'pointer',
								position: 'absolute',
								top: 0,
								left: 0,
								opacity: 0,
								width: '100%',
								height: '100%',
							}}
						/>
						<div
							style={{
								width: '100%',
								height: '100%',
								backgroundColor: 'green',
								position: 'relative',
								pointerEvents: 'none',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									color: 'white',
									fontWeight: 'bold',
									fontSize: '24px',
								}}
							>
								+
							</div>
						</div>
					</div>
				</div>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography variant='h6'>
						{data.firstName} {data.lastName}
					</Typography>
					{/* <Box
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 10,
						}}
					>
						<input
							type='text'
							value={formData?.firstName}
							onChange={handleInputChange}
							name='firstName'
							size={formData?.firstName?.length || 1}
							style={{
								textAlign: 'end',
								display: 'flex',
								width: '100%',
								background: 'none',
								border: 'none',
								borderBottom: '1px solid transparent',
								outline: 'none',
								color: '#119A48',
								fontSize: 36,
								fontWeight: 700,
								textTransform: 'uppercase',
							}}
						/>
						<input
							type='text'
							value={formData?.lastName}
							onChange={handleInputChange}
							name='lastName'
							size={formData?.lastName?.length || 1}
							style={{
								textAlign: 'start',
								display: 'flex',
								width: '100%',
								background: 'none',
								border: 'none',
								borderBottom: '1px solid transparent',
								outline: 'none',
								color: '#119A48',
								fontSize: 36,
								fontWeight: 700,
								textTransform: 'uppercase',
							}}
						/>
					</Box> */}
					<Box
						style={{
							display: 'flex',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Typography variant='date'>Date of Birth: {data?.birth}</Typography>
						{/* <TextField
							variant='standard'
							fullWidth
							type='date'
							name='birth'
							value={formData?.birth}
							onChange={handleInputChange}
							InputLabelProps={{ shrink: true }}
							sx={{
								width: '50%',
								background: 'none',
								border: 'none',
								borderBottom: '0 !important',
								outline: 'none',
								paddingLeft: 2,
							}}
						>
							{data?.birth}
						</TextField> */}
					</Box>
				</Box>
				<form style={{ width: isMobile ? '100%' : '60%', marginTop: 5 }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 2,
							width: '100%',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: isMobile ? 'column' : 'row',
								justifyContent: 'center',
								alignItems: isMobile ? 'flex-start' : 'center',
								gap: 2,
								width: '100%',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: isMobile ? 'flex-start' : 'flex-end',
									gap: 1,
									width: isMobile ? '100%' : '50%',
									paddingRight: 2,
								}}
							>
								<Typography variant='user_key' display='flex' gap={1}>
									User #:
									<Typography variant='user_item'>{data?.id}</Typography>
								</Typography>
								<Typography variant='user_key' display='flex' gap={1}>
									Email:
									<Typography variant='user_item'>{data?.email}</Typography>
								</Typography>
								<Typography variant='user_key' display='flex' gap={1}>
									Phone:
									<Typography variant='user_item'>{data?.phone}</Typography>
								</Typography>
								<Typography variant='user_key' display='flex' gap={1}>
									Telegram:
									<Typography variant='user_item'>{data?.telegram}</Typography>
								</Typography>

								{/* <label
									style={{
										display: 'flex',
										width: '100%',
										alignItems: 'center',
										whiteSpace: isMobile ? 'wrap' : 'nowrap',
										color: '#1B170F',
										fontFamily: 'Noto Sans',
										fontSize: 20,
										fontWeight: 400,
									}}
								>
									Phone:
									<input
										type='tel'
										value={formData?.phone}
										onChange={handleInputChange}
										name='phone'
										size={formData?.phone?.length || 1}
										style={{
											width: '100%',
											background: 'none',
											border: 'none',
											borderBottom: '1px solid transparent',
											outline: 'none',
											color: '#119A48',
											fontSize: 20,
											fontWeight: 700,
										}}
									/>
								</label> */}
								{/* <label
									style={{
										display: 'flex',
										width: '100%',
										alignItems: 'center',
										whiteSpace: isMobile ? 'wrap' : 'nowrap',
										color: '#1B170F',
										fontFamily: 'Noto Sans',
										fontSize: 20,
										fontWeight: 400,
									}}
								>
									Telegram:
									<input
										type='text'
										value={formData?.telegram}
										onChange={handleInputChange}
										name='telegram'
										size={formData?.telegram?.length || 1}
										style={{
											width: '100%',
											background: 'none',
											border: 'none',
											borderBottom: '1px solid transparent',
											outline: 'none',
											color: '#119A48',
											fontSize: 20,
											fontWeight: 700,
										}}
									/>
								</label> */}
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: isMobile ? 'flex-start' : 'start',
									gap: 0.5,
									width: isMobile ? '100%' : '50%',
								}}
							>
								<Typography variant='user_key' display='flex' gap={1}>
									Nickname:
									<Typography variant='user_item'>{data?.nickname}</Typography>
								</Typography>
								{/* <label
									style={{
										display: 'flex',
										width: '100%',
										alignItems: 'center',
										whiteSpace: isMobile ? 'wrap' : 'nowrap',
										color: '#1B170F',
										fontFamily: 'Noto Sans',
										fontSize: 20,
										fontWeight: 400,
									}}
								>
									Nickname:
									<input
										type='text'
										value={formData?.nickname}
										onChange={handleInputChange}
										name='nickname'
										size={formData?.nickname?.length || 1}
										style={{
											width: '100%',
											background: 'none',
											border: 'none',
											borderBottom: '1px solid transparent',
											outline: 'none',
											color: '#119A48',
											fontSize: 20,
											fontWeight: 700,
										}}
									/>
								</label> */}

								<label
									style={{
										display: 'flex',
										width: '100%',
										alignItems: 'center',
										whiteSpace: 'nowrap',
										color: '#1B170F',
										fontFamily: 'Noto Sans',
										fontSize: 20,
										fontWeight: 400,
									}}
								>
									Add. Email:
									<input
										type='text'
										value={formData?.additionalEmail}
										onChange={handleInputChange}
										name='additionalEmail'
										size={formData?.additionalEmail?.length || 1}
										style={{
											width: '100%',
											background: 'transparent',
											border: 'none',
											borderBottom: '1px solid transparent',
											outline: 'none',
											color: '#119A48',
											fontSize: 20,
											fontWeight: 700,
										}}
									/>
								</label>
								{/* <label
									style={{
										display: 'flex',
										alignItems: 'center',
										width: '100%',
										color: '#1B170F',
										fontFamily: 'Noto Sans',
										fontSize: 20,
										fontWeight: 400,
									}}
								>
									Country:
									<Select
										label={formData?.country}
										disableUnderline
										variant='standard'
										value={formData?.country}
										onChange={handleInputChange}
										fullWidth
										type='select'
										name='country'
										size={formData?.country?.length || 1}
										sx={{
											width: '100%',
											background: 'none',
											border: 'none',
											borderBottom: '0 !important',
											outline: 'none',
											'#mui-component-select-country': {
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'flex-start',
												width: '100%',
												color: '#119A48',
												fontSize: 20,
												fontWeight: 700,
											},
											paddingLeft: 2,
										}}
									>
										{countryList.map(country => (
											<MenuItem key={country.code} value={country.name}>
												{country.name}
											</MenuItem>
										))}
									</Select>
								</label> */}
								<Typography variant='user_key' display='flex' gap={1}>
									Country:
									<Typography variant='user_item'>{data?.country}</Typography>
								</Typography>
								<label
									style={{
										display: 'flex',
										width: '100%',
										alignItems: 'center',
										whiteSpace: isMobile ? 'wrap' : 'nowrap',
										color: '#1B170F',
										fontFamily: 'Noto Sans',
										fontSize: 20,
										fontWeight: 400,
									}}
								>
									Add. Telegram:
									<input
										type='text'
										value={formData?.additionalTelegram}
										onChange={handleInputChange}
										name='additionalTelegram'
										size={formData?.additionalTelegram?.length || 1}
										style={{
											width: '100%',
											background: 'none',
											border: 'none',
											borderBottom: '1px solid transparent',
											outline: 'none',
											color: '#119A48',
											fontSize: 20,
											fontWeight: 700,
										}}
									/>
								</label>
							</Box>
						</Box>
						{validationError && (
							<Typography variant=''>{validationError}</Typography>
						)}

						<Box
							style={{
								width: isMobile ? '80%' : '100%',
								display: 'flex',
								flexDirection: 'column',
								gap: 8,
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: isMobile ? 'column' : 'row',
									justifyContent: 'center',
									alignItems: 'center',
									gap: isMobile ? 1 : 5,
									width: isMobile ? 'none' : '100%',
								}}
							>
								<AuthButton
									variant='contained'
									onClick={onChangeClick}
									style={{
										background: '#119A48',
										width: isMobile ? '100%' : '50%',
									}}
								>
									Change your password
								</AuthButton>
								<AuthButton
									variant='contained'
									onClick={onResetClick}
									style={{
										background: '#FF6B00',
										width: isMobile ? '100%' : '50%',
									}}
								>
									Reset your password
								</AuthButton>
							</Box>
							<Box
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									gap: isMobile ? 2 : 5,
									width: isMobile ? 'none' : '100%',
								}}
							>
								<AuthButton
									variant='contained'
									onClick={onSaveClick}
									type='submit'
									style={{
										background: '#A5560F',
										width: isMobile ? '100%' : '50%',
									}}
								>
									Save changes
								</AuthButton>
							</Box>
						</Box>
					</Box>
				</form>
				<Box sx={{ width: '80%', marginTop: 2 }}>
					{(load || loading) && <LinearProgress />}
				</Box>
			</Box>
		</>
	)
}
