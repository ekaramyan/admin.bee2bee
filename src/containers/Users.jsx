import { Box, Typography } from '@mui/material'
import Wrapper from '@/components/UI/Wrapper'
import TableComponent from '@/components/TableComponent'

export default function Users({ header, users }) {
	console.log(users)
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
			<Wrapper header={header} notLoggedIn={true} style={{ minHeight: 700 }}>
				<Box
					style={{
						maxHeight: '100%',
						overflowY: 'auto',
						padding: '10px',
						scrollbarColor: '#bc5a00 #f17d15',
					}}
				>
					<TableComponent users={users} />
				</Box>
			</Wrapper>
		</Box>
	)
}
