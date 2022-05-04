import { motion } from "framer-motion"
import styled from "styled-components"

export const MainSliderWrapper = styled(motion.div)`
  width: 100%;
  height: 524px;
  display: flex;
  position: relative;

  @media (max-width: 1024px) {
    height: 472px;
  }

  @media (max-width: 564px) {
    height: 432px;
  }

  @media (max-width: 360px) {
    height: 386px;
  }
`

export const MainSliderInner = styled(motion.div)`
  width: 100%;
  height: 100%;
`

export const MainSliderIntro = styled(motion.div)`
  display: flex;
  position: absolute;
  z-index: 10;
  left: 15%;
  top: 10%;
  transform: translate(-15%, -10%);
  width: fit-content;
  overflow: hidden;

  h1 {
    font-size: 10rem;
    line-height: 8rem;
  }

  @media (max-width: 1200px) {
    h1 {
      font-size: 7.5rem;
    }
  }

  @media (max-width: 1024px) {
    top: 38%;
    left: 50%;
    transform: translate(-50%, -38%);
  }

  @media (max-width: 920px) {
    h1 {
      font-size: 7.5rem;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 6.8rem;
    }
  }

  @media (max-width: 668px) {
    h1 {
      font-size: 5.6rem;
    }
  }

  @media (max-width: 564px) {
    h1 {
      font-size: 4.6rem;
    }
  }

  @media (max-width: 492px) {
    top: 37%;
    transform: translate(-50%, -37%);
    h1 {
      font-size: 4rem;
    }
  }

  @media (max-width: 414px) {
    h1 {
      font-size: 3.6rem;
    }
  }

  @media (max-width: 360px) {
    h1 {
      font-size: 3.2rem;
    }
  }

  @media (max-width: 300px) {
    h1 {
      font-size: 2.7rem;
    }
  }
`

export const MainSliderImage = styled(motion.div)`
  width: 324px;
  height: 412px;
  overflow: hidden;
  display: flex;
  position: absolute;
  z-index: 5;
  left: 48%;
  top: 30%;
  transform: translate(-48%, -30%);

  .image_container {
    width: 100%;
    height: 100%;
    position: relative;

    > div {
      position: unset !important;
    }

    .image {
      object-fit: contain;
      width: 100% !important;
      position: relative !important;
      height: unset !important;
      filter: brightness(0.7) !important;
    }
  }

  @media (max-width: 1024px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 360px) {
    width: 286px;
    height: 386px;
  }

  @media (max-width: 312px) {
    width: 256px;
    height: 372px;
  }
`

export const SliderCategoryShortcuts = styled.div`
  width: 20%;
  min-width: 300px;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translate(0, -50%);

  > div {
    display: flex;
    flex-wrap: wrap;

    a {
      width: 50%;
      min-width: 50%;
      height: 95px;
      padding: 0.5rem;

      .category_container {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

        svg {
          width: 2.6rem;
          height: 2.6rem;
          filter: brightness(0.9);
        }

        span {
          color: rgba(0, 0, 0, 0.8);
          font-size: 0.95rem;
          font-weight: 500;
        }

        :hover {
          background-color: rgba(255, 255, 255, 0.62);
        }
      }
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`

export const MainSliderMessage = styled.div`
  height: auto;
  width: fit-content;
  margin-bottom: 9rem;
  text-align: center;
  position: absolute;
  z-index: 16;
  left: 16%;
  top: 35%;
  transform: translate(-16%, -35%);

  span {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 1px;
    font-weight: 600;
  }

  @media (max-width: 1200px) {
    top: 31.5%;
    transform: translate(-16%, -31.5%);

    span {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 1024px) {
    top: 56.5%;
    left: 50%;
    transform: translate(-50%, -56.5%);
  }

  @media (max-width: 776px) {
    top: 55.5%;
    left: 50%;
    transform: translate(-50%, -55.5%);
  }

  @media (max-width: 668px) {
    top: 52%;
    transform: translate(-50%, -52%);
  }

  @media (max-width: 564px) {
    top: 51%;
    transform: translate(-50%, -51%);
    span {
      font-size: 1rem;
    }
  }

  @media (max-width: 492px) {
    margin-bottom: 11rem;
  }

  @media (max-width: 360px) {
    line-height: 1.1rem;
    span {
      font-size: 0.9rem;
    }
  }
`
export const MainSliderShoppingNav = styled.div`
  position: absolute;
  z-index: 20;
  left: 48%;
  bottom: 0;
  transform: translateX(-48%);

  .start_shopping_navigator {
    position: relative;
    z-index: 30;
    border: 1px solid whitesmoke;
    user-select: none;
  }

  @media (max-width: 1024px) {
    top: 79%;
    left: 50%;
    transform: translate(-50%, -79%);
  }

  @media (max-width: 668px) {
    top: 75%;
    transform: translate(-50%, -75%);

    .start_shopping_navigator {
      padding: 10px 20px;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 492px) {
    top: 76%;
    transform: translate(-50%, -76%);
  }
`
