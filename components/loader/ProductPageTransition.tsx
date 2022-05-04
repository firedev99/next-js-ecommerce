import { Dispatch, ReactElement, SetStateAction, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { ProductAssetProps } from '../../typings/interfaces/mains'
import data from '../../dummy/dummyImage'
import {
    ProductPageTransitionWrapper,
    TextOverflowAnimation,
} from './styles/ProductTransitionStyles'
import { containerVariants, itemVariants, mainItemVariants } from './variants'
import { easeInOut } from 'popmotion'

const textContainerVariants = {
    initial: {
        y: 0,
        opacity: 0,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1.2,
        },
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: {
            ease: 'easeOut',
            // ease: [0.6, 0.01, -0.05, 0.95],
            duration: 0.2,
        },
    },
}

const textVariants: Variants = {
    initial: {
        y: '-100%',
        opacity: 1,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 2.5,
            ease: [0.87, 0, 0.13, 1],
            delay: 1.3,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            // ease: 'easeOut',
            ease: 'easeOut',
            duration: 0.2,
        },
    },
}

interface Props {
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function ProductPageTransition({
    loading,
    setLoading,
}: Props): ReactElement {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <AnimatePresence
            onExitComplete={() => {
                document.body.style.overflow = 'auto'
            }}
        >
            {loading && (
                <ProductPageTransitionWrapper
                    variants={containerVariants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                >
                    <motion.svg variants={textContainerVariants}>
                        <pattern
                            id='pattern'
                            patternUnits='userSpaceOnUse'
                            width={750}
                            height={800}
                        >
                            <rect />
                            <motion.rect
                                variants={textVariants}
                                className='_fancy'
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                onAnimationComplete={() => {
                                    setLoading(false)
                                }}
                            />
                        </pattern>
                        <text
                            textAnchor='middle'
                            x='50%'
                            y='90%'
                            style={{ fill: 'url(#pattern)' }}
                        >
                            Rainbow
                        </text>
                    </motion.svg>
                </ProductPageTransitionWrapper>
            )}
        </AnimatePresence>
    )
}
