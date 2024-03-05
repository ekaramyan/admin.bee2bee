import Image from 'next/image'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import defaultAvatar from '../../assets/img/default.jpg'
import nullUser from '../../assets/img/square.webp'
import { CircularProgress, Box } from '@mui/material'

export default function UserAvatar({
	previewImage,
	avatarUrl = null,
	width = 157,
	height = 181,
	isLeader = false,
	isClickable = false,
	clickUrl = '/account',
	style,
}) {
	const [avatar, setAvatar] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')
	const router = useRouter()
	const { cellId } = router.query
	const dispatch = useDispatch()
	const avatarReload = useSelector(state => state.user.avatarUrl)
	const isLoggedIn = useSelector(state => state.user.loggedIn)
	const isFirstLoad = useSelector(state => state.user.isFirstLoad)
	useEffect(() => {
		const fetchDataAsync = async () => {
			try {
				if (avatarUrl) {
					const url = `${apiUrl}${avatarUrl}`

					const headers = {
						Authorization: `Bearer ${token}`,
						'Cache-Control': isFirstLoad
							? 'no-cache, no-store, must-revalidate'
							: 'cache, store, must-revalidate',
					}

					const avatarResponse = await axios.get(url, {
						headers: headers,
						responseType: 'blob',
					})

					const objectUrl = URL.createObjectURL(avatarResponse.data)
					setIsLoading(false)
					setAvatar(objectUrl)
					dispatch({ type: 'LOADED' })
				}
				return () => URL.revokeObjectURL(objectUrl)
			} catch (error) {
				if (!error.response || error.response.status !== 404) {
					console.error('Error fetching data: ', error)
				}
			} finally {
				setIsLoading(false)
			}
		}

		if (isLoggedIn) {
			fetchDataAsync()
		}
	}, [cellId, avatarUrl, avatarReload, isLoggedIn, isFirstLoad])
	const avatarStyle = {
		position: 'relative',
		overflow: 'hidden',
		clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
		transform: isLeader
			? 'translateY(9px) translateX(10px)'
			: 'translateY(-1px)',
		objectFit: 'cover',
		...style,
	}

	const avatarImage = (
		<>
			{isLoading ? (
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<Image
					src={
						previewImage || avatar || (avatarUrl && defaultAvatar) || nullUser
					}
					width={isClickable ? width : width - 5}
					height={isClickable ? height : height - 5}
					loading='lazy'
					style={avatarStyle}
				/>
			)}
		</>
	)

	if (isClickable) {
		return (
			<Link
				href={clickUrl}
				passHref
				style={{
					position: 'relative',
					width: `${width}px`,
					height: `${height}px`,
					overflow: 'hidden',
					clipPath:
						'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
				}}
			>
				{avatarImage}
			</Link>
		)
	}

	return avatarImage
}
