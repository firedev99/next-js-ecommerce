import { motion } from "framer-motion"
import styled from "styled-components"

export const ProductPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .product_meta {
    padding-top: 154%;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;

    .vendor_name {
      font-size: 0.8rem;
      font-weight: 400;
      opacity: 0.8;
      margin-top: -0.3rem;
      margin-bottom: 0;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      width: fit-content;

      :hover {
        opacity: 1;
      }
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .product_ratings {
        transform: scale(0.6);
        width: 0;
        height: 24;
      }
    }

    h3 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-top: 0.2rem;
      font-size: 1.4rem;
    }

    span {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  .product_image_inner {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    > div {
      position: unset !important;
      > div {
        padding-top: unset !important;
      }
    }

    .image {
      object-fit: contain;
      width: 100% !important;
      position: relative !important;
      height: unset !important;
      border-radius: 6px !important;
      filter: brightness(0.9) !important;
    }
  }

  @media (max-width: 768px) {
    .product_meta {
      .vendor_name {
        margin-top: 0;
        margin-left: 4px;
      }

      h3 {
        font-size: 1.1rem;
        margin-left: 4px;
        line-height: 1.3rem;
        margin-top: 0rem;
        font-weight: 600;
        margin-bottom: -0.1rem;
      }

      span {
        font-size: 0.9rem;
        margin-left: 4px;
        font-weight: 500;
      }

      .controls {
        .product_ratings {
          transform: scale(0.7);
          margin-left: 0.2rem;
        }
      }
    }
  }

  @media (max-width: 700px) {
    .product_meta {
      h3 {
        font-size: 1.3rem;
      }

      span {
        font-size: 1.1rem;
      }

      .vendor_name {
        font-size: 1rem;
        margin-top: 0;
      }
    }
  }

  @media (max-width: 346px) {
    .product_meta {
      h3 {
        font-size: 1.8rem;
        line-height: 2.2rem;
      }

      span {
        font-size: 1.2rem;
      }

      .controls {
        .product_ratings {
          margin-top: 0.5rem;
          transform: scale(1);
        }
      }
    }
  }
`

export const ProductPreviewWrapper = styled(motion.a)`
  min-width: 212px;
  height: 100%;
  width: 212px;
  margin-right: 1.5rem;
  height: 100%;
  border-radius: 6px;
  flex-direction: column;
  position: relative;

  :last-of-type {
    margin-right: 0;
  }

  :hover {
    cursor: pointer;
  }

  @media (max-width: 1256px) {
    min-width: 18.7%;
    width: 18.7%;
  }

  @media (max-width: 1128px) {
    min-width: 23.5%;
    width: 23.5%;
  }

  @media (max-width: 900px) {
    min-width: 31%;
  }

  @media (max-width: 700px) {
    min-width: 47%;
  }

  @media (max-width: 493px) {
    min-width: 76%;
  }

  @media (max-width: 346px) {
    min-width: 100%;
  }
`
