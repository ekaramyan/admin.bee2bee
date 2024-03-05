import { styled, useMediaQuery } from '@mui/material'
import dynamic from 'next/dynamic'
const Follower = dynamic(() => import('./UI/Follower'))
const Leader = dynamic(() => import('./UI/Leader'))

const Fw = styled(Follower)`
	align-self: center;
	justify-self: center;

	&:nth-of-type(1) {
		align-self: end;
		justify-self: end;
		grid-column: 1 / 2;
		grid-row: 1 / 2;
		transform: translateX(50%);
	}

	&:nth-of-type(2) {
		align-self: end;
		justify-self: start;
		grid-column: 3 / 4;
		grid-row: 1 / 2;
		transform: translateX(-50%);
	}

	&:nth-of-type(3) {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}

	&:nth-of-type(4) {
		grid-column: 3 / 4;
		grid-row: 2 / 3;
	}

	&:nth-of-type(5) {
		align-self: start;
		justify-self: end;
		grid-column: 1 / 2;
		grid-row: 3 / 4;
		transform: translateX(50%);
	}

	&:nth-of-type(6) {
		align-self: start;
		justify-self: start;
		grid-column: 3 / 4;
		grid-row: 3 / 4;
		transform: translateX(-50%);
	}
`

export default function CellComponent({
	data,
	leader,
	followers,
	onUserClick,
}) {
	const trimmedFollowers = followers.slice(0, 6)
	const paddedFollowers = [
		...trimmedFollowers.slice(0, 6),
		...Array(6 - trimmedFollowers.length).fill({}),
	]
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	const isAllReturnPaid = data?.isAllReturnPaid
	return (
		<>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gridTemplateRows: 'repeat(3, 0.7fr)',
					gap: 10,
					maxWidth: isMobile && 420,
				}}
			>
				{paddedFollowers
					.sort((a, b) => a.id - b.id)
					.map(follower => (
						<Fw
							key={follower.id}
							isAccepted={follower?.isAccepted}
							onClick={() =>
								onUserClick(
									follower.follower,
									follower.isAutoCreated,
									follower.isAccepted,
									follower.id,
									follower.isReturn,
									isAllReturnPaid
								)
							}
							avatar={follower?.follower?.avatarUrl || ''}
							user={follower.follower}
							isReturn={follower.isReturn}
						/>
					))}
				<Leader
					style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}
					onClick={() => onUserClick(leader)}
					avatar={leader.avatarUrl || ''}
					isAllReturnPaid={!isAllReturnPaid}
				/>
			</div>
		</>
	)
}
