import { AnimatePresence, Variants } from "framer-motion"
import { ReactElement, MouseEvent } from "react"
import { NumberCounter } from ".."
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux"
import {
  closeNavigator,
  openCartModal,
} from "../../app/redux/slices/featureSlice"
import Logo from "../../app/services/logo"
import {
  CartIndicatorInner,
  CartIndicatorWrapper,
} from "./styles/CartIndicatorStyles"

const popupVariants: Variants = {
  initial: {
    opacity: 0,
    y: 300,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 300,
    transition: {
      duration: 0.3,
    },
  },
}

export default function CartIndicator(): ReactElement {
  const { cart, cartNavigator } = useAppSelector((state) => state.features)
  const dispatch = useAppDispatch()

  function popDownCart() {
    return (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      dispatch(closeNavigator())
    }
  }

  return (
    <AnimatePresence>
      {cartNavigator && cart.length && (
        <CartIndicatorWrapper>
          <button className="popdown_button" onClick={popDownCart()}>
            <Logo name="cross" />
          </button>
          <CartIndicatorInner
            variants={popupVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => dispatch(openCartModal())}
          >
            <div className="cart_logo">
              <Logo name="cart" />
            </div>
            <NumberCounter
              className={
                cart.length < 10 ? "cart_counter" : "cart_counter_double"
              }
              value={cart.length}
            />
          </CartIndicatorInner>
        </CartIndicatorWrapper>
      )}
    </AnimatePresence>
  )
}
