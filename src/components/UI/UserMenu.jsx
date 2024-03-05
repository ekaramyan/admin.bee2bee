import {
	List,
	Typography,
	ButtonBase,
	Button,
	Box,
	useMediaQuery,
	// Tooltip,
	// ClickAwayListener,
} from '@mui/material'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useEffect, useState, useCallback } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { fetchData } from '@/api/fetchData'
import account from '@/assets/img/join_cell_bg.svg'
const UserAvatar = dynamic(() => import('./UserAvatar'))
import BurgerMenu from './BurgerMenu'
import logout from '@/assets/img/logout.svg'
import DashboardIcon from '@/assets/img/menu/dashboard.jsx'
import AccountIcon from '@/assets/img/menu/my_account.jsx'
import SettingsIcon from '@/assets/img/menu/settings.jsx'
import FaqIcon from '@/assets/img/menu/faq.jsx'

const tabs = ['users', 'cells', 'archive', 'stats']
const tabNames = {
	users: 'users',
	cells: 'cells',
	archive: 'archive',
	stats: 'stats',
}

export default function UserMenu() {
	const router = useRouter()
	const dispatch = useDispatch()
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')
	const [activeTab, setActiveTab] = useState(router.asPath.split('/')[1])
	const [data, setData] = useState(null)
	const [burgerOpen, setBurgerOpen] = useState(false)
	const [open, setOpen] = useState(false)
	const isMobile = useMediaQuery('@media(max-width: 1300px)')

	// const handleTooltipClose = () => {
	// 	setOpen(false)
	// }

	// const handleTooltipOpen = () => {
	// 	setOpen(true)
	// 	console.log('open!')
	// }
	// const handleTooltipToggle = () => {
	// 	setOpen(!open)
	// }

	const fetchDataAsync = useCallback(async () => {
		try {
			const response = await fetchData(`${apiUrl}/users/me`, token)
			setData(response?.data)
		} catch (error) {
			if (error.status === 401) {
				Cookies.remove('access_token')
				dispatch({ type: 'LOG_OUT' })
			}
			console.error('Error fetching data: ', error)
		}
	}, [apiUrl, token, dispatch])

	useEffect(() => {
		fetchDataAsync()
	}, [fetchDataAsync])

	useEffect(() => {
		setActiveTab(router.asPath.split('/')[1])
	}, [router.asPath])

	const onExitClick = () => {
		Cookies.remove('access_token')
		Cookies.remove('refresh_token')
		dispatch({ type: 'LOG_OUT' })
		router.push('/')
	}

	const toggleBurgerMenu = () => {
		setBurgerOpen(!burgerOpen)
	}
	return (
		<>
			{!isMobile && (
				<List
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '60%',
						gap: 40,
					}}
				>
					{tabs.map((tab, index) => (
						<Link key={index} href={`/${tab}`}>
							<Typography
								variant='header_buttons'
								style={{
									display: 'flex',
									gap: 5,
									alignItems: 'center',
									...(activeTab === tab && {
										color: '#E06B00',
										textDecoration: 'underline',
									}),
								}}
							>
								{tab === 'users' && (
									<DashboardIcon
										fill={activeTab === tab ? '#E06B00' : '#1B170F'}
									/>
								)}
								{tab === 'cells' && (
									<AccountIcon
										fill={activeTab === tab ? '#E06B00' : '#1B170F'}
									/>
								)}
								{tab === 'archive' && (
									<SettingsIcon
										fill={activeTab === tab ? '#E06B00' : '#1B170F'}
									/>
								)}
								{tab === 'stats' && (
									<FaqIcon fill={activeTab === tab ? '#E06B00' : '#1B170F'} />
								)}
								{tabNames[tab]}
							</Typography>
						</Link>
					))}
				</List>
			)}
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: isMobile ? 20 : 15,
				}}
			>
				{/* <ClickAwayListener onClickAway={handleTooltipClose}>
					<Tooltip
						title='Join Limit'
						PopperProps={{ disablePortal: true }}
						onClose={handleTooltipClose}
						open={isMobile ? open : undefined}
						disableHoverListener={isMobile}
						disableTouchListener={!isMobile}
						disableFocusListener
						enterTouchDelay={0}
						leaveTouchDelay={5000}
					>
						<Typography
							variant='user_item'
							aria-owns={open ? 'mouse-over-popover' : undefined}
							aria-haspopup='true'
							onMouseOver={!isMobile ? handleTooltipOpen : undefined}
							onMouseOut={!isMobile ? handleTooltipClose : undefined}
							onClick={isMobile ? handleTooltipToggle : undefined}
							style={{ cursor: 'pointer' }}
						>
							{data?.joinLimit}
						</Typography>
					</Tooltip>
				</ClickAwayListener> */}
				{isMobile && (
					<>
						<MenuIcon onClick={toggleBurgerMenu} />
						<BurgerMenu
							loggedIn={true}
							toggleBurgerMenu={toggleBurgerMenu}
							burgerOpen={burgerOpen}
						/>
					</>
				)}
				{/* <Box style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
					<div
						style={{
							position: 'relative',
							width: '50px',
							height: '56px',
							backgroundImage: `url(${account.src})`,
							zIndex: 0,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<UserAvatar
							previewImage={null}
							width={44}
							height={52}
							isClickable={true}
							avatarUrl='/users/me/photo'
							style={{ transform: 'translateY(2%)' }}
						/>
					</div>
					{!isMobile && (
						<p>
							{data?.nickname.slice(0, 10)}
							{data?.nickname.length > 10 && '...'}
						</p>
					)}
				</Box> */}
				<>
					{isMobile ? (
						<ButtonBase
							onClick={onExitClick}
							style={{ cursor: 'pointer', width: 20, padding: 0, margin: 0 }}
						>
							<Image src={logout.src} width={18} height={18} />
						</ButtonBase>
					) : (
						<Button
							onClick={onExitClick}
							style={{ cursor: 'pointer', width: 20, padding: 0, margin: 0 }}
						>
							<Image src={logout.src} width={18} height={18} />
						</Button>
					)}
				</>
			</Box>
		</>
	)
}
