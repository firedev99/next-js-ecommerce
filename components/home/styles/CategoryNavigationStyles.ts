import styled from "styled-components"

export const CategoryNavigationWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  width: 100%;
  margin-top: 2rem;
  display: none;
  overflow-y: hidden;
  overflow-x: auto;
  position: relative;
  user-select: none;

  ::-webkit-scrollbar {
    display: none;
  }

  a {
    padding: 0.4rem 0.9rem;
    margin-right: 1rem;
    border: 1.6px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;

    .category_container {
      display: flex;
      align-items: center;
      span {
        white-space: nowrap;
        margin-left: 0.5rem;
        font-size: 1.1rem;
      }
      svg {
        filter: brightness(0.85);
      }
    }

    :last-of-type {
      margin-right: 0;
    }
  }

  @media (max-width: 1024px) {
    display: flex;
  }

  @media (max-width: 668px) {
    margin-top: 1.5rem;
  }
`
