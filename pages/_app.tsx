import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../app/redux/store'
import { AnimatePresence } from 'framer-motion'
import { ComponentType } from 'react'
import { GlobalStyle } from '../styles/pages/globalStyles'

type PageLayout = AppProps & {
	Component: AppProps['Component'] & {
		Layout?: ComponentType
	}
}

function MyApp({ Component, pageProps, router }: PageLayout) {
	return (
		<>
			<GlobalStyle />
			<Provider store={store}>
				{Component.Layout ? (
					<Component.Layout>
						<AnimatePresence exitBeforeEnter>
							<Component {...pageProps} key={router.route} />
						</AnimatePresence>
					</Component.Layout>
				) : (
					<Component {...pageProps} key={router.route} />
				)}
			</Provider>
		</>
	)
}

export default MyApp
