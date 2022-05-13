import { MouseEvent, ReactElement, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux"
import { DogLottie, SimpleModal } from ".."
import {
  AnimatePresence,
  motion,
  Variants,
  PanInfo,
  useAnimation,
} from "framer-motion"
import Logo from "../../app/services/logo"
import {
  closeCartModal,
  removeFromCart,
} from "../../app/redux/slices/featureSlice"
import random from "../../lib/random"
import { CartWrapper } from "./styles/CartStyles"
import CartProduct from "./CartProduct"

export const cartModalVariants: Variants = {
  initial: {
    x: "100%",
    backdropFilter: "blur(0px)",
  },
  animate: {
    x: 0,
    backdropFilter: "blur(8px)",
    transition: {
      easings: [0.56, -0.05, 0.01, 0.88],
      duration: 0.3,
      backdropFilter: {
        delay: 0.3,
        duration: 0.2,
      },
    },
  },
  exit: {
    x: "100%",
    backdropFilter: "blur(0px)",
    transition: {
      x: {
        duration: 0.3,
        easings: [0.56, -0.05, 0.01, 0.88],
      },
      backdropFilter: {
        duration: 0.1,
      },
    },
  },
}

export const shortGreetings = [
  "We are delighted to have you among us, $$$.",
  "Welcome to the team, $$$! We are thrilled to have you at our store.",
  "The entire team of Rainbow Co. is thrilled to welcome you on board, $$$.",
  "Welcome aboard, $$$. Thanks for choosing to be part of Rainbow!",
] as string[]

export default function Cart(): ReactElement {
  const { cartModal, cart } = useAppSelector((state) => state.features)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const dragControls = useAnimation()

  const [openCart, setOpenCart] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [greeting, setGreeting] = useState("Welcome Boss!")

  function closeModal() {
    return (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      dispatch(closeCartModal())
    }
  }

  const name = user ? user.firstName : "G"
  const greetings = shortGreetings.map((item) => item.split("$$$").join(name))

  function handleDeleteProduct() {
    dispatch(removeFromCart())
    setConfirmationModal(false)
  }

  async function handleDragEnd(_: any, info: PanInfo) {
    const offset = info.offset.x

    if (offset > 150) {
      dispatch(closeCartModal())
    } else {
      dragControls.start({
        x: 0,
        transition: {
          easings: [0.56, -0.05, 0.01, 0.88],
          duration: 0.3,
        },
      })
    }
  }

  // delay 0.5s for animation smoothness
  useEffect(() => {
    let timerID: NodeJS.Timeout
    if (cartModal) {
      timerID = setTimeout(() => {
        setOpenCart(true)
      }, 500)
    } else {
      setOpenCart(false)
    }

    return () => clearTimeout(timerID)
  }, [cartModal])

  // hide scrollpad and set a random greet
  useEffect(() => {
    if (openCart) {
      ;(document.body || document.documentElement).style.overflow = "hidden"

      setGreeting(random.generateRandomArray(greetings))
    }

    return () => {
      ;(document.body || document.documentElement).style.overflow = "auto"
    }
    // eslint-disable-next-line
  }, [openCart])

  return (
    <AnimatePresence>
      {openCart && (
        <CartWrapper
          variants={cartModalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {confirmationModal && (
            <SimpleModal
              open={confirmationModal}
              setOpen={setConfirmationModal}
              className="confirmation_modal"
            >
              <h3>
                Are you sure, you want to remove this product from the cart?
              </h3>
              <div className="control_btns">
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  className="remove_btn"
                  onClick={handleDeleteProduct}
                >
                  Remove
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  className="cancel_btn"
                  onClick={() => setConfirmationModal(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </SimpleModal>
          )}

          <motion.ul
            drag="x"
            dragDirectionLock
            onDragEnd={handleDragEnd}
            animate={dragControls}
            dragConstraints={{ left: 0, right: 300 }}
          >
            <button className="close_modal" onClick={closeModal()}>
              <Logo name="return-arrow" />
            </button>
            <h3>{greeting}</h3>
            {cart.length ? (
              cart.map((product) => (
                <CartProduct
                  key={`cart_i_@${product._id}`}
                  product={product}
                  setConfirmationModal={setConfirmationModal}
                />
              ))
            ) : (
              <div className="empty_cart">
                <h2>Nothing Added Yet</h2>
                <DogLottie />
              </div>
            )}
          </motion.ul>
        </CartWrapper>
      )}
    </AnimatePresence>
  )
}
