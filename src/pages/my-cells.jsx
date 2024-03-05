import MyCells from '@/containers/MyCellsPage'
import useAuthentication from '@/hooks/useAuthentication'

export default function AboutPage() {
	useAuthentication()
	return <MyCells />
}
