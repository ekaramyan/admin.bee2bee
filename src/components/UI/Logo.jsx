import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/img/logo.svg'
import mobileLogo from '../../assets/img/logo_mobile.svg'
import { useMediaQuery } from '@mui/material'

export default function Logo() {
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	return (
		<Link href={'/'}>
			{isMobile ? (
				<Image src={mobileLogo.src} width={40} height={35} />
			) : (
				<Image src={logo.src} width={200} height={35} />
			)}
		</Link>
	)
}
