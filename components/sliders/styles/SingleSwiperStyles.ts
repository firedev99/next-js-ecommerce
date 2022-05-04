import styled from "styled-components"

export const SingleSwiperWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  min-height: 100%;
  position: relative;
  z-index: 20;
  outline: none;
  touch-action: pan-x;

  button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateX(-50%);
    z-index: 30;
  }
`

export const SingleSwiperContainer = styled.div`
  height: 100%;
  width: 100%;
  user-select: none;
  display: flex;
  align-items: center;
  position: absolute;
  filter: brightness(0.9);
  left: 0;
  top: 0;
  transition: all 0.5s cubic-bezier(0.88, 0.055, 0.4, 0.88);
  touch-action: pan-x;
`

export const SwiperAsset = styled.div`
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 100%;

  > div {
    position: unset !important;
    > div {
      padding-top: unset !important;
    }
  }

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
    filter: brightness(0.9) !important;
  }
`
