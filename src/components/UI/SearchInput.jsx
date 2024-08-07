import { useState, useEffect } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import useInput from '@/hooks/useInput'

export default function SearchInput({ onSearch, initialValue, setSearch }) {
	const { value, onChange } = useInput(initialValue)
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			onSearch({ search: debouncedValue, order: 'asc' })
		}, 1000)

		return () => {
			clearTimeout(handler)
		}
	}, [debouncedValue])
	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			onSearch({ search: value, order: 'asc' })
		}
	}
	const handleChange = e => {
		onChange(e)
		setDebouncedValue(e.target.value)
		setSearch(e.target.value)
	}
	return (
		<Stack display='flex' alignItems='center' flexDirection='row' gap={1}>
			<TextField
				variant='outlined'
				placeholder='Search'
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				value={value}
			/>
			<Button
				onClick={() => onSearch({ search: value, order: 'asc' })}
				variant='standard'
				sx={{ height: '100%', color: '#FF5733', fontSize: 16 }}
				size='large'
			>
				<SearchOutlined size='large' />
			</Button>
		</Stack>
	)
}
