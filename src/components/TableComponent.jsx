import { useState } from 'react'
import Image from 'next/image'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	useMediaQuery,
} from '@mui/material'
import TableItem from './UI/TableItem'
import ConfirmationModal from '@/components/UI/ConfirmationModal'
import EditModal from '@/components/UI/EditModal'
import acceptImage from '@/assets/img/confirm.svg'
import deleteImage from '@/assets/img/delete.svg'
import leaveImage from '@/assets/img/leave.svg'

export default function TableComponent({
	users,
	deleteUser,
	editUser,
	getUserById,
	loading,
	updateTableData,
}) {
	const [modalContent, setModalContent] = useState({
		title: '',
		imageSrc: null,
	})
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		birth: '',
		email: '',
		country: '',
		nickname: '',
		phone: '',
		telegram: '',
		additionalEmail: '',
		additionalTelegram: '',
		isBlocked: Boolean(false),
	})
	const [modalOpen, setModalOpen] = useState(false)
	const [editModalOpen, setEditModalOpen] = useState(false)
	const [actionToConfirm, setActionToConfirm] = useState(null)
	const isMobile = useMediaQuery('@media(max-width: 425px)')

	const handleOpenModal = (action, actionType, id) => {
		setActionToConfirm(() => () => action(id))
		updateModalContent(actionType, id)
		setModalOpen(true)
	}

	const handleOpenEditModal = async (action, actionType, id) => {
		updateModalContent(actionType, id)
		const { data } = await getUserById(id)
		setFormData({
			firstName: data?.firstName || '',
			lastName: data?.lastName || '',
			birth: data?.birth || new Date().toISOString().split('T')[0],
			email: data?.email || '',
			country: data?.country || '',
			nickname: data?.nickname || '',
			phone: data?.phone || '',
			telegram: data?.telegram || '',
			additionalEmail: data?.additionalEmail || '',
			additionalTelegram: data?.additionalTelegram || '',
			joinLimitBeginner: data?.joinLimitBeginner,
			joinLimitWorker: data?.joinLimitWorker,
			isBlocked: Boolean(data?.isBlocked),
			isConfirmed: Boolean(data?.isConfirmed),
		})
		setEditModalOpen(true)
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

	const updateModalContent = (action, id) => {
		let content = {}
		switch (action) {
			case 'edit':
				content = {
					id: id,
					title: `Editing user #${id}`,
					imageSrc: acceptImage.src,
				}
				break
			case 'delete':
				content = {
					title: `Are you sure you want to delete user #${id}?`,
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
				content = { title: '', imageSrc: null }
		}
		setModalContent(content)
	}
	const onEditClick = async (id, formData) => {
		await editUser(id, formData)
		updateTableData()
	}
	const onDeleteClick = id => {
		deleteUser(id)
		updateTableData()
	}
	return (
		<>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Nickname</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Levels</TableCell>
						<TableCell>Cells</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<tbody>
					{users?.map((user, index) => (
						<TableItem
							key={index}
							item={user}
							handleOpenModal={handleOpenModal}
							handleOpenEditModal={handleOpenEditModal}
							onDeleteClick={onDeleteClick}
							onEditClick={onEditClick}
						/>
					))}
				</tbody>
			</Table>

			<ConfirmationModal
				open={modalOpen}
				handleClose={handleCloseModal}
				handleConfirm={handleConfirmAction}
				title={modalContent.title}
				isLoading={loading}
			>
				<Image
					src={modalContent.imageSrc}
					alt=''
					width={isMobile ? 110 : 250}
					height={isMobile ? 110 : 250}
				/>
			</ConfirmationModal>
			<EditModal
				open={editModalOpen}
				handleClose={() => {
					setEditModalOpen(false)
					setFormData({
						firstName: '',
						lastName: '',
						birth: '',
						email: '',
						country: '',
						nickname: '',
						phone: '',
						telegram: '',
						additionalEmail: '',
						additionalTelegram: '',
					})
				}}
				id={modalContent.id}
				handleConfirm={onEditClick}
				formData={formData}
				setFormData={setFormData}
				title={modalContent.title}
				isLoading={loading}
			/>
		</>
	)
}
