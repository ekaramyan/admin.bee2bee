import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { fetchData } from '@/api/fetchData'
import Wrapper from '../components/UI/Wrapper'
import {
	Grid,
	useMediaQuery,
	FormGroup,
	FormControlLabel,
	Switch,
} from '@mui/material'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const Cell = dynamic(() => import('../components/UI/Cell'))

export default function Cells() {
	const [data, setData] = useState(null)
	const router = useRouter()
	const token = Cookies.get('access_token')
	const url = process.env.API_URL
	const isMobile = useMediaQuery('@media(max-width:1300px)')

	useEffect(() => {
		const fetchDataAsync = async () => {
			try {
				const response = await fetchData(`${url}/cells/v2/all/list`, token)
				setData(response.data)
			} catch (err) {
				console.error(err)
			}
		}

		fetchDataAsync()
	}, [])

	console.log(data)

	return (
		<Wrapper
			header={
				<>
					Cells
					<FormGroup>
						<FormControlLabel
							control={<Switch defaultChecked />}
							label='active'
						/>
					</FormGroup>
				</>
			}
			style={{
				minHeight: 760,
				maxHeight: isMobile ? '80dvh' : 'none',
				overflow: 'auto',
			}}
		>
			<Grid
				style={{
					width: '100%',
					height: isMobile ? 'auto' : '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexWrap: 'wrap',
					// alignContent: 'center',
					gap: isMobile ? 10 : '25px 0px',
					// userSelect: 'none',
				}}
			>
				{data?.map((cell, index) => (
					<Cell
						key={cell?.id}
						id={cell.id}
						consultant={cell.consultant}
						leader={cell.leader}
						cellUsers={cell.cellUsers}
						style={{
							flexBasis: '33.33%',
							maxWidth: '33.33%',
							boxSizing: 'border-box',
						}}
					/>
				))}
			</Grid>
		</Wrapper>
	)
}
