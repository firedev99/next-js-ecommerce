import { motion } from "framer-motion"
import styled from "styled-components"

export const ProductPageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`

export const ProductMainDisplay = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
`
export const ProductDetailsWrapper = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`

export const ProductSliderWrapper = styled(motion.div)`
  position: relative;
  width: 556px;
  height: 600px;

  .zoom_on {
    border: none;
    padding: 0.2rem 0.3rem;
    position: absolute;
    z-index: 100;
    top: 0.8rem;
    right: 0.8rem;
    border-radius: 0.2rem;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: 1366px) {
    width: 424px;
    height: 498px;
  }

  @media (max-width: 916px) {
    width: 436px;
  }

  @media (max-width: 515px) {
    width: 372px;
    height: 456px;
  }

  @media (max-width: 415px) {
    width: 312px;
    height: 410px;
  }

  @media (max-width: 340px) {
    width: 260px;
    height: 332px;
  }
`

export const ProductSliderButton = styled.button<{ next?: boolean }>`
  position: absolute;
  z-index: 30;
  top: 50%;
  left: ${({ next }) => (next ? `unset` : `0.7rem`)};
  right: ${({ next }) => (next ? `0.7rem` : `unset`)};
  transform: translateY(-50%);
  background-color: whitesmoke;
  border-radius: 50%;
  border: none;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  svg {
    width: 36px;
    height: 36px;
    transform: ${({ next }) => (next ? `scale(1)` : `scale(-1)`)};
    margin-left: ${({ next }) => (next ? `3px` : `-4px`)};
    color: black;
  }

  :hover {
    cursor: pointer;
  }

  :disabled {
    opacity: 0.5;
  }

  @media (max-width: 1024px) {
    left: ${({ next }) => (next ? `unset` : 0)};
    right: ${({ next }) => (next ? 0 : `unset`)};
  }
`

export const SliderPreviewWrapper = styled.div`
  position: absolute;
  bottom: 2%;
  z-index: 30;
  left: 50%;
  transform: translate(-50%, -3%);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  user-select: none;
