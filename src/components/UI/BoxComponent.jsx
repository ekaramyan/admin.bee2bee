import { Typography, Box as MuiBox } from '@mui/material'
import { styled, keyframes } from '@mui/system'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import AuthButton from './AuthButton'

const Container = styled('div')({
	background: `linear-gradient(rgba(165, 86, 15, 0.2), rgba(203, 105, 18, 0.2))`,
	borderRadius: 20,
	backdropFilter: 'blur(10px)',
	border: '1px solid rgba(255, 255, 255, 0.2)',
	position: 'absolute',
	zIndex: 10,
	padding: '2rem 0',
	textAlign: 'center',

	width: '100%',
	height: '100%',
})

const BoxWrapper = styled('div')({
	position: 'relative',
	'&::before': {
		content: '""',
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: -1,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
})

const BoxBody = styled('div')(({ isOpen }) => ({
	position: 'relative',
	height: '200px',
	width: '200px',
	marginTop: '123.3333333333px',
	backgroundColor: '#cc231e',
	borderBottomLeftRadius: '5%',
	borderBottomRightRadius: '5%',
	boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.3)',
	background: 'linear-gradient(#762c2c, #ff0303)',
	textAlign: 'center',
	'& .img': {
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? 'translateY(-157px)' : 'translateY(0%)',
		transition: 'all 0.5s',
		margin: '0 auto',
		display: 'block',
		textAlign: 'center',
	},
	animation: isOpen ? `${boxBodyKeyframes} 1s forwards ease-in-out` : 'none',
	'@media(max-width: 1300px)': {
		height: 150,
		width: 150,
	},
}))

const boxLidKeyframes = keyframes`
  0%, 42% {
    transform: translate3d(-50%, 0%, 0) rotate(0deg);
  }
  60% {
    transform: translate3d(-85%, -230%, 0) rotate(-25deg);
  }
  90%, 100% {
    transform: translate3d(-119%, 225%, 0) rotate(-70deg);
  }
`

const boxBodyKeyframes = keyframes`
  0% {
    transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
  25% {
    transform: translate3d(0%, 25%, 0) rotate(20deg);
  }
  50% {
    transform: translate3d(0%, -15%, 0) rotate(0deg);
  }
  70% {
    transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
`

const boxBowtieRightKeyframes = keyframes`
  0%, 50%, 75% {
    transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
  }
  90%, 100% {
    transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
    boxShadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.3);
  }
`

const boxBowtieLeftKeyframes = keyframes`
  0% {
    transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
  50%, 75% {
    transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
  }
  90%, 100% {
    transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
`
const BoxLid = styled('div')(({ isOpen }) => ({
	position: 'absolute',
	zIndex: 1,
	left: '50%',
	transform: 'translateX(-50%)',
	bottom: '90%',
	height: '40px',
	backgroundColor: '#cc231e',
	width: '220px',
	borderRadius: '5%',
	boxShadow: '0 8px 4px -4px rgba(0, 0, 0, 0.3)',
	animation: isOpen ? `${boxLidKeyframes} 1s forwards ease-in-out` : 'none',
	'&::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: '50%',
		transform: 'translateX(-50%)',
		width: '50px',
		background: 'linear-gradient(#ffefa0, #fff)',
	},
	'@media(max-width: 1300px)': {
		width: 170,
	},
}))

const BoxBowtie = styled('div')(({ isOpen }) => ({
	zIndex: 1,
	height: '100%',
	'&::before, &::after': {
		content: '""',
		width: '83.3333333333px',
		height: '83.3333333333px',
		border: '16.6666666667px solid white',
		borderRadius: '50% 50% 0 50%',
		position: 'absolute',
		bottom: '99%',
		zIndex: -1,
		animation: isOpen
			? `${boxBowtieLeftKeyframes} 1.1s forwards ease-in-out`
			: 'none',
	},
	'&::before': {
		left: '50%',
		transform: 'translateX(-100%) skew(10deg, 10deg)',
	},
	'&::after': {
		left: '50%',
		transform: 'translateX(0%) rotate(90deg) skew(10deg, 10deg)',
		animation: isOpen
			? `${boxBowtieRightKeyframes} 1.1s forwards ease-in-out`
			: 'none',
	},
}))

function BoxComponent({ onClose }) {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsOpen(true)
		}, 2000)

		return () => clearTimeout(timer)
	}, [])

	const [windowSize, setWindowSize] = useState({
		width: 1920,
		height: 1920,
	})

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<Container>
			<Confetti width={windowSize.width} height={windowSize.height} />
			<MuiBox
				display='flex'
				justifyContent='center'
				alignItems='center'
				flexDirection='column'
				height='100%'
				gap={5}
			>
				<BoxWrapper>
					<BoxBody isOpen={isOpen}>
						<Typography
							variant='closed_congrats'
							width={150}
							height={150}
							className='img'
							component={'p'}
						>
							Congrats! Cell is Closed
						</Typography>
						<BoxLid isOpen={isOpen}>
							<BoxBowtie isOpen={isOpen} />
						</BoxLid>
					</BoxBody>
				</BoxWrapper>
				<AuthButton
					onClick={onClose}
					style={{ padding: '1% 3%', borderRadius: 15 }}
				>
					Close
				</AuthButton>
			</MuiBox>
		</Container>
	)
}

export default BoxComponent
