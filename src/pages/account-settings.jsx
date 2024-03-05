import { universalServerSideProps } from '@/api/ssr'
import AccountSettings from '@/containers/AccountSettings'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

export default function AccountSettingsPage({ accountData }) {
	const dispatch = useDispatch()
	const token = Cookies.get('access_token')
	if (token) {
		dispatch({ type: 'LOG_IN' })
	}
	return <AccountSettings data={accountData} />
}

export async function getServerSideProps(context) {
	const { req } = context
	const token = req.cookies.access_token
	const apiUrl = process.env.API_URL
	const url = `${apiUrl}/users/me`

	return await universalServerSideProps(url, token, 'accountData')
}
