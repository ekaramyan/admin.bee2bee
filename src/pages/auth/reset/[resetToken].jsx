import ResetPassword from '@/containers/ResetPassword'
import useAuthentication from '@/hooks/useAuthentication'

export default function ResetPage() {
	useAuthentication(false)
	return <ResetPassword />
}
