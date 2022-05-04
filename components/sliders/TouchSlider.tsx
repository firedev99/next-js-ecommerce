import { memo, ReactElement } from "react"
import { Product } from ".."
import { ProductProps } from "../../typings/interfaces/mains"
import {
  TouchSliderContainer,
  TouchSliderWrapper,
} from "./styles/MultiSliderStyles"

type Props = {
  data: ProductProps[]
}

function TouchSlider({ data }: Props): ReactElement {
  return (
    <TouchSliderWrapper>
      <TouchSliderContainer>
        {data.length !== 0 &&
          data.map(
            (
              {
                _id,
                name,
                imageSrc,
                hoveringImage,
                sideImagesSrc,
                price,
                rating,
                vendorName,
              },
              idx
            ) => (
              <Product
                key={`product_preview_${idx}`}
                id={_id}
                name={name}
                imageSrc={imageSrc}
                hoveringImage={
                  hoveringImage
                    ? hoveringImage
                    : sideImagesSrc
                    ? sideImagesSrc[0]
                    : imageSrc
                }
                price={price}
                rating={rating - 1}
                vendor={vendorName || "firedev99"}
              />
            )
          )}
      </TouchSliderContainer>
    </TouchSliderWrapper>
  )
}

export default memo(TouchSlider)
