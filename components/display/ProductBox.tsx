import { MouseEvent } from "react"
import Logo from "../../app/services/logo"
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux"
import { deleteProduct } from "../../app/redux/slices/adminProductSlice"
import { setNotification } from "../../app/redux/slices/notificationSlice"
import { uniqueID } from "../../lib/generateUniqueID"
import { useRouter } from "next/router"
import { Image } from ".."
import { ProductWrapper } from "./styles/ProductBoxStyles"

type Props = {
  name: string
  id: string
  imageSrc: string
  quantity: number
}

function ProductBox({ name, id, imageSrc, quantity }: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { error } = useAppSelector((state) => state.admin_product)

  async function handleProductDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    try {
      const res = await dispatch(deleteProduct(id)).unwrap()

      if (!res.success) {
        throw new Error("something went wrong!")
      }

      dispatch(
        setNotification({
          id: uniqueID(),
          message: "product was deleted!",
        })
      )

      setTimeout(() => router.reload(), 4000)
    } catch (error) {
      dispatch(
        setNotification({
          id: uniqueID(),
          message: "product was deleted!",
        })
      )
    }
  }

  return (
    <ProductWrapper>
      <div className="image">
        <Image layout="fill" alt={`product_${id}`} imageSrc={imageSrc} />
      </div>
      <div className="meta">
        <h3>{name}</h3>
        <span>{quantity}pc left.</span>
        <div className="product_box_controls">
          <button>
            <Logo name="edit" />
          </button>

          <button onClick={handleProductDelete}>
            <Logo name="trash" />
          </button>
        </div>
      </div>
    </ProductWrapper>
  )
}

ProductBox.defaultProps = {
  name: "@firedev99",
  id: "ravel",
}

export default ProductBox
