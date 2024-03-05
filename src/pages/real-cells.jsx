import RealCells from '@/containers/RealCellsPage'
import useAuthentication from '@/hooks/useAuthentication'

export default function AboutPage() {
	useAuthentication()
	return <RealCells />
}
