import { Variants } from 'framer-motion'

export const mImgsContainerVariants: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export const mItemVariants: Variants = {
    initial: { opacity: 0, y: 300, x: 300 },
    animate: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 2,
        },
    },
}

export const mItemReverseVariants: Variants = {
    initial: { opacity: 0, y: -300, x: -300 },
    animate: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 2,
        },
    },
}

export const overflowItemVariants: Variants = {
    initial: { y: 300, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.2,
            delay: 0.2,
            ease: [0.6, 0.01, -0.05, 0.95],
        },
    },
}

export const categoryImgConVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

export const categoryImgItemVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}
