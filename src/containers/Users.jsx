import { Box, CircularProgress, useMediaQuery } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import Wrapper from '@/components/UI/Wrapper'
import TableComponent from '@/components/TableComponent'
import useUsers from '@/hooks/useUsers'
import SearchInput from '@/components/UI/SearchInput'

export default function Users({ header }) {
	const [limit, setLimit] = useState(100)
	const [page, setPage] = useState(1)
	const [updateTable, setUpdateTable] = useState(false)
	const [tableData, setTableData] = useState(null)
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
					? getUsers(page, limit, search)
					: new Promise(resolve =>
							setTimeout(
								async () => resolve(await getUsers(page, limit, search)),
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
	}, [limit, updateTable, page])

	const handleLimitChange = limit => {
		setLimit(limit)
	}

	const onPageChange = page => {
		setPage(page)
	}

	const updateTableData = () => {
		setUpdateTable(prevState => !prevState)
	}

	return (
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
						updateTableData={updateTableData}
					/>
				)}
			</Box>
		</Wrapper>
	)
}
