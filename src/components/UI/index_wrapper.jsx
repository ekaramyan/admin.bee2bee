import { Container, useMediaQuery, Box, styled } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AuthButton from './AuthButton'
const Login = dynamic(() => import('../Login'))
const Register = dynamic(() => import('../Register'))
const MyCells = dynamic(() => import('../../components/MyCells'))
const RealCells = dynamic(() => import('../../components/RealCells'))
const SideModal = dynamic(() => import('./SideModal'))
import background from '../../assets/img/background.webp'

const IndexWrapper = ({ children, ...props }) => {
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	const [isRegisterOpen, setIsRegisterOpen] = useState(false)
	const router = useRouter()
	const loggedIn = useSelector(state => state.user.loggedIn)
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	const isLow = useMediaQuery('@media(min-height: 880px)')

	const toggleLogin = () => {
		setIsLoginOpen(!isLoginOpen)
	}
	const toggleRegister = () => {
		setIsRegisterOpen(!isRegisterOpen)
	}

	return (
		<>
			<div
				style={{
					overflow: 'hidden auto',
					position: 'relative',
					background: `url(${background.src}) no-repeat center / cover`,
					height: '100%',
					minHeight: isLow ? 880 : '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				className='ScrollbarWhite'
			>
				<Container
					className='ScrollbarDefault'
					style={{
						overflow: 'hidden',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 20,
						height: '100%',
						minHeight: '100svh',
						width: '100%',
						justifyContent: 'space-between',
						zIndex: 1,
					}}
					{...props}
				>
					<Header loggedIn={loggedIn} />

					{!loggedIn && (
						<Box
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 15,
								width: '100%',
							}}
						>
							<AuthButton
								onClick={() => router.push('/login')}
								style={{ background: '#A5560F', width: '50%' }}
							>
								Log in
							</AuthButton>
						</Box>
					)}
					{children}
					<Footer />
				</Container>
				{!isMobile && (
					<>
						{loggedIn && (
							<>
								<div
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor:
											isLoginOpen || isRegisterOpen
												? 'rgba(0, 0, 0, 0.2)'
												: 'transparent',
										transition: 'all .3s',
										pointerEvents:
											isLoginOpen || isRegisterOpen ? 'auto' : 'none',
										zIndex: 9,
									}}
									onClick={() => {
										setIsLoginOpen(false)
										setIsRegisterOpen(false)
									}}
								></div>
								<SideModal
									isLoginOpen={isLoginOpen}
									isRegisterOpen={isRegisterOpen}
									isRight={false}
								>
									<MyCells toggleOpen={toggleLogin} isLoginOpen={isLoginOpen} />
								</SideModal>
								<SideModal
									isLoginOpen={isLoginOpen}
									isRegisterOpen={isRegisterOpen}
									isRight={true}
								>
									<RealCells
										toggleOpen={toggleRegister}
										isRegisterOpen={isRegisterOpen}
									/>
								</SideModal>
							</>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default IndexWrapper
