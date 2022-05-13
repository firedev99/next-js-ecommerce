import { motion, PanInfo, useAnimation } from "framer-motion"
import { ReactElement, Dispatch, SetStateAction, useRef } from "react"
import { ProductProps } from "../../typings/interfaces/mains"
import { Image, NumberCounter } from ".."
import Logo from "../../app/services/logo"
import { useAppDispatch } from "../../app/hooks/redux"
import {
  addQuantity,
  removeQuantity,
  setConfirmationID,
} from "../../app/redux/slices/featureSlice"

type Props = {
  product: ProductProps & {
    quantity: number
    chosenSize: string
    chosenColor?: string
  }
  setConfirmationModal: Dispatch<SetStateAction<boolean>>
}

export default function CartProduct({
  product,
  setConfirmationModal,
}: Props): ReactElement {
  const dispatch = useAppDispatch()
  const controls = useAnimation()
  const itemRef = useRef<HTMLLIElement>(null)

  function handleDrag() {
    if (!itemRef.current) return
    itemRef.current.style.touchAction = "none"
  }

  async function handleDragEnd(_: any, info: PanInfo) {
    if (!itemRef.current) return
    const offset = info.offset.x

    if (offset < -150) {
      controls.start({ x: 0, transition: { duration: 0.4 } })
      if (product.quantity === 1) {
        setConfirmationModal(true)
        dispatch(setConfirmationID(product._id))
      } else {
        dispatch(removeQuantity(product._id))
      }
    } else {
      controls.start({ x: 0, transition: { duration: 0.4 } })
      dispatch(addQuantity(product._id))
    }

    itemRef.current.style.touchAction = "pan-x"
  }

  function handleProductRemove() {
    setConfirmationModal(true)
    dispatch(setConfirmationID(product._id))
  }

  return (
    <motion.li
      ref={itemRef}
      drag="x"
      dragDirectionLock
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      animate={controls}
      dragConstraints={{ left: 0, right: 50 }}
    >
      <div className="product_details">
        <div className="product_img">
          <Image
            layout="fill"
            alt={`product_${product._id}`}
            imageSrc={product.imageSrc}
          />
        </div>
        <div className="product_meta">
          <h4>{product.name}</h4>
          <span className="product_vendorname">{product.vendorName}</span>
          <span className="product_price">${product.price}</span>
          <div className="selection_controls">
            <span>
              Selected Color:{" "}
              {typeof product.chosenColor !== "undefined"
                ? `type-${
                    (product.colors
                      ?.map((item) => item.colorName)
                      .indexOf(product.chosenColor) as number) + 1
                  }`
                : "fixed"}
            </span>
            <button>
              <Logo name="edit" />
            </button>
          </div>
          <div className="selection_controls">
            <span>Selected Size: {product.chosenSize}</span>
            <button>
              <Logo name="edit" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3>
          $ {product.price} x {product.quantity}
        </h3>
      </div>
      <div className="product_controls">
        <button
          onClick={() =>
            product.quantity === 1
              ? handleProductRemove()
              : dispatch(removeQuantity(product._id))
          }
        >
          -
        </button>
        <NumberCounter
          value={product.quantity}
          className={
            product.quantity < 10
              ? "cart_quantity_counter"
              : "cart_quantity_counter_double"
          }
          numberClassName="counter_number"
        />
        <button
          disabled={product.countInStock === product.quantity}
          onClick={() => dispatch(addQuantity(product._id))}
        >
          +
        </button>
      </div>
      <div>
        <button className="delete_product" onClick={handleProductRemove}>
          <Logo name="trash" />
        </button>
      </div>
    </motion.li>
  )
}
