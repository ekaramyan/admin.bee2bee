import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import CellInfo from '@/containers/CellInfo'
import { universalServerSideProps } from '@/api/ssr'

export default function Cell({ cellData }) {
	const dispatch = useDispatch()
	const token = Cookies.get('access_token')
	if (token) {
		dispatch({ type: 'LOG_IN' })
	}
	return <CellInfo data={cellData.data} />
}

export async function getServerSideProps(context) {
	const { req } = context
	const id = context.params.cellId
	const token = req.cookies.access_token
	const apiUrl = process.env.API_URL
	const url = `${apiUrl}/cells/${id}`

	return await universalServerSideProps(url, token, 'cellData')
}
