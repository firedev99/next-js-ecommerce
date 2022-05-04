import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import RippleEffect from '../../app/ui/rippleEffect'

const ButtonWrapper = styled(motion.div)`
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background-color: rgba(187, 187, 187, 1);
    display: grid;
    place-items: center;
`
const ButtonInner = styled.div`
    width: inherit;
    height: inherit;
    display: grid;
    place-items: center;
    svg {
        fill: rgba(0, 0, 0, 1);
        width: 36px;
        height: auto;
    }
`

interface Props {
    children: ReactNode
}

export default function AuthButton({ children }: Props) {
    return (
        <ButtonWrapper whileTap={{ scale: 0.97 }}>
            <RippleEffect
                style={{ width: 60, height: 60, borderRadius: '50%' }}
            >
                <ButtonInner>{children}</ButtonInner>
            </RippleEffect>
        </ButtonWrapper>
    )
}
