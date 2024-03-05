import { Typography, Box, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import en from '@/assets/img/en.png'
import ge from '@/assets/img/ge.png'
import ru from '@/assets/img/ru.png'

export default function Footer({}) {
	const router = useRouter()
	const page = router.asPath.split('/')[1]
	const [activeTab, setActiveTab] = useState(page)
	useEffect(() => {
		setActiveTab(page)
	}, [page])

	const handleTabClick = (tabName, callback) => {
		setActiveTab(tabName)
	}

	const getTabStyles = tabName => {
		return activeTab === tabName
			? { color: '#E06B00', textDecoration: 'underline' }
			: {}
	}

	const isMobile = useMediaQuery('@media(max-width:1300px)')

	return (
		<footer
			style={{
				width: '100%',
				background: '#EAEEE8',
				display: 'flex',
				alignItems: 'center',
				justifyContent: isMobile ? 'center' : 'space-between',
				alignSelf: 'end',
				minHeight: 80,
				borderRadius: '20px 20px 0px 0px',
				padding: '0 20px',
				justifySelf: 'end',
				userSelect: 'none',
			}}
		>
			{/* {!isMobile && (
				<div style={{ display: 'flex', gap: 20 }}>
					<Typography
						variant='footer_buttons'
						style={getTabStyles('about')}
						onClick={() => handleTabClick('about', router.push('/about'))}
					>
						About us
					</Typography>

					<Typography
						variant='footer_buttons'
						style={getTabStyles('rules')}
						onClick={() => handleTabClick('rules', router.push('/rules'))}
					>
						Rules
					</Typography>

					<Typography
						variant='footer_buttons'
						style={getTabStyles('privacy-policy')}
						onClick={() =>
							handleTabClick('privacy-policy', router.push('/privacy-policy'))
						}
					>
						Privacy policy
					</Typography>

					<Typography
						variant='footer_buttons'
						style={getTabStyles('help')}
						onClick={() => handleTabClick('help', router.push('/help'))}
					>
						Help
					</Typography>

					<Typography
						variant='footer_buttons'
						style={getTabStyles('contacts')}
						onClick={() => handleTabClick('contacts', router.push('/contacts'))}
					>
						Contact us
					</Typography>
				</div>
			)} */}
			<Box style={{ display: 'flex', gap: 10 }}>
				<Image src={en.src} width={32} height={24} />
				<Image src={ge.src} width={32} height={24} />
				<Image src={ru.src} width={32} height={24} />
			</Box>
		</footer>
	)
}
