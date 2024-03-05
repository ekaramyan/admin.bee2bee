import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import MyAccount from '@/containers/MyAccount'
import { universalServerSideProps } from '@/api/ssr'

export default function AccountPage({ accountData }) {
	const dispatch = useDispatch()
	const token = Cookies.get('access_token')
	if (token) {
		dispatch({ type: 'LOG_IN' })
	}
	return <MyAccount data={accountData} />
}

export async function getServerSideProps(context) {
	const { req } = context
	const token = req.cookies.access_token
	const apiUrl = process.env.API_URL
	const url = `${apiUrl}/users/me`

	return await universalServerSideProps(url, token, 'accountData')
}
