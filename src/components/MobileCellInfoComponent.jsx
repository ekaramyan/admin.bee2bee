import Image from 'next/image'
import { Box, Typography, Button } from '@mui/material'
const CellComponent = dynamic(() => import('@/components/CellComponent'))
const Consultant = dynamic(() => import('@/components/UI/Consultant'))
const UserInfo = dynamic(() => import('@/components/UserInfo'))
import dynamic from 'next/dynamic'
import refresh from '@/assets/img/refresh_dark.svg'
import close from '@/assets/img/close_dark.svg'

export default function MobileCellInfoComponent({
	cellId,
	cellData,
	user,
	role,
	leader,
	followers,
	consultant,
	isAutoCreated,
	isAccepted,
	cellUserId,
	handleUserClick,
	refreshFetch,
	handleCloseClick,
	isActive,
	setActiveUser,
	isReturn,
	isAllPayed,
}) {
	return (
		<Box
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 25,
				alignItems: 'center',
			}}
		>
			{!user && <Consultant data={consultant} />}

			<Box
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				{!user && (
					<Button onClick={refreshFetch} style={{ cursor: 'pointer' }}>
						<Image src={refresh.src} width={35} height={35} />
					</Button>
				)}
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography variant='cell_id_mobile'>№{cellId}</Typography>
					<Typography variant='cell_id_mobile'>
						{cellData.cellLevel.level.slice(0, 1)} - #{cellData.id}
					</Typography>
				</Box>
				<Button
					onClick={handleCloseClick}
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
					<Image src={close.src} width={35} height={35} />
				</Button>
			</Box>
			{user ? (
				<UserInfo
					user={user}
					role={role}
					cellUserId={cellUserId}
					isAutoCreated={isAutoCreated}
					isAccepted={isAccepted}
					followers={followers}
					isActive={isActive}
					setActiveUser={setActiveUser}
					isReturn={isReturn}
					isAllPayed={isAllPayed}
				/>
			) : (
				<>
					<CellComponent
						data={cellData}
						leader={leader}
						followers={followers}
						onUserClick={handleUserClick}
					/>
				</>
			)}
		</Box>
	)
}
