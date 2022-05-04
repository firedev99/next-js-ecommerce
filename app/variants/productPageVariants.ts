import { Variants } from 'framer-motion'

export const mediaItemVariant: Variants = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export const hideVariants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			delay: 1.3,
			ease: [0.6, 0.01, -0.05, 0.95],
		},
	},
}
