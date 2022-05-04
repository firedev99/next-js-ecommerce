import { AnimatePresence, motion } from 'framer-motion'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import { openCartModal } from '../../app/redux/slices/featureSlice'
import Logo from '../../app/services/logo'

export const CartButtonWrapper = styled(motion.button)`
    position: absolute;
    left: 1.15rem;
    top: 1.4rem;

    border: none;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);

    svg {
        width: 32px;
        height: 32px;
        stroke-width: 2px;
    }

    :hover {
        cursor: pointer;
    }
`

export default function CartButton(): ReactElement {
    const { cartNavigator, cartModal, cart } = useAppSelector(
        (state) => state.features
    )
    const dispatch = useAppDispatch()

    return (
        <AnimatePresence exitBeforeEnter>
            {!cartNavigator && cart.length && !cartModal && (
                <CartButtonWrapper
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => dispatch(openCartModal())}
                >
                    <Logo name='cart' />
                </CartButtonWrapper>
            )}
        </AnimatePresence>
    )
}
