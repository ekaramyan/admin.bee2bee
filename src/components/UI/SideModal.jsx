import register from '../../assets/img/auth_bg.svg'
import login from '../../assets/img/login_bg.svg'

export default function SideModal({ children, ...props }) {
	return (
		<div
			style={{
				position: 'absolute',
				zIndex: 10,
				top: 0,
				left: props.isRight
					? props.isRegisterOpen
						? 0
						: '-40%'
					: props.isLoginOpen
					? '55%'
					: '95%',
				width: '45%',
				height: '100%',
				background: props.isRight
					? `url(${register.src}) no-repeat center / cover`
					: `url(${login.src}) no-repeat center / cover`,

				transition: 'all 0.3s ease-in-out',
			}}
			{...props}
		>
			{children}
		</div>
	)
}
