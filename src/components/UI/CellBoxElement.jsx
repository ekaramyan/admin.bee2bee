import { Typography } from '@mui/material'
import moment from 'moment-timezone'

export default function CellBoxElement({
	data,
	isActive,
	isWhite,
	showQueue,
	index,
}) {
	const dateFromAPI = new Date(data.updatedAt)
	const offsetMinutes = dateFromAPI.getTimezoneOffset()
	const adjustedDate = moment(dateFromAPI).add(-offsetMinutes, 'minutes')
	const cellDate = adjustedDate.format('YYYY-MM-DD | HH:mm:ss')
	return (
		<>
			{' '}
			<Typography
				variant={
					isActive ? 'active_cells' : isWhite ? 'join_cells' : 'closed_cells'
				}
			>
				<b>
					{index + 1}.{' '}
					{showQueue && data?.queuePosition && `№${data?.queuePosition}`}{' '}
					{data.cellLevel.level.slice(0, 1)}-#{data.id}
				</b>{' '}
				{cellDate} <br />
			</Typography>
		</>
	)
}
