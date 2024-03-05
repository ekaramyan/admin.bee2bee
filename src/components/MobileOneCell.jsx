import Image from 'next/image'
import Link from 'next/link'
import { Button, Grid, Box } from '@mui/material'
import { useRouter } from 'next/router'
const DataBox = dynamic(() => import('@/components/UI/DataBox'))
import dynamic from 'next/dynamic'
import refresh from '@/assets/img/refresh_dark.svg'
import close from '@/assets/img/close_dark.svg'

export default function MobileOneCell({
	data,
	disabled,
	leaderActiveData,
	followerActiveData,
	waitingData,
	onJoinClick,
	onRefreshClick,
	id,
}) {
	const router = useRouter()
	return (
		<>
			<Box
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Button onClick={onRefreshClick} style={{ cursor: 'pointer' }}>
					<Image src={refresh.src} width={35} height={35} alt='refresh' />
				</Button>{' '}
				<Button
					variant='outlined'
					disabled={disabled}
					style={{
						cursor: !disabled ? 'pointer' : 'not-allowed',
						width: '15%',
						minWidth: 100,
						color: !disabled ? '#23201C' : 'rgb(123 123 122)',
						textAlign: 'center',
						textShadow: '1px 1px 1px #FFF',
						fontFamily: 'Noto Sans',
						fontSize: 24,
						fontWeight: 900,
						textTransform: 'uppercase',
						borderRadius: 5,
						border: !disabled
							? '1px solid #1B170F'
							: '2px solid rgb(123 123 122)',
						background: !disabled
							? 'rgba(217, 217, 217, 0.00)'
							: 'rgba(217, 217, 217, 0.2)',
					}}
					onClick={onJoinClick}
				>
					JOIN
				</Button>
				<Button
					onClick={() => router.push('/cells')}
					style={{
						cursor: 'pointer',
						color: '#1B170F',
						textAlign: 'center',
						fontFamily: 'Noto Sans',
						fontSize: 35,
						fontWeight: 400,
						textTransform: 'uppercase',
					}}
				>
					<Image src={close.src} width={35} height={35} alt='close' />
				</Button>
			</Box>
			<Grid
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					columnGap: 10,
					rowGap: 25,
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<DataBox
					title='follower'
					data={followerActiveData}
					style={{ gridArea: 'follower' }}
				/>
				<DataBox
					title='waiting'
					data={waitingData}
					style={{ gridArea: 'waiting' }}
					isNotClickable={true}
					showQueue={true}
				/>
				<DataBox
					title='leader'
					data={leaderActiveData}
					style={{ gridArea: 'leader' }}
					showQueue={true}
				/>
			</Grid>
		</>
	)
}
