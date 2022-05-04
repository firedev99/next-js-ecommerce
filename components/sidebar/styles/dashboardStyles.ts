import styled from "styled-components"
import Image from "next/image"

export const SidebarWrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  bottom: 0;
  width: 212px;
  height: 100%;
  display: flex;
  justify-content: center;
`

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`

export const LinksWrapper = styled.div`
  flex: 1;
`
export const SidebarItem = styled.a<{ active?: boolean }>`
  display: flex;
  position: relative;
  border-radius: 0.4rem;
  padding: 0.2rem 2.8rem 0.2rem 0.4rem;
  margin: 0.8rem 0;
  display: flex;
  align-items: center;

  .active_prop {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(250, 250, 250, 0.96);
    left: 0;
    z-index: -1;
    border-radius: 0.4rem;

    .active_prop_line {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 0.2rem;
      height: 60%;
      background: rgba(0, 0, 0, 1);
      border-radius: 0.2rem;
      right: 0.4rem;
    }
  }

  svg {
    margin: 0.3rem 0.5rem 0 0;
    stroke: ${({ active }) =>
      active ? `rgba(0, 0, 0, 0.9)` : `rgba(250, 250, 250, 1)`};

    transition: stroke 0.2s ease-in;
    transition-delay: 0.2s;
  }

  span {
    color: ${({ active }) =>
      active ? `rgba(0, 0, 0, 1)` : `rgba(250, 250, 250, 0.9)`};
    font-size: 16px;
    font-weight: 500;
    transition: color 0.2s ease-in;
    transition-delay: 0.2s;
  }

  :hover {
    cursor: pointer;
  }
`

export const UserWrapper = styled.div`
  display: grid;
  place-items: center;
  .user_profile {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin-bottom: 0.3rem;
    border: 2px solid rgba(255, 255, 255, 0.7);
    position: relative;

    .edit {
      position: absolute;
      bottom: -10px;
      right: -16px;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      svg {
        width: 16px;
      }
    }
  }

  span {
    font-weight: 500;
  }

  button {
    background-color: transparent;
    border: none;
    color: inherit;
    font-family: "Poppins", sans-serif;
    font-size: 13px;
    margin-top: -4px;
  }

  :hover {
    cursor: pointer;
    .user_profile {
      .edit {
        opacity: 1;
      }
    }
  }
`

export const StlyedImage = styled(Image)`
  border-radius: 50%;
`
