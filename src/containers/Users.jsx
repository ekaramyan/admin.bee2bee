import {
	Box,
	CircularProgress,
	useMediaQuery,
	Dialog,
	DialogContent,
	styled,
	Typography,
	Slide,
} from '@mui/material'
import { useState, useEffect, useCallback, forwardRef } from 'react'
import Wrapper from '@/components/UI/Wrapper'
import TableComponent from '@/components/TableComponent'
import useUsers from '@/hooks/useUsers'
import SearchInput from '@/components/UI/SearchInput'

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
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />
})

export default function Users({ header }) {
	const [limit, setLimit] = useState(100)
	const [sorting, setSorting] = useState('created_at')
	const [page, setPage] = useState(1)
	const [updateTable, setUpdateTable] = useState(false)
	const [tableData, setTableData] = useState(null)
	const [showErrorDialog, setShowErrorDialog] = useState(false)
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	const {
		data: users,
		loading: usersLoading,
		error: usersError,
		getUsers,
	} = useUsers()
	const { data, loading, success, error, deleteUser, editUser, getUserById } =
		useUsers()

	const fetchDataAsync = useCallback(
		async ({ page: page, limit: limit, search: search }) => {
			try {
				console.log(search)
				const response = await (updateTable
					? getUsers(page, limit, search, sorting)
					: new Promise(resolve =>
							setTimeout(
								async () =>
									resolve(await getUsers(page, limit, search, sorting)),
								1000
							)
					  ))
				const newData = [...response.data]
				console.log(newData)
				setTableData(newData)
			} catch (err) {
				console.error(err)
			}
		},
		[getUsers]
	)

	useEffect(() => {
		fetchDataAsync({ page: page, limit: limit })
	}, [limit, updateTable, page, sorting])

	useEffect(() => {
		if (error) {
			setShowErrorDialog(true)
		}
	}, [error, usersError])

	const handleLimitChange = limit => {
		setLimit(limit)
	}
	const handleSortingChange = sorting => {
		setSorting(sorting)
	}

	const onPageChange = page => {
		setPage(page)
	}

	const updateTableData = () => {
		setUpdateTable(prevState => !prevState)
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
						<Typography variant='body1'>{error}</Typography>
					</DialogContent>
				</StyledDialog>
			)}
			<Wrapper
				header={
					<Box style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
						{header}
						<SearchInput onSearch={fetchDataAsync} initialValue={''} />
					</Box>
				}
				totalPages={users?.total_pages}
				currentPage={users?.current_page}
				onPageChange={onPageChange}
				handleLimitChange={handleLimitChange}
				selectedLimit={limit}
				handleSortingChange={handleSortingChange}
				selectedSorting={sorting}
				style={{
					minHeight: 760,
					maxHeight: isMobile ? '80dvh' : 'none',
				}}
			>
				<Box
					style={{
						height: '100%',
						overflowY: usersLoading ? 'none' : 'auto',
						padding: '10px',
						scrollbarColor: '#bc5a00 #f17d15',
					}}
				>
					{usersLoading ? (
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								height: '100%',
							}}
						>
							<CircularProgress size={72} />
						</Box>
					) : (
						<TableComponent
							users={tableData}
							deleteUser={deleteUser}
							editUser={editUser}
							getUserById={getUserById}
							loading={loading}
							error={error}
							success={success}
							updateTableData={updateTableData}
						/>
					)}
				</Box>
			</Wrapper>
		</>
	)
}
