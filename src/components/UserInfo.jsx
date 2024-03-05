import { Box, Typography, Grid, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Cookies from 'js-cookie'
import useCellActions from '@/hooks/useCellActions'
const CellUserAvatar = dynamic(() => import('./UI/UserAvatar'))
const AuthButton = dynamic(() => import('./UI/AuthButton'))
const ConfirmationModal = dynamic(() => import('./UI/ConfirmationModal'))
import avatarBg from '@/assets/img/leader_avatar.svg'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import acceptImage from '@/assets/img/confirm.svg'
import deleteImage from '@/assets/img/delete.svg'
import leaveImage from '@/assets/img/leave.svg'

export default function UserInfo({
	user,
	role,
	isAutoCreated,
	isAccepted,
	cellUserId,
	followers,
	setActiveUser,
	isActive,
	isReturn,
	isAllPayed,
}) {
	const myId = parseInt(Cookies.get('userId'))
	const router = useRouter()
	const { cellId } = router.query
	const userId = user.id
	const isMobile = useMediaQuery('@media(max-width: 425px)')
	const acceptData = {
		isAccepted: true,
		acceptedAt: Date.now(),
		isPayed: true,
		payedAt: Date.now(),
	}
	const closeData = {
		isActive: false,
		isArchived: true,
	}
	const openData = {
		isActive: true,
		isArchived: false,
	}
	const acceptedCount =
		followers?.filter(
			follower => follower?.isPayed && follower.isAccepted === true
		).length ?? 0

	const { loading, error, success, deleteFollower, patchFollower, closeCell } =
		useCellActions()

	const [modalOpen, setModalOpen] = useState(false)
	const [actionToConfirm, setActionToConfirm] = useState(null)
	const [modalContent, setModalContent] = useState({
		text: '',
		imageSrc: null,
	})

	const handleOpenModal = (action, actionType) => {
		setActionToConfirm(() => action)
		updateModalContent(actionType)
		setModalOpen(true)
	}

	// useEffect(() => {
	// 	if (followers?.length === 6 && acceptedCount === 6) {
	// 		// router.push('/cells')
	// 	}
	// }, [acceptedCount])

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
			case 'accept':
				content = {
					title: 'Are you sure you want to accept this user?',
					imageSrc: acceptImage.src,
				}
				break
			case 'delete':
				content = {
					text: 'Are you sure you want to delete this user?',
					imageSrc: deleteImage.src,
				}
				break
			case 'leave':
				content = {
					title: 'Are you sure you want to leave?',
					imageSrc: leaveImage.src,
				}
				break
			default:
				content = { text: '', imageSrc: null }
		}
		setModalContent(content)
	}
	const onAcceptClick = async () => {
		try {
			const result = await patchFollower(cellUserId, acceptData)
			if (acceptedCount >= 5 && result) {
				await closeCell(cellId, closeData)
			}
			setActiveUser(null)
		} catch (error) {
			console.error('Error:', error.message)
		}
	}
	const onDeleteClick = () => {
		deleteFollower(cellUserId)
		setActiveUser(null)
	}
	const onLeaveClick = () => {
		deleteFollower(cellUserId)
		router.push('/cells')
	}
	const formatTelegramUrl = telegramHandle => {
		return telegramHandle.replace('@', '').replace(/\s+/g, '')
	}
	return (
		<Grid style={{ padding: '2% 0%', width: '100%' }}>
			<Grid
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 10,
					width: '100%',
				}}
			>
				<div
					style={{
						background: `url(${avatarBg.src}) no-repeat center / cover`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '140px',
						height: '156px',
					}}
				>
					<CellUserAvatar
						avatarUrl={user?.avatarUrl}
						width={125}
						height={145}
					/>
				</div>
				<Typography component={'h6'} variant='h6_light'>
					{user?.firstName} {user?.lastName}
				</Typography>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 2,
					}}
				>
					<Typography variant='cell_user_key' display='flex'>
						Nickname:{' '}
						<Typography variant='cell_user_item'>{user?.nickname}</Typography>
					</Typography>

					<Typography variant='cell_user_key' display='flex'>
						Phone:{' '}
						<Typography variant='cell_user_item'>{user?.phone}</Typography>
					</Typography>

					<Typography variant='cell_user_key' display='flex'>
						Telegram:{' '}
						<Link
							href={`https://t.me/${formatTelegramUrl(user?.telegram || '')}`}
							target='_blank'
						>
							<Typography variant='cell_user_item'>{user?.telegram}</Typography>
						</Link>
					</Typography>
					{/* <Typography variant='cell_user_item'>Expired</Typography> */}
				</Box>
				{role === 'leader' && userId !== myId && !isAccepted && isAllPayed && (
					<>
						<Box style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
							<AuthButton
								variant='contained'
								onClick={() => handleOpenModal(onAcceptClick, 'accept')}
								type='submit'
								style={{
									background: '#119A48',
									width: '100%', // set 50%, when uncomment section behind
								}}
							>
								accept
							</AuthButton>
							{/* <AuthButton
								variant='contained'
								onClick={() => handleOpenModal(onDeleteClick, 'delete')}
								type='submit'
								style={{
									background: '#FF0000',
									width: '50%',
								}}
							>
								delete
							</AuthButton> */}
						</Box>
						{/* <Typography variant='cell_user_subtext'>
							votes to remove: 0/5
						</Typography> */}
					</>
				)}
				{userId === myId &&
					!isAutoCreated &&
					role !== 'leader' &&
					acceptedCount !== 6 &&
					isActive &&
					!isReturn &&
					!isAccepted && (
						<AuthButton
							variant='contained'
							onClick={() => handleOpenModal(onLeaveClick, 'leave')}
							type='submit'
							style={{
								background: '#A5560F',
								width: '30%',
							}}
						>
							Leave
						</AuthButton>
					)}
				<ConfirmationModal
					open={modalOpen}
					handleClose={handleCloseModal}
					handleConfirm={handleConfirmAction}
					title={modalContent.title}
					isLoading={loading}
				>
					<Image
						src={modalContent.imageSrc}
						width={isMobile ? 110 : 250}
						height={isMobile ? 110 : 250}
					/>
				</ConfirmationModal>
			</Grid>
		</Grid>
	)
}
