import { Box, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
const CellComponent = dynamic(() => import('@/components/CellComponent'))
const Consultant = dynamic(() => import('@/components/UI/Consultant'))
const BigCell = dynamic(() => import('@/components/UI/BigCell'))
const UserInfo = dynamic(() => import('@/components/UserInfo'))

export default function CellInfoComponent({
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
	setActiveUser,
	isActive,
	isReturn,
	isAllPayed,
}) {
	return (
		<Box
			style={{
				width: '100%',
				minWidth: 550,
				minHeight: '65vh',
				maxHeight: '100%',
				display: 'flex',
			}}
		>
			<BigCell
				onCloseClick={handleCloseClick}
				onRefreshClick={refreshFetch}
				activeUser={user}
				style={{
					width: '50%',
					gap: 8,
					justifyContent: 'center',
					backgroundSize: 'contain',
					minWidth: 550,
				}}
			>
				{user ? (
					<UserInfo
						user={user}
						role={role}
						isAutoCreated={isAutoCreated}
						isAccepted={isAccepted}
						cellUserId={cellUserId}
						followers={followers}
						setActiveUser={setActiveUser}
						isActive={isActive}
						isReturn={isReturn}
						isAllPayed={isAllPayed}
					/>
				) : (
					<>
						<Typography variant='cell_id'>№{cellId}</Typography>
						<CellComponent
							data={cellData}
							leader={leader}
							followers={followers}
							onUserClick={handleUserClick}
						/>
						<Typography variant='cell_id'>
							{cellData.cellLevel.level.slice(0, 1)} - #{cellData.id}
						</Typography>
					</>
				)}
			</BigCell>
			<Consultant data={consultant} />
		</Box>
	)
}
