import { Box, CircularProgress, useMediaQuery } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import Wrapper from '@/components/UI/Wrapper'
import TableComponent from '@/components/TableComponent'
import useUsers from '@/hooks/useUsers'

export default function Users({ header }) {
	const [limit, setLimit] = useState(25)
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	const {
		data: users,
		loading: usersLoading,
		error: usersError,
		getUsers,
	} = useUsers()
	const { data, loading, success, error, deleteUser, editUser, getUserById } =
		useUsers()

	const fetchDataAsync = async ({ page = 1, limit = limit }) => {
		try {
			await getUsers(page, limit)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchDataAsync({ page: 1, limit: limit })
	}, [limit])

	// useEffect(() => {
	// 	if (success || error) {
	// 		fetchDataAsync({ page: 1, limit: limit })
	// 	}
	// }, [success, error])

	const handleLimitChange = limit => {
		setLimit(limit)
	}
	const onPageChange = page => {
		fetchDataAsync({ page, limit })
	}

	return (
		<Wrapper
			header={header}
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
						users={users?.data}
						deleteUser={deleteUser}
						editUser={editUser}
						getUserById={getUserById}
						loading={loading}
					/>
				)}{' '}
			</Box>
		</Wrapper>
	)
}
