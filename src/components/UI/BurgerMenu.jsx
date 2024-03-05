import React from 'react'
import { Drawer, List, Typography, ButtonBase, Box } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import close from '@/assets/img/close_burger.svg'

export default function BurgerMenu({ loggedIn, toggleBurgerMenu, burgerOpen }) {
	const mobileTabsLoggedIn = {
		cells: 'Dashboard',
		account: 'My Account',
		'account-settings': 'Account Settings',
		'my-cells': 'my cells',
		'real-cells': 'Real cells',
		faq: 'FAQ',
		about: 'about us',
		rules: 'rules',
		'privacy-policy': 'Privacy policy',
		help: 'help',
		contacts: 'contact us',
	}

	const mobileTabsNotLoggedIn = {
		about: 'about us',
		rules: 'rules',
		'privacy-policy': 'Privacy policy',
		help: 'help',
		contacts: 'contact us',
	}

	const tabs = loggedIn ? mobileTabsLoggedIn : mobileTabsNotLoggedIn

	return (
		<Drawer anchor='top' open={burgerOpen} onClose={toggleBurgerMenu}>
			<Box
				style={{
					backgroundColor: '#E06B00',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<ButtonBase
					onClick={toggleBurgerMenu}
					style={{
						cursor: 'pointer',
						alignSelf: 'end',
						color: '#FFF',
						margin: '30px 30px 0 0',
					}}
				>
					<Image src={close.src} width={40} height={40} />
				</ButtonBase>
				<List
					style={{
						height: '100vh',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						background: '#E06B00',
					}}
				>
					{Object.keys(tabs).map((tab, index) => (
						<Link key={index} href={`/${tab}`}>
							<Typography variant='burger_tabs' onClick={toggleBurgerMenu}>
								{tabs[tab]}
							</Typography>
						</Link>
					))}
				</List>
			</Box>
		</Drawer>
	)
}
