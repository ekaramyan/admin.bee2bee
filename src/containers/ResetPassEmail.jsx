import Wrapper from '../components/UI/Wrapper'
import EmailForm from '@/components/EmailForm'

export default function ResetPassEmail() {
	return (
		<Wrapper header={'Reset Password'}>
			<EmailForm />
		</Wrapper>
	)
}
