import styled from 'styled-components'
import { motion } from 'framer-motion'

export const SimpleTitleWrapper = styled.div`
    pointer-events: none;
    h3 {
        font-size: 46px;
    }
`

export const ErrorWrapper = styled(motion.div)`
    background-color: rgba(194, 54, 22, 1);
    width: 100%;
    text-align: center;
    padding: 16px 24px;
    border-radius: 8px;
    span {
        color: rgba(221, 221, 221, 1);
    }
`

export const RatingStarsWrapper = styled.div`
    display: flex;
`

export const StarContainer = styled.div<{ selected: boolean }>`
    margin: 0 0.2rem;

    svg {
        fill: ${({ selected }) => selected && `white`};
        stroke: ${({ selected }) => selected && `none`};
    }

    :first-of-type {
        margin-left: 0;
    }

    :hover {
        cursor: pointer;
    }
`

export const TextAreaWrapper = styled.div`
    textarea {
        width: 486px;
        resize: none;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(170, 170, 170, 0.5);
        border-radius: 6px;
        color: rgba(170, 170, 170, 1);
        font-family: 'Poppins', sans-serif;
        font-size: 17px;
        padding: 0.2rem;

        :focus {
            outline: 1px solid rgba(170, 170, 170, 1);
        }

        ::-webkit-scrollbar {
            height: 11px;
            width: 11px;
        }
        /* Track */
        ::-webkit-scrollbar-track {
            padding: 1px;
            background: none;
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: #5a5a5a;
            width: 11px;
        }
        /* On hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #b3b3b3;
        }
    }
`

export const PopupStatusWrapper = styled.div`
    position: fixed;
    z-index: 100;
    right: 1.8rem;
    top: 2rem;
`

export const PopupScreenWrapper = styled(motion.div)`
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 1);
    min-width: 272px;
    max-width: 272px;
    min-height: 56px;
    border-radius: 0.2rem;
    display: grid;
    place-items: center;
    position: relative;

    h3 {
        text-align: center;
        padding: 1rem;
        color: rgba(0, 0, 0, 0.9);
    }
`
