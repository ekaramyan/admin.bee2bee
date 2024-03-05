import { universalServerSideProps } from '@/api/ssr'
import Users from '@/containers/Users'
import useAuthentication from '@/hooks/useAuthentication'

export default function RulesPage({ users }) {
	useAuthentication(false)
	return <Users header={'Users'} users={users.data} />
}

export async function getServerSideProps(context) {
	const { req, query } = context
	const token = req.cookies.access_token
	const apiUrl = process.env.API_URL
	const url = `${apiUrl}/users?limit=100&page=1`

	const usersProps = await universalServerSideProps(url, token, 'users')

	return {
		props: {
			...usersProps.props,
		},
	}
}
