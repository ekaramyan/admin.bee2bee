import Cells from '@/containers/Cells'
import useAuthentication from '@/hooks/useAuthentication'

export default function JoinTheCell() {
	useAuthentication()
	return <Cells />
}
