import { motion } from 'framer-motion'
import styled from 'styled-components'

export const HomeDisplayWrapper = styled.div`
    height: 100%;
    width: 100%;
`

export const HomeDisplayCategoryWrapper = styled.div<{ reverse: boolean }>`
    width: 100%;
    height: 100vh;
    max-height: 896px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: ${({ reverse }) => reverse && `row-reverse`};

    @media (max-width: 1024px) {
        margin-top: 7rem;
        min-height: 956px;
        flex-direction: column;
        margin-bottom: 7rem;
    }

    @media (max-width: 746px) {
        min-height: 824px;
    }

    @media (max-width: 472px) {
        margin-top: 1.8rem;
        min-height: 756px;
        height: 756px;
    }

    @media (max-width: 346px) {
        margin-top: 5rem;
        max-height: 624px;
    }
`
export const CategoryBigTitle = styled.div<{ reverse: boolean }>`
    min-width: 524px;
    height: 200px;
    position: absolute;
    z-index: 5;
    top: 2rem;
    left: ${({ reverse }) => (reverse ? '10rem' : 'unset')};
    right: ${({ reverse }) => (reverse ? 'unset' : '10rem')};

    h1 {
        font-size: 2.5rem;
        text-align: center;
        line-height: 3.1rem;
    }

    @media (max-width: 1286px) {
        min-width: 412px;
        height: 120px;

        h1 {
            font-size: 1.9rem;
            line-height: 2.2rem;
        }
    }

    @media (max-width: 1024px) {
        left: ${({ reverse }) => (reverse ? '5rem' : 'unset')};
        right: ${({ reverse }) => (reverse ? 'unset' : '5rem')};
    }

    @media (max-width: 746px) {
        min-width: 346px;
        height: 100px;

        h1 {
            font-size: 1.55rem;
            line-height: 1.7rem;
        }
    }

    @media (max-width: 586px) {
        left: ${({ reverse }) => (reverse ? '3.5rem' : 'unset')};
        right: ${({ reverse }) => (reverse ? 'unset' : '3.5rem')};
        min-width: 312px;

        h1 {
            font-size: 1.3rem;
            line-height: 1.5rem;
        }
    }

    @media (max-width: 472px) {
        min-width: 300px;
        height: 88px;
        left: ${({ reverse }) => (reverse ? '1.5rem' : 'unset')};
        right: ${({ reverse }) => (reverse ? 'unset' : '1.5rem')};

        h1 {
            font-size: 1.6rem;
            line-height: 1.8rem;
        }
    }

    @media (max-width: 386px) {
        min-width: 256px;
        height: 88px;
        left: ${({ reverse }) => (reverse ? '1rem' : 'unset')};
        right: ${({ reverse }) => (reverse ? 'unset' : '1rem')};

        h1 {
            font-size: 1.35rem;
            line-height: 1.35rem;
        }
    }

    @media (max-width: 346px) {
        min-width: 236px;
        height: 88px;
        left: ${({ reverse }) => (reverse ? '0' : 'unset')};
        right: ${({ reverse }) => (reverse ? 'unset' : '0')};
        top: 4rem;
    }
`

export const CategoryProducts = styled(motion.div)`
    min-width: 480px;
    height: 600px;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 1286px) {
        min-width: 380px;
        height: 448px;
    }

    @media (max-width: 746px) {
        min-width: 340px;
        height: 416px;
    }

    @media (max-width: 472px) {
        min-width: 300px;
        height: 352px;
    }

    @media (max-width: 396px) {
        margin-top: 0.5rem;
        min-width: 284px;
        height: 332px;
    }

    @media (max-width: 346px) {
        min-width: 246px;
        height: 306px;
    }
`

export const CategoryImageSection = styled(motion.div)`
    position: relative;
    height: 486px;
    width: 486px;

    :after {
        position: absolute;
        content: ' ';
        height: inherit;
        width: inherit;
        background: rgba(0, 0, 0, 0.55);
        top: 0;
        left: 0;
    }

    @media (max-width: 1286px) {
        width: 412px;
        height: 412px;
    }

    @media (max-width: 1076px) {
        width: 356px;
        height: 356px;
    }

    @media (max-width: 746px) {
        width: 296px;
        height: 296px;
    }

    @media (max-width: 472px) {
        width: 286px;
        height: 286px;
    }

    @media (max-width: 346px) {
        width: 246px;
        height: 246px;
    }
`

export const CategoryImage = styled(motion.div)`
    min-width: 486px;
    height: 486px;
    width: 486px;

    @media (max-width: 1286px) {
        min-width: 412px;
        height: 412px;
        width: 412px;
    }

    @media (max-width: 1076px) {
        min-width: 356px;
        width: 356px;
        height: 356px;
    }

    @media (max-width: 746px) {
        min-width: 296px;
        width: 296px;
        height: 296px;
    }

    @media (max-width: 472px) {
        min-width: 286px;
        width: 286px;
    }

    @media (max-width: 346px) {
        min-width: 246px;
        width: 246px;
    }
`

export const ProductNav = styled(motion.div)`
    width: 50%;
    min-width: 50%;
    position: relative;
    height: 300px;
    padding: 0.5rem;
    border: 1.6px solid rgba(255, 255, 255, 0.2);

    .overlay {
        width: 100%;
        padding: 0.2rem;
        height: auto;
        background: rgba(0, 0, 0, 0.35);
        position: absolute;
        z-index: 5;
        bottom: 0;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        text-align: center;
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);

        h4 {
            font-size: 1.2rem;
            font-weight: 600;
            line-height: 1.2rem;
        }
        .price {
            font-size: 0.9rem;
            line-height: 1rem;
            opacity: 0.9;
        }
        .vendor {
            font-size: 0.8rem;
            opacity: 0.75;
        }
    }

    :after {
        content: ' ';
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
        transition: all 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        top: 0;
        left: 0;
    }

    :hover {
        cursor: pointer;
        .overlay {
            opacity: 1;
        }

        :after {
            background-color: rgba(0, 0, 0, 0.5);
        }
    }

    @media (max-width: 1286px) {
        height: 224px;
    }

    @media (max-width: 746px) {
        height: 208px;

        .overlay {
            h4 {
                font-size: 1rem;
            }
            .vendor {
                font-size: 0.7rem;
            }
            .price {
                font-size: 0.8rem;
            }
        }
    }

    @media (max-width: 472px) {
        height: 176px;
    }

    @media (max-width: 396px) {
        height: 168px;
    }
`
