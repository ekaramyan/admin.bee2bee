import JoinCell from '@/containers/JoinCell'
import useAuthentication from '@/hooks/useAuthentication'

export default function JoinTheCell() {
	useAuthentication()
	return <JoinCell />
}
