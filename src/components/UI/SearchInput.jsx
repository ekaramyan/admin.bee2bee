import { Button, Stack, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import useInput from '@/hooks/useInput'

export default function SearchInput({ onSearch, initialValue }) {
	const { value, onChange } = useInput(initialValue)
	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			onSearch({ search: value })
		}
	}
	return (
		<Stack display='flex' alignItems='center' flexDirection='row' gap={1}>
			<TextField
				variant='outlined'
				placeholder='Search'
				onChange={onChange}
				onKeyPress={handleKeyPress}
				value={value}
			/>
			<Button
				onClick={() => onSearch({ search: value })}
				variant='standard'
				sx={{ height: '100%', color: '#FF5733', fontSize: 16 }}
				size='large'
			>
				<SearchOutlined size='large' />
			</Button>
		</Stack>
	)
}
