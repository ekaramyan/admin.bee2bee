import { useRouter } from 'next/router'
import { useState } from 'react'
import Wrapper from '../components/UI/Wrapper'
import ChangePassForm from '@/components/ChangePassForm'
import useReset from '@/hooks/useReset'

export default function AccountSettings() {
	const router = useRouter()
	const { loading, error, success, getEmail, sendNewPass } = useReset()
	const { resetToken } = router.query
	const [invalid, setInvalid] = useState(null)
	const validatePassword = (password, confirmPassword) => {
		const hasNumber = /[0-9]/.test(password)
		const isValidLength = password.length >= 8
		const passwordsMatch = password === confirmPassword
		return hasNumber && isValidLength && passwordsMatch
	}
	const handleSubmit = async event => {
		event.preventDefault()
		const formData = {
			resetToken: resetToken,
			password: event.target.password.value,
			passwordConfirmation: event.target.passwordConfirmation.value,
		}
		if (validatePassword(formData.password, formData.passwordConfirmation)) {
			sendNewPass(formData)
			router.push('/')
		} else {
			setInvalid(
				'Invalid Password, password must be at least 8 characters long, with at least one digit and one letter'
			)
		}
	}
	return (
		<Wrapper header={'Change Password'}>
			<ChangePassForm
				isChange={false}
				handleSubmit={handleSubmit}
				error={error}
				success={success}
				invalid={invalid}
			/>
		</Wrapper>
	)
}
