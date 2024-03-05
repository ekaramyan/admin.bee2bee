import { Box, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import UserAvatar from './UserAvatar'
import green from '@/assets/img/follower_avatar_green.svg'
import yellow from '@/assets/img/follower_avatar_yellow.svg'
import return_img from '@/assets/img/return.svg'

export default function Follower({
	className,
	onClick,
	avatar,
	isAccepted,
	isReturn,
	user,
}) {
	const isMobile = useMediaQuery('@media(max-width:400px)')
	return (
		<Box
			onClick={onClick}
			className={className}
			display='flex'
			justifyContent='center'
			alignItems='center'
			style={{
				backgroundImage: isAccepted
					? `url(${green.src})`
					: `url(${yellow.src})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'contain',
				width: isMobile ? '70px' : '100px',
				height: isMobile ? '70px' : '100px',
				cursor: user ? 'pointer' : 'default',
			}}
		>
			<UserAvatar
				avatarUrl={avatar}
				width={isMobile ? 60 : 83}
				height={isMobile ? 65 : 94}
				style={{ position: 'relative', transform: 'translateY(0%)' }}
			/>
			{isReturn && (
				<Image
					src={return_img.src}
					width={isMobile ? 20 : 49}
					height={isMobile ? 20 : 49}
					style={{ position: 'absolute', opacity: '.7' }}
				/>
			)}
		</Box>
	)
}
