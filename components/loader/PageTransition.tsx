import { ReactElement, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
    width: 100%;
    background-color: white;
    position: absolute;
    z-index: 20;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    svg {
        position: absolute;
        z-index: 50;
        width: 100%;
        height: 15vh;
        pattern {
            color: rgba(0, 0, 0, 0.4);
            ._fancy {
                color: black;
            }

            rect {
                height: 15vh;
                width: 100%;
                fill: currentColor;
            }
        }
        text {
            font-size: 9vw;

            @media (max-width: 768px) {
                font-size: 72px;
            }
            @media (max-width: 486px) {
                font-size: 54px;
            }
            @media (max-width: 342px) {
                font-size: 42px;
            }
        }
    }
`

const containerVariants = {
    initial: {
        height: '100vh',
        bottom: 0,
    },
    animate: {
        height: 0,
        // overflow: 'hidden',
        transition: {
            when: 'afterChildren',
            duration: 1.5,
            ease: [0.87, 0.13, 0.09, 1],
        },
    },
}

const textContainerVariants = {
    initial: {
        opacity: 1,
    },
    animate: {
        opacity: 0,
        transition: {
            duration: 0.25,
            when: 'afterChildren',
        },
    },
}

const textVariants = {
    initial: {
        y: '-100%',
    },
    animate: {
        y: 0,
        transition: {
            duration: 2,
            ease: [0.87, 0, 0.13, 1],
        },
    },
}

export default function PageTransition(): ReactElement {
    const [initialTransition, setInitialTransition] = useState(true)

    useEffect(() => {
        const timerID = setTimeout(() => {
            setInitialTransition(false)
        }, 3600)

        return () => {
            clearTimeout(timerID)
        }
    }, [])

    return (
        <>
            {initialTransition ? (
                <Wrapper
                    variants={containerVariants}
                    initial='initial'
                    animate='animate'
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
                </Wrapper>
            ) : null}
        </>
    )
}
