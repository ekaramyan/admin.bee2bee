import Contacts from '@/containers/Contacts'
import useAuthentication from '@/hooks/useAuthentication'

export default function ContactsPage() {
	useAuthentication(false)
	return <Contacts />
}
