import { useState } from 'react'
import Wrapper from '../components/UI/Wrapper'
import ChangePassForm from '@/components/ChangePassForm'
import useUpdateUser from '@/hooks/useUpdateUser'

export default function AccountSettings() {
	const { update, load, err, suc } = useUpdateUser()
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
			password: event.target.password.value,
			passwordConfirmation: event.target.passwordConfirmation.value,
		}
		if (validatePassword(formData.password, formData.passwordConfirmation)) {
			update(formData)
		} else {
			setInvalid(
				'Invalid Password, password must be at least 8 characters long, with at least one digit and one letter'
			)
		}
	}
	return (
		<Wrapper header={'Change Password'}>
			<ChangePassForm
				isChange={true}
				handleSubmit={handleSubmit}
				error={err}
				success={suc}
				invalid={invalid}
			/>
		</Wrapper>
	)
}
