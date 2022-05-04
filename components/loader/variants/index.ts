import { Variants } from 'framer-motion'

export const containerVariants: Variants = {
    initial: {
        x: '-100%',
    },
    animate: {
        x: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1.2,
        },
    },
    exit: {
        x: '100%',
        transition: {
            delay: 0.4,
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 0.9,
        },
    },
}

export const itemVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 1,
        y: 200,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1.6,
        },
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: {
            ease: 'easeInOut',
            duration: 0.8,
        },
    },
}

export const mainItemVariants: Variants = {
    initial: {
        opacity: 0,
        y: 200,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1.6,
        },
    },
}
