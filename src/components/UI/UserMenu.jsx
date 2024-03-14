import {
	List,
	Typography,
	ButtonBase,
	Button,
	Box,
	useMediaQuery,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { QueryStats, PersonOutline, Dashboard } from '@mui/icons-material'

import BurgerMenu from './BurgerMenu'
import logout from '@/assets/img/logout.svg'

const tabs = ['users', 'cells', 'stats']
const tabNames = {
	users: 'users',
	cells: 'cells',
	stats: 'stats',
}

export default function UserMenu() {
	const router = useRouter()
	const dispatch = useDispatch()
	const [activeTab, setActiveTab] = useState(router.asPath.split('/')[1])
	const [burgerOpen, setBurgerOpen] = useState(false)
	const isMobile = useMediaQuery('@media(max-width: 1300px)')

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
								{tab === 'users' && <PersonOutline />}
								{tab === 'cells' && <Dashboard />}
								{tab === 'stats' && <QueryStats />}
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
