import Head from 'next/head'

type Props = {}

export default function index({}: Props) {
	return (
		<Head>
			<title>Rainbow E-Shop</title>
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta
				name='description'
				content='Rainbow E-Shop is basically a demo project of @firedev99, it is implemented with TypeScript and React!'
			/>
			<meta
				property='og:title'
				content='Shop with ease, choose the latest trends for our shop!'
			/>
			<meta
				property='og:description'
				content='Rainbow E-Shop is basically a demo project of @firedev99, it is implemented with TypeScript and React!'
			/>
			<meta property='og:url' content='https://rainbowclothings.com/' />
			<meta property='og:type' content='website' />
			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content='https://rainbowclothings.com/' />
			<meta
				property='twitter:title'
				content='Shop with ease, choose the latest trends for our shop!'
			/>
			<meta
				property='twitter:description'
				content='Rainbow E-Shop is basically a demo project of @firedev99, it is implemented with TypeScript and React!'
			/>
			<link rel='icon' href='/favicon.ico' />
		</Head>
	)
}
