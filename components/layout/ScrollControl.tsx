import { AnimatePresence, motion } from 'framer-motion'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { useScrollTT } from '../../app/hooks/useScrollTT'
import Logo from '../../app/services/logo'

export const ScrollControlButton = styled.div`
    position: fixed;
    z-index: 50;
    left: 1.5rem;
    bottom: 1.5rem;
    width: 100px;
    height: 90px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;

    button {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background-color: rgba(223, 230, 233, 1);
        margin-bottom: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: none;
        box-shadow: -1px 1px 4px 3px rgba(0, 0, 0, 0.1);

        svg {
            margin-bottom: 0.25rem;
            transform: rotate(270deg);
            width: 28px;
            height: 28px;
        }

        :hover {
            cursor: pointer;
        }
    }
`

export default function ScrollControl(): ReactElement {
    const { showButton, setScrollUp } = useScrollTT(80)

    return (
        <AnimatePresence>
            {showButton && (
                <ScrollControlButton>
                    <motion.button
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        exit={{ y: 200 }}
                        transition={{
                            duration: 0.3,
                            easings: [0.56, -0.05, 0.01, 0.88],
                        }}
                        onClick={() => setScrollUp(true)}
                    >
                        <Logo name='right-arrow' />
                    </motion.button>
                </ScrollControlButton>
            )}
        </AnimatePresence>
    )
}
