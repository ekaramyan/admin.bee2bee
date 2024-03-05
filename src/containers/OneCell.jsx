import React, { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import {
	CircularProgress,
	useMediaQuery,
	Dialog,
	DialogContent,
	styled,
	Typography,
	Slide,
	Box,
	LinearProgress,
} from '@mui/material'
import dynamic from 'next/dynamic'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import useCells from '@/hooks/useCells'
import starter from '@/assets/img/bees/starter.webp'
import beginner from '@/assets/img/bees/beginner.webp'
import worker from '@/assets/img/bees/worker.webp'
import pro from '@/assets/img/bees/pro.webp'
import expert from '@/assets/img/bees/expert.webp'
import useCellActions from '@/hooks/useCellActions'
import { fetchData } from '@/api/fetchData'
import Wrapper from '../components/UI/Wrapper'

const DesktopOneCell = dynamic(() => import('@/components/DesktopOneCell'))
const MobileOneCell = dynamic(() => import('@/components/MobileOneCell'))
const ConfirmationModal = dynamic(() =>
	import('@/components/UI/ConfirmationModal')
)

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		top: '10px',
		margin: '0',
		position: 'absolute',
		backgroundColor: '#fff',
		borderRadius: 15,
		boxShadow: 'none',
		transition: '.3s',
	},
	'& .MuiBackdrop-root': {
		backgroundColor: 'transparent',
	},
}))
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />
})

export default function OneCell({ data, joinList }) {
	const router = useRouter()
	const [toJoin, setToJoin] = useState(null)
	const [showErrorDialog, setShowErrorDialog] = useState(false)
	const [success, setSuccess] = useState(null)
	const [err, setErr] = useState(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [actionToConfirm, setActionToConfirm] = useState(null)
	const [modalContent, setModalContent] = useState({
		text: '',
		imageSrc: null,
	})

	const { postFollower, loading, error } = useCellActions()
	const userId = parseInt(Cookies.get('userId'))
	const { cellLevelId: id } = router.query
	const cells = [
		{ bee: starter },
		{ bee: beginner },
		{ bee: worker },
		{ bee: pro },
		{ bee: expert },
	]
	const {
		data: followerActiveData,
		loading: followerActiveLoading,
		error: followerActiveError,
		getCells: getFollowerActiveCells,
	} = useCells()
	const {
		data: leaderActiveData,
		loading: leaderActiveLoading,
		error: leaderActiveError,
		getCells: getLeaderActiveCells,
	} = useCells()

	const {
		data: waitingData,
		loading: waitingLoading,
		error: waitingError,
		getCells: getWaitingCells,
	} = useCells()

	const onRefreshClick = useCallback(async () => {
		getFollowerActiveCells('me_followers_level', { level: id })
		getLeaderActiveCells('me_leader_level', { level: id })
		getWaitingCells('waiting', { level: id, user: userId })
	}, [getFollowerActiveCells, getLeaderActiveCells, getWaitingCells, id])
	useEffect(() => {
		onRefreshClick()
	}, [])

	useEffect(() => {
		if (joinList.data) {
			setToJoin(joinList?.data[0]?.id)
		}
	}, [])
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	const token = Cookies.get('access_token')
	const apiUrl = process.env.API_URL

	// useEffect(() => {
	// 	const fetchDataAsync = async () => {
	// 		try {
	// 			const id = router.query.cellLevelId
	// 			const apiUrl = process.env.API_URL
	// 			const data = fetchData(
	// 				`${apiUrl}/cells/all/list?level_id=${id}&limit=1`,
	// 				token
	// 			)
	// 			console.log(data)
	// 			if (data && data.length > 0) {
	// 				setData(data)
	// 			}
	// 		} catch (error) {}
	// 	}
	// 	fetchDataAsync()
	// }, [])

	const canJoin = data ? data[0]?.cellLevel?.canJoin : false
	const level = data[0]?.cellLevel

	const handleOpenModal = (action, actionType) => {
		setActionToConfirm(() => action)
		updateModalContent(actionType)
		setModalOpen(true)
	}

	const handleConfirmAction = () => {
		if (actionToConfirm) {
			actionToConfirm()
		}
		setModalOpen(false)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const updateModalContent = action => {
		let content = {}
		switch (action) {
			case 'join':
				content = { title: 'Are you sure you want to join this cell?' }
				break
			default:
				content = { title: '' }
		}
		setModalContent(content)
	}

	const onJoinClick = async () => {
		const users = await fetchData(`${apiUrl}/cells/${toJoin}`, token)
		if (
			!leaderActiveData ||
			(userId !== users?.data?.leader?.id && users.data.cellUsers.length <= 6)
		) {
			const res = await postFollower(toJoin, userId)
			setSuccess(res?.isSuccess)
			res?.isSuccess &&
				router.push(toJoin ? `${id}/info/${res.data.id}` : `/cells/${id}`)
		}
		if (error || !success) setShowErrorDialog(true)
		if (users.data.cellUsers.length >= 6) {
			setErr('Sorry, cell is overcrowded')
			setShowErrorDialog(true)
		}
	}

	return (
		<>
			{error && showErrorDialog && (
				<StyledDialog
					open={showErrorDialog}
					TransitionComponent={Transition}
					onClick={() => setShowErrorDialog(false)}
				>
					<DialogContent>
						<Typography variant='body1'>{error || err}</Typography>
					</DialogContent>
				</StyledDialog>
			)}
			<Wrapper
				header={
					isMobile
						? `${data[0]?.cellLevel?.level} ${data[0]?.cellLevel?.price}$`
						: 'Join the cell'
				}
				style={{ minHeight: 800, gap: 10 }}
			>
				{id && joinList ? (
					isMobile ? (
						<MobileOneCell
							data={level}
							disabled={!toJoin || canJoin === false}
							leaderActiveData={leaderActiveData}
							followerActiveData={followerActiveData}
							waitingData={waitingData}
							onJoinClick={() => handleOpenModal(onJoinClick, 'join')}
							onRefreshClick={onRefreshClick}
							id={id}
						/>
					) : (
						<DesktopOneCell
							data={level}
							disabled={!toJoin || canJoin === false}
							leaderActiveData={leaderActiveData}
							followerActiveData={followerActiveData}
							waitingData={waitingData}
							onJoinClick={() => handleOpenModal(onJoinClick, 'join')}
							onRefreshClick={onRefreshClick}
							cells={cells}
							id={id}
						/>
					)
				) : data ? (
					<CircularProgress />
				) : (
					'Sorry, there is no data'
				)}
				<Box>
					{(followerActiveLoading || leaderActiveLoading || waitingLoading) && (
						<LinearProgress />
					)}
				</Box>
				<ConfirmationModal
					open={modalOpen}
					handleClose={handleCloseModal}
					handleConfirm={handleConfirmAction}
					title={modalContent.title}
					isLoading={loading}
				>
					<GroupAddIcon
						style={{
							width: isMobile ? 80 : 250,
							height: isMobile ? 80 : 250,
							color: '#fff',
						}}
					/>
				</ConfirmationModal>
			</Wrapper>
		</>
	)
}
