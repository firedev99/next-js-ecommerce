import { motion } from "framer-motion"
import styled from "styled-components"

export const PaginatedSliderWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

export const PaginatedSliderInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

export const PaginatedSliderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(0);
  user-select: none;
`

export const TouchSliderWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

export const TouchSliderContainer = styled.div`
  height: 100%;
  display: flex;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const MultiSliderButton = styled(motion.button)`
  width: 72px;
  height: 72px;
  user-select: none;
  border-radius: 50%;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-left: 4px;
  }

  :first-of-type {
    left: -1.2rem;
  }

  :last-of-type {
    left: unset;
    right: -1.2rem;
  }

  :hover {
    cursor: pointer;
  }

  :disabled {
    display: none;
  }
`
