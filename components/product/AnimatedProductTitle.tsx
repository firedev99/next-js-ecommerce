import { motion, Variants } from 'framer-motion'
import { ReactElement } from 'react'
import { AnimatedTitleWrapper } from './styles'

interface Props {
    text: string
    className?: string
}

const containerVariants: Variants = {
    animate: {
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.1,
        },
    },
}

const alphaVariants: Variants = {
    initial: { y: 300 },
    animate: {
        y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 0.5,
        },
    },
}

function AnimatedProductTitle({
    text: textTitle,
    className,
}: Props): ReactElement {
    const singleTexts: string[] = textTitle.split('')

    return (
        <AnimatedTitleWrapper
            className={className}
            variants={containerVariants}
            initial='initial'
            animate='animate'
        >
            {singleTexts.map((alphabet, idx) => (
                <motion.h1
                    variants={alphaVariants}
                    style={{
                        flexBasis: alphabet === ' ' ? '100%' : 0,
                    }}
                    key={`alphabet_${idx}`}
                >
                    {alphabet}
                </motion.h1>
            ))}
        </AnimatedTitleWrapper>
    )
}

AnimatedProductTitle.defaultProps = {
    text: 'AGUN BHAI',
}

export default AnimatedProductTitle
