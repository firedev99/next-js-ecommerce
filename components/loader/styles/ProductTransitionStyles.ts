import { motion, Variants } from 'framer-motion'
import styled from 'styled-components'

export const ProductPageTransitionWrapper = styled(motion.div)`
    position: fixed;
    z-index: 300;
    background: white;
    /* max-width: 1536px; */
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

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
export const TransitionPageWrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    overflow: hidden;
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

export const TextOverflowAnimation = styled(motion.div)`
    display: flex;
    height: 60px;
    overflow: hidden;
`
