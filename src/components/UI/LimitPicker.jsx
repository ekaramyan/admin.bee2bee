import { Select, MenuItem } from '@mui/material'

export default function LimitPicker({ limits, selectedLimit, onLimitChange }) {
	const handleLimitChange = event => {
		onLimitChange(event.target.value)
	}

	return (
		<Select value={selectedLimit} onChange={handleLimitChange}>
			{limits.map(limit => (
				<MenuItem key={limit} value={limit}>
					{limit}
				</MenuItem>
			))}
		</Select>
	)
}
