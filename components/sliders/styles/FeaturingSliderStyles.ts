import styled from "styled-components"

export const FeaturingSliderWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;

  .navigate_to_products {
    margin-top: 1rem;
    margin-bottom: 1.2rem;
    display: flex;

    h3 {
      margin-left: 0.2rem;
      font-weight: 600;
    }

    a {
      font-weight: 500;
    }

    @media (max-width: 1080px) {
      h3 {
        font-size: 1.1rem;
        font-weight: 500;
        max-width: 600px;
      }
    }

    @media (max-width: 786px) {
      h3 {
        font-size: 1rem;
        max-width: 400px;
      }
    }

    @media (max-width: 600px) {
      margin-bottom: 0.6rem;

      a {
        font-size: 1rem;
      }
    }

    @media (max-width: 360px) {
      h3 {
        max-width: 176px;
      }
    }
  }
`
