import styled from 'styled-components'
import Image from 'next/image'

export const MenuButton = styled.button<{ open: boolean }>`
    position: absolute;
    z-index: 200;
    right: 24px;
    top: 4px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;

    .lines {
        width: 64px;
        display: flex;
        flex-direction: column;
        span {
            background-color: rgba(255, 255, 255, 1);
            border-radius: 10px;
            height: 3px;
            margin: 5px 0;
            transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);

            :nth-child(1) {
                width: ${(props) => (props.open ? `50%` : `75%`)};
                transform-origin: bottom;
                transform: ${(props) =>
                    props.open && `rotatez(45deg) translate(4px, -3px)`};
            }
            :nth-child(2) {
                width: 100%;
                transform-origin: top;
                transform: ${(props) => props.open && `rotatez(-45deg)`};
            }
            :nth-child(3) {
                width: ${(props) => (props.open ? `50%` : `85%`)};
                transform-origin: bottom;
                transform: ${(props) =>
                    props.open && `rotatez(45deg) translate(18px, -21px)`};
            }
        }
    }

    :hover {
        cursor: pointer;
    }

    @media (max-width: 586px) {
        right: 10px;
    }

    @media (max-width: 300px) {
        right: 0;
    }
`

export const MenuWrapper = styled.div<{ open: boolean }>`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 50;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 1);
    clip-path: ${(props) =>
        props.open ? 'inset(0 0 0 0)' : 'inset(0% 0 100% 0)'};
    transition: clip-path 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
`

export const MenuInner = styled.div`
    width: 100%;
    height: 100%;

    ul {
        scroll-behavior: smooth;
        position: relative;
        width: 100vw;
        height: 100vh;
        padding-left: 10vw;
        overflow: auto;

        ::-webkit-scrollbar {
            display: none;
        }

        @media (max-width: 816px) {
            padding-left: 5vw;
        }

        @media (max-width: 586px) {
            padding-left: 7vw;
        }
    }
`

const length: number = 4
const duration: number = 10

function transitionDelay(i: number, duration: number) {
    return `
            p:nth-child(${i + 1}) {
                span {
                    transition-delay: ${i / duration}s
                }
            }
        `
}

function delayChildren(length: number, duration: number) {
    let str: string = ''

    for (let i = 0; i < length; i += 1) {
        str += transitionDelay(i, duration)
    }

    return str
}

export const ItemWrapper = styled.li`
    list-style-type: none;
    /* padding: 28px 0; */
    padding: 3vh 0;
    max-width: 70vw;

    .active {
        ${delayChildren(length, duration)}

        span {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @media (max-width: 1366px) {
        padding: 20px 0;
    }

    @media (max-width: 800px) {
        max-width: 100%;
    }

    @media (max-width: 586px) {
        padding: 24px 0;

        :nth-of-type(1) {
            padding-top: 72px;
        }
    }

    @media (max-width: 396px) {
        padding: 23px 0;
    }

    @media (max-width: 346px) {
        padding: 22px 0;
    }
`

export const NameWrapper = styled.div`
    position: relative;
    z-index: 4;

    .text_clone {
        position: absolute;
        top: 0;
        pointer-events: none;
        color: rgba(0, 0, 0, 1);
        clip-path: inset(0 100% 0 0);
        transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    }

    :not(.text_clone) {
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.6);
        color: transparent;

        :hover {
            .text_clone {
                clip-path: inset(0 0 0 0);
            }
        }
    }

    h1 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 7.6vw;
        text-transform: lowercase;
        z-index: 1;
        line-height: 1.28;
        font-weight: 300;

        :hover {
            cursor: pointer;
        }
    }

    @media (max-width: 1366px) {
        h1 {
            font-size: 86px;
        }
    }

    @media (max-width: 816px) {
        h1 {
            font-size: 76px;
            line-height: 1.26;
        }
    }

    @media (max-width: 586px) {
        h1 {
            font-size: 60px;
        }
    }

    @media (max-width: 396px) {
        h1 {
            font-size: 59px;
            line-height: 1.18;
        }
    }

    @media (max-width: 346px) {
        h1 {
            font-size: 48px;
        }
    }
`

export const ImageWrapper = styled.div`
    position: fixed;
    z-index: 1;
    top: 30vh;
    left: 55vw;
    min-width: 19vw;
    pointer-events: none;
    transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);

    @media (max-width: 768px) {
        min-width: 30vw;
    }

    @media (max-width: 396px) {
        min-width: 32vw;
    }
`

export const StyledImage = styled(Image)`
    filter: brightness(0.86);
`

export const ExtraWrapper = styled.div`
    position: fixed;
    z-index: 6;
    left: 80vw;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    text-align: left;
    pointer-events: none;

    .header {
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 24px;

        svg {
            margin-right: 4px;
        }

        span {
            display: flex;
            align-items: center;
        }
    }

    p {
        margin-bottom: 10px;
        overflow: hidden;
        color: rgba(0, 0, 0, 0.86);
        font-family: 'Space Grotesk', sans-serif;

        span {
            display: block;
            opacity: 0;
            transition: all 0.25s ease-in-out;
            transform: translateY(10px);
        }
    }

    @media (max-width: 1112px) {
        display: none;
    }
`
