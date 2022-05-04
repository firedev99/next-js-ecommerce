import { MouseEvent } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import Logo from "../../app/services/logo"
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux"
import { deleteProduct } from "../../app/redux/slices/adminProductSlice"
import { setNotification } from "../../app/redux/slices/notificationSlice"
import { uniqueID } from "../../lib/generateUniqueID"
import { useRouter } from "next/router"
import { Image } from ".."

export const ProductWrapper = styled(motion.div)`
  position: relative;
  height: 100%;
  min-height: 256px;
  min-width: 200px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .image {
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;
    position: relative !important;

    img {
      border-radius: 0.4rem !important;
      filter: brightness(0.3) !important;
    }
  }

  .meta {
    position: absolute;
    padding: 1rem;

    h3 {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      line-height: 1.4rem;
    }

    span {
      font-size: 0.95rem;
      font-weight: 500;
    }
  }

  .product_box_controls {
    opacity: 0;
    display: flex;
    position: absolute;
    margin-top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);

    button {
      border: none;
      background: transparent;
      width: 3.1rem;
      height: 3.1rem;
      margin-bottom: 0.4rem;
      margin-right: 0.3rem;
      transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
      border-radius: 50%;

      svg {
        width: 1.7rem;
        height: 1.7rem;
        color: rgba(170, 170, 170, 1);
      }

      :hover {
        background: rgba(255, 255, 255, 0.14);
        cursor: pointer;
      }
    }
  }

  :hover {
    cursor: pointer;
    .product_box_controls {
      opacity: 1;
    }
  }
`

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
      dispatch(deleteProduct(id)).unwrap()
      setTimeout(() => {
        router.reload()
      }, 4000)
    } catch (error) {
      console.log("something went wrong!")
      console.log(error)
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
