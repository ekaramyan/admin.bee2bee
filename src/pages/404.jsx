import { Box, ThemeProvider, Typography } from '@mui/material'
import theme from '@/Theme'

export default function Custom404() {
	return (
		<ThemeProvider theme={theme}>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '100%',
				}}
			>
				<Typography variant='block_header'>Page Does Not Exists</Typography>
			</Box>
		</ThemeProvider>
	)
}
