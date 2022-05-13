import { motion } from "framer-motion"
import styled from "styled-components"

export const CartIndicatorWrapper = styled.div`
  position: fixed;
  z-index: 50;
  right: -0.3rem;
  bottom: 1.5rem;
  width: 124px;
  height: 100px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-family: "Poppins", sans-serif;

  .popdown_button {
    margin-left: -0.2rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: black;
    display: grid;
    place-content: center;
    z-index: -1;
    position: absolute;
    top: 24px;
    right: 32px;
    border: none;
    box-shadow: -1px 1px 4px 3px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: all 0.4s ease-in-out;

    svg {
      width: 22px;
      height: 22px;
    }

    :hover {
      cursor: pointer;
    }
  }

  :hover {
    cursor: pointer;
    .popdown_button {
      z-index: 1;
      opacity: 1;
      transform: translate(20px, -20px);
    }
  }
`
export const CartIndicatorInner = styled(motion.div)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(223, 230, 233, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: -1px 1px 4px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.35rem;

  .cart_counter_double {
    margin-left: -1.3rem !important;
  }

  .cart_counter {
    margin-left: -2.7rem !important;
  }

  span {
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.9);
    line-height: 2.8rem;
  }

  .cart_logo {
    position: absolute;
    left: -0.5rem;
    top: -0.4rem;
    display: grid;
    place-content: center;
    width: 32px;
    height: 32px;
    border-radius: 12px;
    background-color: rgba(45, 129, 255, 1);
    box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.08);

    svg {
      margin-left: -0.2rem;
      width: 18px;
      height: 18px;
      stroke-width: 2.5px;
      color: black;
    }
  }
`
