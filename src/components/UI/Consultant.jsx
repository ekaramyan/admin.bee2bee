import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import UserAvatar from './UserAvatar'
import avatarBg from '@/assets/img/consultant_avatar.svg'

export default function Consultant({ data }) {
	const formatTelegramUrl = telegramHandle => {
		return telegramHandle.replace('@', '').replace(/\s+/g, '')
	}
	return (
		<Box
			style={{
				display: 'flex',
				justifyContent: 'center',
				gap: 20,
				flexWrap: 'wrap',
			}}
		>
			<Box
				style={{
					background: `url(${avatarBg.src}) no-repeat center / cover`,
					width: '140px',
					height: '158px',
				}}
			>
				<UserAvatar
					avatarUrl={data?.avatarUrl}
					width={125}
					height={145}
					isLeader={true}
				/>
			</Box>
			<Box style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						marginBottom: 5,
					}}
				>
					<Typography variant='consultant_name'>
						{data.firstName} {data.lastName}
					</Typography>
					<Typography variant='consultant_header'>Consultant</Typography>
				</Box>
				<Typography variant='consultant_label'>
					Username:{' '}
					<Typography variant='consultant_data'>{data.firstName}</Typography>
				</Typography>
				<Typography variant='consultant_label'>
					Phone:{' '}
					<Typography variant='consultant_data'>+{data.phone}</Typography>
				</Typography>
				<Typography variant='consultant_label'>
					Telegram:{' '}
					<Link
						target='_blank'
						href={`https://t.me/${formatTelegramUrl(data?.nickname || '')}`}
					>
						<Typography variant='consultant_data'>{data.nickname}</Typography>
					</Link>
				</Typography>
			</Box>
		</Box>
	)
}
