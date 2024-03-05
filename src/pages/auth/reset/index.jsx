import ResetPassEmail from '@/containers/ResetPassEmail'
import useAuthentication from '@/hooks/useAuthentication'

export default function ResetPasswordPage() {
	useAuthentication(false)
	return <ResetPassEmail />
}
