import styled from 'styled-components'
import { motion } from 'framer-motion'

export const SimpleModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

export const SimpleModalInner = styled(motion.div)`
    padding: 3rem;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 1);
    display: grid;
    place-items: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 2px 1px 10px rgba(255, 255, 255, 0.05);
`

export const ModalCloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.3rem;
    height: 2.3rem;
    display: grid;
    place-items: center;
    border: none;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    background-color: transparent;
    border-radius: 4px;
    svg {
        width: 1.8rem;
        height: 1.8rem;
        color: rgba(170, 170, 170, 1);
    }

    :hover {
        cursor: pointer;
        border-radius: 50%;
        background-color: rgba(170, 170, 170, 1);
        svg {
            color: rgba(0, 0, 0, 1);
        }
    }
`

export const ControlModalWrapper = styled(motion.div)`
    width: 164px;
    min-width: 164px;
    background-color: rgba(31, 31, 31, 1);
    border-radius: 0.8rem;
    border: 1.6px solid rgba(255, 255, 255, 0.17);
    padding: 0.65rem;

    .navigator {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgba(45, 129, 255, 0.7);
        padding: 0.25rem 0.3rem;
        transition: all 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        background-color: transparent;
        border: none;
        font-family: 'Poppins', sans-serif;
        border-radius: 4px;

        :hover {
            color: rgba(255, 255, 255, 0.7);
        }
    }
`

export const FilterModalWrapper = styled(motion.div)<{
    direction: 'left' | 'right'
}>`
    width: 100%;
    height: auto;
    min-width: 100%;
    position: absolute;
    z-index: 30;
    height: auto;
    overflow-y: scroll;
    top: 3.2rem;
    padding: 1rem;
    background-color: rgba(31, 31, 31, 1);
    border: 1.6px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.9rem;
    display: flex;
    flex-direction: column;
    left: ${({ direction }) => (direction === 'left' ? 0 : 'unset')};
    right: ${({ direction }) => (direction === 'right' ? 0 : 'unset')};

    scrollbar-width: thin;
    scrollbar-color: rgba(109, 109, 109, 1);

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        margin-top: 0.9rem;
        margin-bottom: 0.6rem;
        border-radius: 0.4rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(109, 109, 109, 1);
        border-radius: 0.4rem;
    }
`
