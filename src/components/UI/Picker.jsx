import { Select, MenuItem } from '@mui/material'

export default function Picker({ items, selectedItem, onChange }) {
	const handleChange = event => {
		onChange(event.target.value)
	}

	return (
		<Select value={selectedItem} onChange={handleChange}>
			{items.map(item => (
				<MenuItem key={item} value={item}>
					{item}
				</MenuItem>
			))}
		</Select>
	)
}
