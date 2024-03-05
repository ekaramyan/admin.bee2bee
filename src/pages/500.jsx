import { Box, ThemeProvider, Typography } from '@mui/material'
import useAuthentication from '@/hooks/useAuthentication'
import theme from '../Theme'

export default function Custom500() {
	useAuthentication()

	return (
		<ThemeProvider theme={theme}>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '100dvh',
				}}
			>
				<Typography variant='block_header'>Page Does Not Exists</Typography>
			</Box>
		</ThemeProvider>
	)
}
