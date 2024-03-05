import '../styles/reset.css'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import Head from 'next/head'
import theme from '../Theme'
import IndexWrapper from '@/components/UI/index_wrapper'
import store from '@/store'
import favicon from '@/assets/img/favicon.webp'

function MyApp({ Component, pageProps }) {
	const captchaKey = process.env.CAPTCHA_KEY
	return (
		<>
			<Head>
				<title>Bee2Bee</title>
				<link rel='icon' href={favicon.src} />
				<script
					src='https://www.google.com/recaptcha/api.js'
					data-sitekey={captchaKey}
					async
					defer
				></script>
				<meta
					name='description'
					content='Bee2Bee: Opportunities for everyone. Connect, collaborate, and grow together in the business world.'
				/>
				<meta
					name='keywords'
					content='business, collaboration, networking, growth, opportunities, partners, bee2bee'
				/>

				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta charSet='utf-8' />

				<meta property='og:title' content='Bee2Bee' />
				<meta
					property='og:description'
					content='Opportunities for everyone. Connect, collaborate, and grow together in the business world.'
				/>
				<meta property='og:image' content='/path_to_your_og_image.jpg' />
				<meta property='og:url' content='https://bee2bee.online' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content='Bee2Bee' />
				<meta
					name='twitter:description'
					content='Opportunities for everyone. Connect, collaborate, and grow together in the business world.'
				/>
				<meta name='twitter:image' content='/path_to_your_twitter_image.jpg' />
			</Head>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<IndexWrapper>
						<Component {...pageProps} />
					</IndexWrapper>
				</Provider>
			</ThemeProvider>
		</>
	)
}

export default MyApp
