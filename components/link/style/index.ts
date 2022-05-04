import styled from "styled-components"

export const LinkWrapper = styled.div`
  position: relative;
  padding: 0 4px;

  a {
    letter-spacing: 0.2px;
    font-size: 18.2px;
    font-weight: 600;
  }

  :after {
    content: "";
    display: block;
    position: absolute;
    background-color: rgba(170, 170, 170, 1);
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 3px;
    border-radius: 1px;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  :hover {
    :after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`
