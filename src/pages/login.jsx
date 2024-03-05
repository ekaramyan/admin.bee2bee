import dynamic from 'next/dynamic'
const LoginContainer = dynamic(() => import('@/containers/LoginContainer'))
import useAuthentication from '@/hooks/useAuthentication'

export default function LoginPage() {
	useAuthentication(false)
	return <LoginContainer />
}
