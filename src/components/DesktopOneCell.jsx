import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Typography, Button, Grid, Box, styled } from '@mui/material'
import BigCell from '@/components/UI/BigCell'
const DataBox = dynamic(() => import('@/components/UI/DataBox'))

const JoinButton = styled(Button)({
	width: '100%',
	maxWidth: '150px',
	color: '#23201C',
	textAlign: 'center',
	textShadow: '1px 1px 1px #fff',
	fontFamily: 'Noto Sans',
	fontSize: '24px',
	fontWeight: 900,
	textTransform: 'uppercase',
	borderRadius: '5px',
	border: '1px solid #1b170f',
	background: 'rgba(217, 217, 217, 0)',
	cursor: 'pointer',
	transition: '.3s',
	'&:hover': {
		border: '1px solid #1a170f80',
		transform: 'scale(1.1) perspective(1000px)',
		background: 'rgba(217, 217, 217, .05)',
	},
	'&:disabled': {
		cursor: 'not-allowed',
		color: 'rgb(123, 123, 122)',
		border: '1px solid rgba(217, 217, 217, 0.2)',
		background: 'rgba(217, 217, 217, 0.2)',
	},
})

export default function DesktopOneCell({
	data,
	disabled,
	leaderActiveData,
	followerActiveData,
	waitingData,
	onJoinClick,
	onRefreshClick,
	cells,
	id,
}) {
	const router = useRouter()
	return (
		<Box
			style={{
				width: '100%',
				minWidth: 550,
				minHeight: '65vh',
				maxHeight: '100%',
				display: 'flex',
				alignItems: 'center',
				margin: '0 auto',
			}}
		>
			<BigCell
				onCloseClick={() => router.push('/cells')}
				onRefreshClick={onRefreshClick}
				style={{
					gap: 10,
					justifyContent: 'center',
					backgroundSize: 'contain',
					minWidth: 550,
				}}
			>
				<Image
					src={cells[id - 1].bee}
					alt='cell'
					width={42}
					height={60}
					style={{ layout: 'fill' }}
				/>

				<JoinButton
					variant='outlined'
					disabled={disabled}
					onClick={onJoinClick}
				>
					JOIN
				</JoinButton>

				<Grid
					style={{
						display: 'grid',
						flexDirection: 'column',
						gridTemplateColumns: '1fr 1fr',
						gridTemplateRows: '1fr',
						gridTemplateAreas: `
			'follower leader'
			'waiting waiting'
			`,
						columnGap: 10,
						rowGap: 3,
						alignItems: 'center',
						justifyContent: 'center',
						width: '46%',
						height: '100%',
						maxHeight: 300,
					}}
				>
					<DataBox
						title='follower'
						data={followerActiveData}
						style={{ gridArea: 'follower' }}
					/>
					<DataBox
						title='leader'
						data={leaderActiveData}
						style={{ gridArea: 'leader' }}
						showQueue={true}
					/>
					<DataBox
						title='waiting'
						data={waitingData}
						style={{ gridArea: 'waiting' }}
						isNotClickable={true}
						showQueue={true}
					/>
				</Grid>
				<Typography variant='level_big'>
					{data?.level} {data?.price}$
				</Typography>
			</BigCell>
		</Box>
	)
}
