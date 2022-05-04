import styled from "styled-components"

export const AdminProductWrapper = styled.div`
  width: 100%;
  height: 100%;

  .pagination_control {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;

    .prev_btn {
      svg {
        transform: scaleX(-1);
        margin-left: 0 !important;
        margin-right: 0.2rem;
      }
    }

    .prev_btn,
    .next_btn {
      background-color: transparent !important;
      color: rgba(170, 170, 170, 1);

      svg {
        margin-top: 0.25rem;
        margin-left: 0.2rem;
      }
    }

    button {
      width: 2.2rem;
      height: 2.2rem;
      font-family: "Poppins", sans-serif;
      font-weight: 600;
      border-radius: 0.3rem;
      border: none;
      margin-right: 1rem;
      background-color: transparent;
      color: rgba(255, 255, 255, 0.95);

      :hover {
        cursor: pointer;
      }
    }

    .pagination_active {
      background-color: rgba(255, 255, 255, 0.2);
      color: rgba(170, 170, 170, 1);
    }
  }

  .empty {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    text-align: center;
  }

  .view_grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .view_list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 1366px) {
    .view_grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (max-width: 1156px) {
    .view_grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 896px) {
    .view_grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`

export const ViewModes = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.4rem;

  .active {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(170, 170, 170, 1);
  }

  button {
    background: transparent;
    border: none;
    color: rgba(170, 170, 170, 1);
    width: 2.2rem;
    height: 2.2rem;
    display: grid;
    place-items: center;
    border-radius: 0.2rem;
    transition: all 0.3s ease-in-out;

    :last-child {
      margin-left: 0.4rem;
    }

    :hover {
      cursor: pointer;
    }
  }
`

export const AdminProducts = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  text-align: center;
`

export const CreateOption = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1.6rem;
`

export const NewProductLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  svg {
    margin-right: 6px;
    width: 28px;
    height: 28px;
  }
  span {
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    font-weight: 500;
    margin-right: 4px;
  }

  :after {
    content: "";
    display: block;
    position: absolute;
    background: rgba(170, 170, 170, 1);
    left: 0;
    bottom: -8px;
    width: 100%;
    height: 3px;
    border-radius: 1px;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }
  :hover {
    cursor: pointer;
    :after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`
