import React from 'react'
import { useState, useEffect } from 'react'
import Wrapper from '../components/UI/Wrapper'
import {
	Grid,
	useMediaQuery,
	FormGroup,
	FormControlLabel,
	Switch,
	Box,
	CircularProgress,
	Typography,
} from '@mui/material'
import dynamic from 'next/dynamic'
import Cookies from 'js-cookie'
import { fetchData } from '@/api/fetchData'
import useCells from '@/hooks/useCells'
import OutlinedButton from '@/components/UI/OutlinedButton'
import CellModal from '@/components/UI/CellModal'
import SearchInput from '@/components/UI/SearchInput'
const Cell = dynamic(() => import('../components/UI/Cell'))

const token = Cookies.get('access_token')
const url = process.env.API_URL
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

export default function Cells() {
	const [active, setActive] = useState(true)
	const [limit, setLimit] = useState(100)
	const [levels, setLevels] = useState(null)
	const [levelId, setLevelId] = useState(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [acceptedCount, setAcceptedCount] = useState(0)
	const [searchQuery, setSearchQuery] = useState(null)

	const isMobile = useMediaQuery('@media(max-width:1300px)')

	const { data, loading, error, getCells } = useCells()
	const {
		data: cell,
		loading: cellLoading,
		error: cellError,
		success: cellSuccess,
		getCellById,
	} = useCells()
	const {
		data: consultants,
		loading: consultantsLoading,
		error: consultantsError,
		success: consultantsSuccess,
		getConsultants,
		editConsultantAndLeader,
	} = useCells()
	const {
		data: follower,
		success: addSuccess,
		loading: addFollowerLoading,
		error: addFollowerError,
		addFollower,
	} = useCells()
	const {
		data: patchingData,
		loading: patchingLoading,
		error: patchingError,
		success: patchingSuccess,
		deleteFollower,
		editFollower,
	} = useCells()
	const {
		success: closeSuccess,
		loading: closeLoading,
		error: closeError,
		closeCell,
	} = useCells()

	const fetchDataAsync = async ({
		page = page,
		limit = limit,
		active = active,
		level = level,
		search = search,
	}) => {
		try {
			await getCells({
				page: page,
				limit: limit,
				active: active,
				level: level,
				search: searchQuery,
			})
			const response = await fetchData(`${url}/cell-levels`, token)
			setLevels(response.data)
		} catch (err) {
			console.error(err)
		}
	}

	const searchCell = async ({ page = 1, limit = 100, search = search }) => {
		await getCells({
			page: page,
			limit: limit,
			search: search,
			active: active,
			level: levelId,
		})
		const response = await fetchData(`${url}/cell-levels`, token)
		setLevels(response.data)
	}

	useEffect(() => {
		fetchDataAsync({
			page: 1,
			limit: limit,
			active: active,
			level: levelId,
			search: searchQuery,
		})
	}, [limit, active, levelId, modalOpen])

	const handleLimitChange = limit => {
		setLimit(limit)
	}
	const onPageChange = page => {
		fetchDataAsync({ page, limit, active, level: levelId })
	}

	const onModalOpen = async id => {
		await getCellById(id)
		await getConsultants(levelId)
		setModalOpen(true)
	}

	const refreshFetch = async id => {
		await getCellById(id)
	}
	const onAddUserClick = async (cellId, id) => {
		await addFollower(cellId, id)
	}
	const onDeleteUserClick = async id => {
		await deleteFollower(id)
	}
	const onApproveClick = async id => {
		await editFollower(id, acceptData)
	}
	const onCloseClick = async id => {
		const result = await closeCell(id, closeData)
		result.isSuccess && setModalOpen(false)
		refreshFetch(id)
	}

	return (
		<>
			<Wrapper
				header={
					<Box style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
						Cells
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={active}
										onChange={() => setActive(!active)}
									/>
								}
								label='active'
							/>
						</FormGroup>
					</Box>
				}
				totalPages={data?.total_pages}
				currentPage={data?.current_page}
				onPageChange={onPageChange}
				handleLimitChange={handleLimitChange}
				selectedLimit={limit}
				style={{
					minHeight: 760,
					maxHeight: isMobile ? '80dvh' : 'none',
				}}
			>
				<SearchInput
					onSearch={searchCell}
					initialValue={''}
					setSearch={setSearchQuery}
				/>
				<Box
					style={{
						display: 'flex',
						gap: 5,
					}}
				>
					{levels?.map(level => (
						<OutlinedButton
							key={level.id}
							title={level.level}
							id={levelId}
							level={level.id}
							onClick={() => {
								setLevelId(levelId === level.id ? null : level.id)
							}}
						/>
					))}
				</Box>
				<Typography variant=''>
					Cells on level {levelId}: {data?.total}
				</Typography>
				<Grid
					style={{
						width: '100%',
						height: isMobile ? 'auto' : '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexWrap: 'wrap',
						gap: isMobile ? 10 : '25px 0px',
						overflow: 'auto',
						scrollbarColor: '#bc5a00 #f17d15',
					}}
				>
					{loading ? (
						<CircularProgress size={72} />
					) : (
						<>
							{data?.data?.map((cell, index) => (
								<Cell
									key={cell?.id}
									id={cell.id}
									consultant={cell.consultant}
									leader={cell.leader}
									cellUsers={cell.cellUsers}
									onModalOpen={onModalOpen}
									style={{
										flexBasis: '33.33%',
										maxWidth: '33.33%',
										boxSizing: 'border-box',
									}}
								/>
							))}
						</>
					)}
				</Grid>
			</Wrapper>
			{cell && (
				<CellModal
					open={modalOpen}
					handleClose={() => {
						setModalOpen(false)
					}}
					refreshFetch={refreshFetch}
					cellData={cell.data}
					setAcceptedCount={setAcceptedCount}
					acceptedCount={acceptedCount}
					addSuccess={addSuccess}
					addFollowerLoading={addFollowerLoading}
					addFollowerError={addFollowerError}
					onApproveClick={onApproveClick}
					patchingSuccess={patchingSuccess}
					patchingLoading={patchingLoading}
					patchingError={patchingError}
					onAddUserClick={onAddUserClick}
					onDeleteUserClick={onDeleteUserClick}
					closeSuccess={closeSuccess}
					closeLoading={closeLoading}
					closeError={closeError}
					closeCell={onCloseClick}
					title={`Editing cell #${cell.data.id}`}
					isLoading={loading}
					editCaL={editConsultantAndLeader}
					consultants={consultants}
				/>
			)}
		</>
	)
}
