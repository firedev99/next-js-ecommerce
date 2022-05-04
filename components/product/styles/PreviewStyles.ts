import { motion } from "framer-motion"
import styled from "styled-components"

export const PreviewWrapper = styled.a`
  width: 100%;
  min-width: 100%;
  height: 100%;
  padding: 1.4rem 1.1rem 1rem 1.1rem;
  border: 1.7px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;

  @media (max-width: 900px) {
    padding: 1rem 0.8rem 0.8rem 0.8rem;
  }

  @media (max-width: 476px) {
    padding: 0.8rem 0.6rem 0.6rem 0.6rem;
  }
  @media (max-width: 390px) {
    padding: 1rem 0.8rem 0.8rem 0.8rem;
  }
`
export const ProductWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;

  .preview_inner {
    position: relative;
    width: 100%;
    height: 256px;
    border-radius: 0.5rem;
    filter: brightness(0.85) !important;

    button {
      position: absolute;
      z-index: 5;
      right: 0.5rem;
      top: 0.5rem;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: none;
      display: grid;
      place-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: rgba(255, 255, 255, 1);
      transition: all 0.3s ease-in-out;

      svg {
        width: 1.3rem;
        height: 1.3rem;
      }

      :hover {
        background-color: rgba(255, 255, 255, 1);
        color: rgba(0, 0, 0, 0.8);
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 8px 0px;
        cursor: pointer;
      }
    }
    .preview_image {
      border-radius: 0.5rem;
    }
  }

  .preview_meta {
    margin-top: 0.6rem;
    display: flex;
    flex-direction: column;

    h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.1rem;
    }

    h5 {
      color: rgba(255, 255, 255, 0.6);
      font-weight: 500;
      line-height: 1.1rem;
      margin-top: -0.1rem;

      .vendor_name {
        color: rgba(255, 255, 255, 0.75);
        font-weight: 600;
        font-size: 0.9rem;

        :hover {
          text-decoration: underline;
        }
      }
    }

    .preview_price {
      font-size: 1.4rem;
      font-weight: 600;
    }

    .preview_colors {
      width: 100%;
      height: 32px;
      position: relative;

      .color_option {
        position: absolute;
        height: 100%;
        width: 32px;
        height: inherit;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.8);
      }
    }
  }

  .preview_controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .preview_modal {
      position: absolute;
      z-index: 20;
      bottom: 1.8rem;
      right: -0.1rem;

      button {
        :first-of-type {
          margin-left: -0.2rem;

          span {
            margin-right: -0.2rem;
          }
        }
      }
    }

    .preview_ratings {
      margin-top: 0.5rem;
      margin-bottom: 0;
      height: 24px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    button {
      margin-top: 0.2rem;
      background-color: transparent;
      border: none;
      color: rgba(45, 129, 255, 0.7);
      font-size: 1rem;
      font-family: "Poppins", sans-serif;
      font-weight: 500;

      :hover {
        cursor: pointer;
      }

      :disabled {
        opacity: 0.2;
      }
    }
  }

  @media (max-width: 900px) {
    .preview_inner {
      height: 224px;
    }
    .preview_controls {
      button {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 776px) {
    .preview_inner {
      height: 264px;
    }
    .preview_controls {
      button {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 632px) {
    .preview_inner {
      height: 212px;
    }
    .preview_meta {
      margin-top: 0.4rem;
      h3 {
        font-weight: 500;
      }
      h5 {
        font-size: 0.75rem;
        .vendor_name {
          font-size: 0.85rem;
        }
      }
      .preview_price {
        font-size: 1.2rem;
      }
      .preview_colors {
        height: 28px;
        .color_option {
          width: 28px;
        }
      }
    }
    .preview_controls {
      .preview_ratings {
        svg {
          width: 16px;
        }
      }
      button {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 542px) {
    .preview_inner {
      height: 186px;
    }

    .preview_meta {
      margin-top: 0.2rem;

      h3 {
        font-size: 1rem;
      }

      h5 {
        font-size: 0.7rem;

        .vendor_name {
          font-size: 0.8rem;
          font-weight: 500;
        }
      }

      .preview_price {
        font-size: 1.1rem;
        line-height: 1.5rem;
      }
      .preview_colors {
        margin-bottom: 0;
      }
    }

    .preview_controls {
      height: 24px;

      .preview_ratings {
        > div {
          margin-right: 0;
        }

        svg {
          width: 14px;
          height: 14px;
        }
      }

      button {
        margin-top: 0.25rem;
      }
    }
  }

  @media (max-width: 476px) {
    .preview_inner {
      height: 156px;
    }

    .preview_meta {
      h3 {
        font-size: 0.95rem;
      }
      h5 {
        font-size: 0.65rem;
        line-height: 0.9rem;
        .vendor_name {
          font-size: 0.75rem;
        }
      }

      .preview_price {
        font-size: 1rem;
        line-height: 1.3rem;
      }

      .preview_colors {
        .color_option {
          width: 25px;
          height: 25px;
        }
      }
    }

    .preview_controls {
      height: 18px;
      .preview_ratings {
        svg {
          width: 12px;
        }
      }
      button {
        font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 390px) {
    .preview_inner {
      height: 264px;
    }

    .preview_meta {
      h3 {
        font-weight: 600;
        font-size: 1.2rem;
      }

      h5 {
        font-size: 0.75rem;
        line-height: 1.1rem;
        .vendor_name {
          font-size: 0.8rem;
        }
      }

      .preview_price {
        font-size: 1.5rem;
        line-height: 2rem;
      }

      .preview_colors {
        height: 30px;

        .color_option {
          width: 30px;
          height: 30px;
        }
      }

      .preview_controls {
        margin-top: 0.2rem;
        .preview_ratings {
          svg {
            width: 16px;
            height: 16px;
          }
        }

        button {
          margin-top: 0;
          font-size: 1rem;
        }
      }
    }
  }
`