`

export const PreviewChecker = styled.div`
  display: none;
  position: absolute;
  align-items: center;
  bottom: 1.2rem;
  z-index: 30;
  left: -1.6rem;
  min-width: 210px;
  height: 52px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  user-select: none;

  .asset_length {
    position: relative;
    left: -3rem;
  }

  .prop {
    margin-top: 4px;
    margin-left: 6px;
    font-size: 1.3rem;
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`

export const SliderPreview = styled.div<{ active: boolean; length: number }>`
  position: relative !important;
  z-index: 30;
  display: block;
  width: 68px;
  min-width: 68px;
  height: 68px;
  margin: 4px 8px;
  border-radius: 6px;
  filter: ${({ active }) => (active ? `brightness(1)` : `brightness(0.1)`)};
  transition: all 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19);

  img {
    border-radius: 6px;
  }

  :hover {
    cursor: pointer;
  }

  @media (max-width: 1366px) {
    width: 56px;
    min-width: 56px;
    height: 56px;
    border-radius: 4px;

    img {
      border-radius: 4px;
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`

export const ProductInformationsWrapper = styled(motion.div)`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;

  @media (max-width: 942px) {
    padding-left: 0;
  }
`

export const ProductTitleWrapper = styled(motion.div)`
  width: 412px;
  margin-left: auto;
  margin-top: 1rem;
  user-select: none;

  h3 {
    font-size: 1.4rem;
  }

  @media (max-width: 1024px) {
    margin-top: -9rem;
  }

  @media (max-width: 946px) {
    margin-top: 1rem;
    margin-right: auto;
  }

  @media (max-width: 515px) {
    width: 372px;
  }

  @media (max-width: 415px) {
    width: 312px;
  }

  @media (max-width: 340px) {
    width: 268px;
  }
`

export const ProductSizesWrapper = styled(motion.div)`
  margin-left: auto;
  margin-top: 1rem;
  width: 412px;

  @media (max-width: 946px) {
    margin-right: auto;
  }

  @media (max-width: 515px) {
    width: 372px;
  }

  @media (max-width: 485px) {
    margin-top: 0.5rem;
  }

  @media (max-width: 415px) {
    width: 312px;
  }

  @media (max-width: 340px) {
    width: 268px;
  }
`

export const ProductRatingWrapper = styled(motion.div)`
  margin-left: auto;
  display: flex;
  width: 412px;
  margin-top: 0.2rem;
  user-select: none;

  span {
    margin-left: 0.25rem;
    font-weight: 500;
  }

  .review {
    margin-left: 0.5rem;
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media (max-width: 946px) {
    margin-right: auto;
    margin-top: 0.5rem;
  }

  @media (max-width: 515px) {
    width: 372px;
  }

  @media (max-width: 415px) {
    width: 312px;
  }

  @media (max-width: 340px) {
    width: 268px;
  }
`

export const ProductPriceWColorWrapper = styled(motion.div)<{
  colors?: boolean
}>`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  margin-left: ${({ colors }) => !colors && "auto"};
  flex-direction: ${({ colors }) => !colors && "column"};

  .product_price {
    font-size: 4.5rem;
    font-weight: 700;
    margin-top: -1rem;
    user-select: none;
  }

  @media (max-width: 1280px) {
    flex-direction: column;
    margin-left: auto;
  }

  @media (max-width: 946px) {
    margin-right: auto;

    .product_price {
      margin-left: -0.2rem;
    }
  }

  @media (max-width: 485px) {
    .product_price {
      line-height: 6rem;
      margin-top: -0.6rem;
    }
  }

  @media (max-width: 415px) {
    margin-top: 0.5rem;
    .product_price {
      font-size: 3.5rem;
      line-height: 5rem;
    }
  }
`

export const ProductColorOptionsWrapper = styled.div`
  width: 412px;

  @media (max-width: 515px) {
    max-width: 372px;
  }

  @media (max-width: 415px) {
    width: 312px;
  }

  @media (max-width: 340px) {
    width: 268px;
  }
`

export const ProductQuantityWrapper = styled(motion.div)`
  margin-left: auto;
  width: 412px;
  margin-top: 1.8rem;
  user-select: none;
  margin-bottom: 0.8rem;

  .quantity_controls {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .product_quantity_single {
      margin-left: -1.2rem !important;
    }
    .product_quantity_double {
      margin-left: -0.1rem !important;
    }
  }

  .animated_line_1 {
    margin: 0 0 1.2rem 0;
  }

  .animated_line_2 {
    margin: 1.2rem 0 0 0;
  }

  button {
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-size: 2rem;
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;

    :last-of-type {
      margin-left: 2rem;
    }

    :hover {
      cursor: pointer;
      :disabled {
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 946px) {
    margin-right: auto;
  }

  @media (max-width: 515px) {
    width: 372px;
    padding: 0.3rem 0;

    .animated_line_1 {
      margin: 0 0 0.7rem 0;
    }

    .animated_line_2 {
      margin: 0.7rem 0 0 0;
    }
  }

  @media (max-width: 415px) {
    width: 312px;
  }

  @media (max-width: 340px) {
    width: 268px;
  }
`

export const ProductCartButton = styled(motion.button)`
  width: 412px;
  height: 62px;
  margin-left: auto;
  margin-bottom: 1.5rem;
  margin-top: 1.6rem;
  border-radius: 8px;
  border: none;
  user-select: none;

  span {
    font-size: 1.2rem;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-transform: uppercase;
  }

  :hover {
    cursor: pointer;
  }

  @media (max-width: 946px) {
    margin-right: auto;
  }

  @media (max-width: 515px) {
    width: 372px;
  }

  @media (max-width: 415px) {
    width: 312px;
  }

  @media (max-width: 340px) {
    width: 268px;
  }
`

export const ProductDescriptionWrapper = styled(motion.div)`
  margin-left: auto;
  width: 412px;
  margin-top: 1.2rem;

  span {
    font-size: 1.3rem;
    font-weight: 600;
  }

  h4 {
    margin-top: 0.2rem;
    font-size: 1rem;
    font-weight: 400;
    padding-right: 0.5rem;
  }

  @media (max-width: 946px) {
    margin-right: auto;
  }

  @media (max-width: 515px) {
    width: 372px;
  }

  @media (max-width: 415px) {
    width: 312px;
  }

  @media (max-width: 340px) {
    width: 268px;

    h4 {
      padding-right: 0;
    }
  }
`

export const ProductFeaturesWrapper = styled(motion.div)`
  margin-left: auto;
  width: 412px;
  margin-top: 1.5rem;

  .product_features_admin {
    min-height: 242px;

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
    }

    .accordion_items_wrapper {
      align-items: flex-start !important;
      margin-bottom: 1rem !important;
      li {
        font-size: 1rem;

        :hover {
          text-decoration: line-through;
        }
      }
    }
  }

  .product_features {
    h3 {
      font-size: 1.3rem;
      font-weight: 600;
    }

    .accordion_items_wrapper {
      align-items: flex-start !important;
      margin-bottom: 1rem !important;
      li {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 946px) {
    margin-right: auto;
  }

  @media (max-width: 515px) {
    width: 372px;
  }

  @media (max-width: 415px) {
    width: 312px;
  }

  @media (max-width: 340px) {
    width: 264px;
  }
`

export const ProductExtraDisplay = styled(motion.section)`
  width: 100%;
  margin-bottom: 4rem;

  .vendor_name {
    text-align: center;
    font-size: 2rem;
    margin: 5rem 0 1rem 0;
  }

  @media (max-width: 525px) {
    margin-bottom: 2.5rem;

    .vendor_name {
      margin-top: 2rem;
    }
  }
`

export const ExtraMediaWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .extra_media_img_wrapper {
    position: relative !important;
    display: block;
    margin: 0.8rem 0.5rem;
    width: 356px;
  }

  @media (max-width: 1024px) {
    .extra_media_img_wrapper {
      width: 320px;
    }
  }

  @media (max-width: 525px) {
    width: 100%;
    .extra_media_img_wrapper {
      width: 100%;
      margin: 0.5rem 0;
    }
  }
`

export const RecommendationWrapper = styled.div`
  width: 100%;
  height: auto;

  .navigate_to_category {
    margin-top: 6rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .sm {
      display: none;
    }

    h3 {
      margin-left: 0.2rem;
      font-weight: 600;
    }

    a {
      font-weight: 500;
    }

    @media (max-width: 1080px) {
      h3 {
        font-size: 1.1rem;
        font-weight: 500;
        max-width: 600px;
      }
    }

    @media (max-width: 786px) {
      h3 {
        font-size: 1rem;
        max-width: 400px;
      }
    }

    @media (max-width: 600px) {
      margin-bottom: 0.6rem;
      .sm {
        display: inline-block;
      }

      .lg {
        display: none;
      }

      a {
        font-size: 1rem;
      }
    }

    @media (max-width: 360px) {
      .sm {
        max-width: 176px;
      }
    }
  }
`
