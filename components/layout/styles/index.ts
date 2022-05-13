import styled from "styled-components"

export const DashboardLayoutContent = styled.div`
  width: calc(100% - 212px);
  min-height: 100vh;
  margin-left: auto;
  padding: 3.3rem 2rem 2rem 2rem;
`

export const MainLayoutContent = styled.div`
  min-height: 100vh;
  max-width: 1536px;
  margin: 0 auto;
  /* display: flex;
    align-items: center; */
  padding: 5rem 1.5rem 0 1.5rem;

  @media (max-width: 436px) {
    padding: 5rem 1rem 0 1rem;
  }

  @media (max-width: 300px) {
    padding: 5rem 0.5rem 0 0.5rem;
  }
`

export const ScrollControlButton = styled.div`
  position: fixed;
  z-index: 50;
  left: 1.5rem;
  bottom: 1.5rem;
  width: 100px;
  height: 90px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;

  button {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: rgba(223, 230, 233, 1);
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: none;
    box-shadow: -1px 1px 4px 3px rgba(0, 0, 0, 0.1);

    svg {
      margin-bottom: 0.25rem;
      transform: rotate(270deg);
      width: 28px;
      height: 28px;
    }

    :hover {
      cursor: pointer;
    }
  }
`
