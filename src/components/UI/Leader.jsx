import Image from 'next/image'
import UserAvatar from './UserAvatar'
import avatarBg from '@/assets/img/leader_avatar.svg'
import exclamation from '@/assets/img/exclamation.svg'
import { useMediaQuery } from '@mui/material'

export default function Leader({ style, onClick, avatar, isAllReturnPaid }) {
	const isMobile = useMediaQuery('@media(max-width: 400px)')
	return (
		<div
			onClick={onClick}
			style={{
				...style,
				background: `url(${avatarBg.src}) no-repeat center / cover`,
				width: isMobile ? '100px' : '140px',
				height: isMobile ? '116px' : '156px',
				cursor: 'pointer',
				position: 'relative',
			}}
		>
			<UserAvatar
				avatarUrl={avatar}
				width={isMobile ? 90 : 126}
				height={isMobile ? 104 : 143}
				isLeader={true}
				style={{}}
			/>
			{isAllReturnPaid && (
				<div
					src={exclamation.src}
					style={{
						position: 'absolute',
						top: -15,
						right: 20,
						fontSize: 45,
						fontWeight: 700,
						color: '#FA0000',
					}}
				>
					!
				</div>
			)}
		</div>
	)
}
