import Faq from '@/containers/Faq'
import TextBlock from '@/containers/TextBlock'
import useAuthentication from '@/hooks/useAuthentication'

export default function RulesPage() {
	useAuthentication(false)
	return <Faq />
}
