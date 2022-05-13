import styled from "styled-components"

export const NumberCounterWrapper = styled.div`
  pointer-events: none;
  user-select: none;
  overflow: hidden;
  min-width: 64px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;

  :first-of-type {
    left: 0;
  }
  :last-of-type {
    right: 0;
  }

  span {
    font-size: 1.8rem;
    font-weight: 600;
    transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
`
