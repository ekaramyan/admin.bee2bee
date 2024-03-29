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
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Cookies from 'js-cookie'
import { fetchData } from '@/api/fetchData'
import useCells from '@/hooks/useCells'
import OutlinedButton from '@/components/UI/OutlinedButton'
import CellModal from '@/components/UI/CellModal'
const Cell = dynamic(() => import('../components/UI/Cell'))

const token = Cookies.get('access_token')
const url = process.env.API_URL

export default function Cells() {
	const [active, setActive] = useState(true)
	const [limit, setLimit] = useState(25)
	const [levels, setLevels] = useState(null)
	const [levelId, setLevelId] = useState(1)
	const [modalOpen, setModalOpen] = useState(false)
	const [followerId, setFollowerId] = useState(null)
	const [acceptedCount, setAcceptedCount] = useState(0)
	const router = useRouter()
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	const { data, loading, error, getCells } = useCells()
	const {
		data: cell,
		loading: cellLoading,
		error: cellError,
		getCellById,
	} = useCells()

	const fetchDataAsync = async ({
		page = 1,
		limit = limit,
		active = active,
		level = level,
	}) => {
		try {
			await getCells(page, limit, active, level)
			const response = await fetchData(`${url}/cell-levels`, token)
			setLevels(response.data)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchDataAsync({ page: 1, limit: limit, active: active, level: levelId })
	}, [limit, active, levelId])

	const handleLimitChange = limit => {
		setLimit(limit)
	}
	const onPageChange = page => {
		fetchDataAsync({ page, limit, active, level: levelId })
	}

	const onModalOpen = async id => {
		await getCellById(id)
		setModalOpen(true)
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
							onClick={() => setLevelId(level.id)}
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
					id={cell.data.id}
					cellData={cell.data}
					setAcceptedCount={setAcceptedCount}
					acceptedCount={acceptedCount}
					handleConfirm={null}
					formData={null}
					setFormData={null}
					followerId={followerId}
					setFollowerId={setFollowerId}
					title={`Editing cell #${cell.data.id}`}
					isLoading={loading}
				/>
			)}
		</>
	)
}
