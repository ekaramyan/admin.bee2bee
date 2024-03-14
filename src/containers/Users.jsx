import { Box, CircularProgress, useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'
import Wrapper from '@/components/UI/Wrapper'
import TableComponent from '@/components/TableComponent'
import useUsers from '@/hooks/useUsers'

export default function Users({ header }) {
	const [limit, setLimit] = useState(25)
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	const { data, loading, error, getUsers } = useUsers()

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

	const handleLimitChange = limit => {
		setLimit(limit)
	}
	const onPageChange = page => {
		fetchDataAsync({ page, limit })
	}

	console.log(data)

	return (
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				width: '100%',
			}}
		>
			<Wrapper
				header={header}
				totalPages={data?.total_pages}
				currentPage={data?.current_page}
				onPageChange={onPageChange}
				handleLimitChange={handleLimitChange}
				selectedLimit={limit}
				style={{
					minHeight: 760,
					maxHeight: isMobile ? '80dvh' : 'none',
					overflow: 'auto',
				}}
			>
				<Box
					style={{
						maxHeight: '100%',
						overflowY: 'auto',
						padding: '10px',
						scrollbarColor: '#bc5a00 #f17d15',
					}}
				>
					{loading ? (
						<CircularProgress size={72} />
					) : (
						<TableComponent users={data?.data} />
					)}
				</Box>
			</Wrapper>
		</Box>
	)
}
