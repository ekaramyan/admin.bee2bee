import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = createTheme({
	overrides: {
		'*': {
			scrollBehavior: 'smooth',
		},
	},
	components: {
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: '#e06b00',
					'&:hover': {
						backgroundColor: 'transparent',
					},
					'&.Mui-checked': {
						color: '#e06b00',
					},
				},
			},
			defaultProps: {
				color: 'default',
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					'&.MuiCheckbox-colorPrimary.Mui-checked': {
						color: '#000',
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: 'rgba(0, 0, 0, 0.7)',
					'&.Mui-focused': {
						color: '#e06b00',
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					fontFamily: 'Noto Sans',
					fontSize: 16,
					fontWeight: 500,
					color: '#1B170F',
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				underline: {
					'&:before': {
						borderBottom: '2px solid #c0c0c0c',
					},
					'&:hover:not(.Mui-disabled):before': {
						borderBottom: '2px solid #A5560F',
					},
					'&:after': {
						borderBottom: '2px solid #e06b00',
					},
				},
			},
		},
	},

	palette: {
		primary: {
			main: '#FF5733',
			contrastText: '#FFF',
		},
		secondary: {
			main: '#FFFFFFB2',
			contrastText: '#FFFFFFB2',
		},
	},
	button: {
		fontFamily: 'Noto Sans',
		fontSize: 20,
		allVariants: {
			cursor: 'pointer',
			fontSize: 20,
			fontWeight: 300,
			color: '#241f55',
			lineHeight: 1.55,
			zIndex: 2,
		},
		secondary: {
			color: '#fff',
		},
		auth: {},
	},
	typography: {
		fontFamily: 'Noto Sans',
		fontSize: 14,
		button: {
			textTransform: 'none',
		},
		allVariants: {
			cursor: 'default',
			fontSize: 20,
			fontWeight: 300,
			color: '#241f55',
			lineHeight: 1.55,
		},
		body1: {
			fontFamily: 'Noto Sans',
			fontSize: 16,
			color: '#8C7F77',
			fontWeight: 300,
		},
		main_head: {
			fontSize: 36,
			color: '#A5560F',
			fontWeight: 400,
			textShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)',
			textTransform: 'uppercase',
		},
		main_bottom_highlight: {
			color: '#E06B00',
			textShadow: ' 1px 1px 1px #A5560F',
			fontSize: 56,
			fontWeight: 900,
			textTransform: 'uppercase',
			'@media (max-width:1300px)': {
				fontSize: 30,
			},
		},
		main_bottom: {
			color: '#1B170F',
			textShadow: ' 1px 1px 1px #E06B00',
			fontSize: 76,
			fontWeight: 700,
			letterSpacing: '-0.7px',
			textTransform: 'uppercase',
			'@media (max-width:1300px)': {
				fontSize: 40,
			},
		},
		auth_head: {
			display: 'block',
			position: 'absolute',
			left: 0,
			transform: 'rotate(-90deg) translateY(48%) translateX(25%)',
			whiteSpace: 'nowrap',
			width: '10%',
			height: '100%',
			fontSize: 48,
			fontWeight: 900,
			textTransform: 'uppercase',
			cursor: 'pointer',
			lineHeight: 1,
			userSelect: 'none',
			transition: '.3s',
		},
		footer_buttons: {
			cursor: 'pointer',
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
			textTransform: 'uppercase',
			active: {
				color: '#E06B00',
				textDecoration: 'underline',
			},
		},
		header_buttons: {
			cursor: 'pointer',
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
			textDecoration: 'none',
			textTransform: 'uppercase',
			active: {
				color: '#E06B00',
			},
		},
		block_header: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 42,
			fontWeight: 700,
			textTransform: 'uppercase',
			'@media (max-width:1300px)': {
				fontSize: 32,
			},
		},
		burger_tabs: {
			color: '#FFF',
			fontFamily: 'Noto Sans',
			fontSize: 22,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		level_small: {
			color: '#FFF',
			textAlign: 'center',
			fontFamily: 'Noto Sans',
			fontSize: 30,
			fontWeight: 700,
			textTransform: 'uppercase',
			padding: '0 10%',
			lineHeight: 1,
		},
		level_big: {
			color: '#FFF',
			textAlign: 'center',
			fontFamily: 'Noto Sans',
			fontSize: 36,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		my_cells_button: {
			cursor: 'pointer',
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 32,
			fontWeight: 700,
			textDecoration: 'none',
			textTransform: 'uppercase',
			active: {
				color: '#E06B00',
			},
			'@media(max-width:1300px)': {
				fontSize: 24,
			},
		},
		h6: {
			color: '#1B170F',
			fontFamily: ' Noto Sans',
			fontSize: 36,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		h6_light: {
			color: '#fff',
			fontFamily: ' Noto Sans',
			fontSize: 24,
			fontWeight: 700,
			textTransform: 'uppercase',
			'@media(max-width:1300px)': {
				color: '#1B170F',
			},
		},
		user_key: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 400,
		},
		user_item: {
			color: '#8C7F77',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 700,
		},
		account_item: {
			color: '#E06B00',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 700,
		},
		cell_user_key: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 400,
			'@media(max-width:1300px)': {
				color: '#1B170F',
			},
		},
		cell_user_item: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 700,
			textTransform: 'uppercase',
			'@media(max-width:1300px)': {
				color: '#1B170F',
			},
		},
		cell_user_subtext: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
		},
		cell_id: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 28,
			fontWeight: 700,
			textTransform: 'uppercase',
			lineHeight: 1,
		},
		cell_id_mobile: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 28,
			fontWeight: 700,
			textTransform: 'uppercase',
			lineHeight: 1,
		},
		date: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 18,
			fontWeight: 400,
		},
		forgot: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
			display: 'flex',
			gap: 5,
		},
		active_cells: {
			color: '#119A48',
			fontFamily: 'Noto Sans',
			fontSize: 14,
			fontWeight: 400,
			textTransform: 'uppercase',
		},
		closed_cells: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 14,
			fontWeight: 400,
			textTransform: 'uppercase',
		},
		level_dark: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 24,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		my_cells_titles: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		real_cells_queue: {
			textAlign: 'center',
			color: '#FFF',
			fontFamily: 'Noto Sans',
			fontSize: 14,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		consultant_name: {
			color: '#E06B00',
			fontFamily: 'Noto Sans',
			fontSize: 24,
			fontWeight: 700,
			lineHeight: 1.16,
			textTransform: 'uppercase',
		},
		consultant_header: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 22,
			fontWeight: 400,
			lineHeight: 1.1,
		},
		consultant_label: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
			lineHeight: 1,
		},
		consultant_data: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		outlined: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
			backgroundColor: '#fff',
			padding: '16.5px 14px',
			borderRadius: 4,
			border: '1px solid #A5560F',
			width: '100%',
		},
		join_cells_titles: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 17,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		join_cells_titles_mobile: {
			color: '#A5560F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 700,
			textTransform: 'uppercase',
			paddingLeft: 12,
		},
		join_cells: {
			color: '#EAEEE8',
			fontFamily: 'Noto Sans',
			fontSize: 13.5,
			fontWeight: 400,
			textTransform: 'uppercase',
		},
		closed_congrats: {
			background: 'linear-gradient(#ffa700, #ffeb25)',
			'-webkit-background-clip': 'text',
			'-moz-background-clip': 'text',
			backgroundClip: 'text',
			color: 'transparent',
			textShadow: '-3px -2px 1px #A5560F',
			fontFamily: 'Noto Sans',
			fontSize: 26,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
	},
})

const responsiveTheme = responsiveFontSizes(theme, {
	breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
	factor: 4,
})

export default responsiveTheme
