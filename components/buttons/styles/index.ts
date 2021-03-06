import styled from "styled-components"
import { motion } from "framer-motion"

export const SimpleButtonWrapper = styled(motion.button)`
  font-size: 22px;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(187, 187, 187, 1);
  letter-spacing: 0.6px;
  background-color: rgba(22, 22, 22, 1);
  padding: 10px 42px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  :hover {
    background-color: rgba(187, 187, 187, 1);
    color: rgba(22, 22, 22, 1);
  }

  :disabled {
    :hover {
      background-color: inherit !important;
      color: inherit;
      cursor: not-allowed;
    }
  }
`

export const ButtonWrapper = styled(motion.div)`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background-color: rgba(187, 187, 187, 1);
  display: grid;
  place-items: center;
`
export const ButtonInner = styled.div`
  width: inherit;
  height: inherit;
  display: grid;
  place-items: center;
  svg {
    fill: rgba(0, 0, 0, 1);
    width: 36px;
    height: auto;
  }
`
