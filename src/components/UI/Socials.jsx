import Image from 'next/image'
import { Box } from '@mui/material'
import tiktok from '@/assets/img/socials/tiktok.svg'
import facebook from '@/assets/img/socials/facebook.svg'
import instagram from '@/assets/img/socials/instagram.svg'
import telegram from '@/assets/img/socials/telegram.svg'
import vk from '@/assets/img/socials/vk.svg'
import youtube from '@/assets/img/socials/youtube.svg'
import Link from 'next/link'

export default function Socials({ width, height }) {
	const socials = [
		{ img: facebook, url: 'https://www.facebook.com/bee2bee.site' },
		{ img: telegram, url: 'https://t.me/+VdRruGTyWco1MThk' },
		{ img: instagram, url: 'https://www.instagram.com/bee2bee.site/' },
		{ img: vk, url: 'https://vk.com/bee2bee.site' },
		{ img: tiktok, url: 'https://www.tiktok.com/@bee2bee.site' },
		{
			img: youtube,
			url: 'https://www.youtube.com/channel/UCUkQI5A8r-X1DGYTi4dgoOw',
		},
	]
	return (
		<>
			<Box
				style={{
					display: 'flex',
					width: '100%',
					gap: 5,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{socials.map((item, index) => (
					<Link key={index} href={item.url} target='_blank'>
						<Image src={item.img.src} width={width} height={height} />
					</Link>
				))}
			</Box>
		</>
	)
}
