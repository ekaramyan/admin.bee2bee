import { Button, styled } from '@mui/material'

export default function OutlinedButton({ id, level, title, onClick }) {
	const StyledButton = styled(Button)({
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		gap: 5,
		width: '100%',
		maxWidth: 220,
		minWidth: 200,
		color: '#23201C',
		textAlign: 'center',
		textShadow: '1px 1px 1px #fff',
		fontFamily: 'Noto Sans',
		fontSize: '14px',
		fontWeight: 400,
		textTransform: 'uppercase',
		borderRadius: '5px',
		border: level === id ? '2px solid #E06B00' : '1px solid #F9AA13',
		background: '#EAEEE8',
		cursor: 'pointer',
		transition: '.3s',
		'&:hover': {
			border: '1px solid #E06B00',
		},
		'&:disabled': {
			cursor: 'not-allowed',
			color: 'rgb(123, 123, 122)',
			border: '1px solid rgba(217, 217, 217, 0.2)',
			background: 'rgba(217, 217, 217, 0.2)',
		},
		p: {
			color: '#E06B00',
			fontSize: 14,
			fontWeight: 700,
		},
	})

	return (
		<StyledButton variant='outline' onClick={onClick}>
			<p> {title}</p>
		</StyledButton>
	)
}
