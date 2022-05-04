import { ReactNode, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
// styles
import { MenuButton } from '../menu/styles'
import { MainLayoutContent } from './styles'
import { CartIndicator, Cart } from '..'
import CartButton from './CartButton'
import ScrollControl from './ScrollControl'

const Menu = dynamic(() => import('../navbar/NavMenu'), { ssr: false })

export default function Layout({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false)
	const [tempDisable, setTempDisable] = useState(false)

	// prevent transition while already on a process
	// disable menu button for 2 seconds
	useEffect(() => {
		let timerID: NodeJS.Timeout
		if (tempDisable) timerID = setTimeout(() => setTempDisable(false), 2000)

		return () => {
			clearTimeout(timerID)
		}
	}, [tempDisable])

	return (
		<>
			<CartButton />
			<MenuButton
				disabled={tempDisable}
				open={open}
				onClick={() => {
					setOpen((prev) => !prev)
					setTempDisable(true)
				}}
			>
				<div className='lines'>
					<span />
					<span />
					<span />
				</div>
			</MenuButton>
			<Menu open={open} />
			<ScrollControl />
			<CartIndicator />
			<Cart />
			<main>
				<MainLayoutContent>{children}</MainLayoutContent>
			</main>
		</>
	)
}
