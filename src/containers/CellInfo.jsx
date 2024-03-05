import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { fetchData } from '@/api/fetchData'
import {
	Typography,
	useMediaQuery,
	Dialog,
	DialogContent,
	Slide,
	styled,
	Box,
	CircularProgress,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import useIsLeader from '@/hooks/useIsLeader'
import dynamic from 'next/dynamic'
import Wrapper from '../components/UI/Wrapper'
const BoxComponent = dynamic(() => import('@/components/UI/BoxComponent'))
const CellInfoComponent = dynamic(() =>
	import('@/components/CellInfoComponent')
)
const MobileCellInfoComponent = dynamic(() =>
	import('@/components/MobileCellInfoComponent')
)
import useCellActions from '@/hooks/useCellActions'

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

export default function CellInfo({ data }) {
	const router = useRouter()
	const { cellLevelId: id } = router.query
	const { cellId } = router.query
	const [cellData, setCellData] = useState(data)
	const consultant = cellData?.consultant
	const leader = cellData?.leader
	const followers = cellData?.cellUsers
	const [activeUser, setActiveUser] = useState(null)
	const [role, setRole] = useState(null)
	const [isAutoCreated, setIsAutoCreated] = useState(null)
	const [isAccepted, setIsAccepted] = useState(null)
	const [cellUserId, setCellUserId] = useState(null)
	const [isBoxVisible, setIsBoxVisible] = useState(true)
	const [showErrorDialog, setShowErrorDialog] = useState(false)
	const [isReturn, setIsReturn] = useState(false)
	const [isAllPayed, setIsAllPayed] = useState(false)
	const isActive = cellData?.isActive
	const { cellClosing, isJoinClicked } = useSelector(state => state.user)
	const userId = parseInt(Cookies.get('userId'))
	const checkRole = useIsLeader()
	const dispatch = useDispatch()

	const closeData = {
		isActive: false,
		isArchived: true,
	}

	const handleUserClick = (user, autoCreate, accept, id, isRet, isPayed) => {
		setActiveUser(user)
		const userRole = checkRole(leader?.id, userId)
		setRole(userRole)
		setIsAutoCreated(autoCreate)
		setIsAccepted(accept)
		setCellUserId(id)
		setIsReturn(isRet)
		setIsAllPayed(isPayed)
	}
	const [cellQueueId, setCellQueueId] = useState('-')
	const refreshFetch = useCallback(async () => {
		try {
			const token = Cookies.get('access_token')
			const apiUrl = process.env.API_URL
			const url = `${apiUrl}/cells/${cellId}`
			const res = await fetchData(url, token)
			const newData = res.data
			const cellQueueUrl = `${apiUrl}/cells/join/queue?level_id=${id}&cell_id=${cellId}`
			const fetchQueue = await fetchData(cellQueueUrl, token)
			const queueData = fetchQueue.data
			setCellQueueId(queueData)
			setCellData(newData)
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error)
		}
	}, [cellId, activeUser])

	const [acceptedCount, setAcceptedCount] = useState(0)
	const { loading, error, success, closeCell } = useCellActions()

	useEffect(() => {
		refreshFetch()
		setAcceptedCount(
			followers?.filter(
				follower => follower?.isPayed && follower.isAccepted === true
			).length ?? 0
		)
	}, [cellId, activeUser])

	useEffect(() => {
		if (!cellData) {
			router.push('/')
		}
		if (userId === leader?.id) {
			setShowErrorDialog(true)
			const timer = setTimeout(() => {
				setShowErrorDialog(false)
			}, 5000)
			return () => clearTimeout(timer)
		}
	}, [])

	useEffect(() => {
		if (acceptedCount === 6 && isActive) {
			closeCell(cellId, closeData)
			setIsBoxVisible(true)
		}
	}, [acceptedCount])

	const isMobile = useMediaQuery('@media(max-width:1300px)')
	return (
		<>
			<Box
				style={{
					position: 'relative',
					width: '100%',
				}}
			>
				{isBoxVisible &&
					(acceptedCount >= 5 || acceptedCount === 6) &&
					cellClosing && (
						<BoxComponent
							onClose={() => {
								setIsBoxVisible(false)
								dispatch({ type: 'STOP_CELL_CLOSE' })
							}}
						/>
					)}
				<Wrapper
					header={activeUser ? 'user info' : 'Cell Info'}
					style={{
						minHeight: 800,
						maxHeight: isMobile ? '100%' : '80vh',
						gap: isMobile ? 35 : 5,
					}}
				>
					{id && cellData ? (
						isMobile ? (
							<MobileCellInfoComponent
								cellId={cellQueueId}
								cellData={cellData}
								user={activeUser}
								role={role}
								leader={leader}
								followers={followers}
								consultant={consultant}
								isAutoCreated={isAutoCreated}
								isAccepted={isAccepted}
								cellUserId={cellUserId}
								handleUserClick={handleUserClick}
								refreshFetch={refreshFetch}
								setActiveUser={setActiveUser}
								handleCloseClick={() =>
									activeUser ? setActiveUser(null) : router.push(`/cells/${id}`)
								}
								isActive={isActive}
								isReturn={isReturn}
								isAllPayed={isAllPayed}
							/>
						) : (
							<CellInfoComponent
								cellId={cellQueueId}
								cellData={cellData}
								user={activeUser}
								role={role}
								leader={leader}
								followers={followers}
								consultant={consultant}
								isAutoCreated={isAutoCreated}
								isAccepted={isAccepted}
								cellUserId={cellUserId}
								handleUserClick={handleUserClick}
								refreshFetch={refreshFetch}
								setActiveUser={setActiveUser}
								handleCloseClick={() =>
									activeUser ? setActiveUser(null) : router.push(`/cells/${id}`)
								}
								isActive={isActive}
								isReturn={isReturn}
								isAllPayed={isAllPayed}
							/>
						)
					) : (
						<CircularProgress />
					)}

					{showErrorDialog && isJoinClicked && (
						<StyledDialog
							open={showErrorDialog}
							TransitionComponent={Transition}
							onClick={() => setShowErrorDialog(false)}
						>
							<DialogContent>
								<Typography variant='body1'>
									You are leader in this cell, you cannot join it as follower
								</Typography>
							</DialogContent>
						</StyledDialog>
					)}
				</Wrapper>
			</Box>
		</>
	)
}
