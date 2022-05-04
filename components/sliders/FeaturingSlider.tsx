import { ReactElement } from "react"
import { CSSProperties } from "styled-components"
import { CustomLink, MultiSlider, ProductSliderSkeleton } from ".."
import { useAppSelector } from "../../app/hooks/redux"
import { FeaturingSliderWrapper } from "./styles/FeaturingSliderStyles"

type FeaturinSliderProps = {
  style?: CSSProperties
  expand: boolean
}

function FeaturingSlider({ style, expand }: FeaturinSliderProps): ReactElement {
  const { featuringProducts, status } = useAppSelector(
    (state) => state.general_product
  )

  if (status === "loading")
    return <ProductSliderSkeleton style={{ marginTop: "1.5rem" }} />

  return (
    <FeaturingSliderWrapper style={style}>
      {expand && (
        <div className="navigate_to_products">
          <h3>Our all time trending products.</h3>
          <CustomLink text="see all" style={{ marginLeft: "auto" }} />
        </div>
      )}

      <MultiSlider data={featuringProducts} />
    </FeaturingSliderWrapper>
  )
}

FeaturingSlider.defaultProps = {
  expand: false,
}

export default FeaturingSlider
