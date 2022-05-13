import { motion } from "framer-motion"
import styled from "styled-components"

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
