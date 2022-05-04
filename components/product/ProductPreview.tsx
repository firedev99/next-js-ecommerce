import { ReactElement, useState } from "react"
import Link from "next/link"
import {
  ProductPreviewContainer,
  ProductPreviewWrapper,
} from "./styles/ProductStyles"
import { Ratings, Image } from ".."
import { motion, Variants } from "framer-motion"

export const fadeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: [0.6, -0.05, 0.01, 0.9],
    },
  },
}

interface Props {
  id: string
  name: string
  imageSrc: string
  hoveringImage: string
  price: number
  rating: number
  vendor: string
}

function ProductPreview({
  name,
  imageSrc,
  hoveringImage,
  id,
  price,
  rating,
  vendor,
}: Props): ReactElement {
  const [hover, setHover] = useState(false)

  return (
    <Link
      href={{
        pathname: "/products/item",
        query: { id },
      }}
      passHref
    >
      <ProductPreviewWrapper
        onHoverStart={() => {
          setHover(true)
        }}
        onHoverEnd={() => {
          setHover(false)
        }}
      >
        <ProductPreviewContainer>
          <motion.div
            className="product_image_inner"
            variants={fadeVariants}
            animate={hover ? "initial" : "animate"}
          >
            <Image
              className="image"
              imageSrc={imageSrc}
              alt={`unsplash-model-${imageSrc}`}
            />
          </motion.div>
          <motion.div
            className="product_image_inner"
            variants={fadeVariants}
            animate={hover ? "animate" : "initial"}
          >
            <Image
              className="image"
              imageSrc={hoveringImage}
              alt={`unsplash-model-${imageSrc}`}
            />
          </motion.div>

          <div className="product_meta">
            <h3>{name}</h3>
            <span className="vendor_name">by {vendor}</span>
            <span>US ${price}</span>
            <div className="controls">
              <Ratings
                className="product_ratings"
                selectDisabled
                value={rating}
              />
            </div>
          </div>
        </ProductPreviewContainer>
      </ProductPreviewWrapper>
    </Link>
  )
}

ProductPreview.defaultProps = {
  name: "firedev99",
}

export default ProductPreview
