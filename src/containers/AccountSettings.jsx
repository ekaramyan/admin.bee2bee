import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Wrapper from '../components/UI/Wrapper'
import { useMediaQuery } from '@mui/material'
const EditAccount = dynamic(() => import('@/components/EditAccount'))

export default function AccountSettings({ data }) {
	const router = useRouter()
	const onChangeClick = () => {
		router.push('/auth/change-password')
	}
	const onResetClick = () => {
		router.push('/auth/reset')
	}
	const isMobile = useMediaQuery('@media(max-width: 1300px)')

	return (
		<Wrapper
			header={'Account Settings'}
			style={{ minHeight: 750, maxHeight: isMobile ? '100%' : '85dvh' }}
		>
			<EditAccount
				onChangeClick={onChangeClick}
				onResetClick={onResetClick}
				data={data.data}
			/>
		</Wrapper>
	)
}
