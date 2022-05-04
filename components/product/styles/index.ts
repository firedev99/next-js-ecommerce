import { motion } from 'framer-motion'
import styled from 'styled-components'

export const AnimatedColorOptionsWrapper = styled.div`
    width: 100%;
    height: auto;
    user-select: none;

    .color_option_title {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .color_options {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.7rem;

        .color_wrapper {
            position: relative;

            .colored_container {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                margin: 0 0.8rem 0.5rem 0.8rem;
                position: relative;
                z-index: 10;
            }

            .color_outline {
                top: -0.5rem;
                left: 0.3rem;
                position: absolute;
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
                z-index: 1;

                .blank_outline {
                    position: absolute;
                    width: 4.6rem;
                    height: 4.6rem;
                    background-color: rgba(0, 0, 0, 1);
                    border-radius: inherit;
                    z-index: 1;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            :first-of-type {
                margin-left: -1.1rem;
            }

            :nth-child(5) {
                margin-left: -1.1rem;
            }

            :nth-child(9) {
                margin-left: -1.1rem;
            }

            :hover {
                cursor: pointer;
            }
        }
    }

    @media (max-width: 485px) {
        .color_options {
            margin-top: 0.6rem;
            .color_wrapper {
                .colored_container {
                    width: 56px;
                    height: 56px;
                }
                .color_outline {
                    width: 4.5rem;
                    height: 4.5rem;

                    .blank_outline {
                        width: 4.2rem;
                        height: 4.2rem;
                    }
                }
            }
        }
    }

    @media (max-width: 415px) {
        .color_options {
            .color_wrapper {
                .colored_container {
                    margin: 0 0.6rem 0.5rem 0.6rem;
                }
                .color_outline {
                    left: 0.1rem;
                }
                :first-of-type {
                    margin-left: -0.85rem;
                }
            }
        }
    }

    @media (max-width: 340px) {
        .color_options {
            margin-top: 0.4rem;

            .color_wrapper {
                .colored_container {
                    width: 50px;
                    height: 50px;
                }

                .color_outline {
                    width: 4.1rem;
                    height: 4.1rem;

                    .blank_outline {
                        width: 3.9rem;
                        height: 3.9rem;
                    }
                }

                :first-of-type {
                    margin-left: -0.6rem;
                }

                :nth-child(5) {
                    margin-left: -0.6rem;
                }

                :nth-child(9) {
                    margin-left: -0.6rem;
                }
            }
        }
    }
`

export const AnimatedTitleWrapper = styled(motion.div)`
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-wrap: wrap;
    font-size: 4.5rem;
    line-height: 104px;
    color: rgba(187, 187, 187, 1);
    max-height: 206px;
    min-height: 206px;
    width: auto;
    margin-top: -0.5rem;
    overflow: hidden;
    user-select: none;

    @media (max-width: 1366px) {
        font-size: 4rem;
        line-height: 96px;
        max-height: 192px;
        min-height: 192px;
    }

    @media (max-width: 1200px) {
        font-size: 3.9rem;
    }

    @media (max-width: 1024px) {
        margin-top: 1.5rem;
        line-height: 5.1rem;
        max-height: 158px;
        min-height: 158px;
        font-size: 3.6rem;
    }

    @media (max-width: 946px) {
        margin: 0 auto;
        margin-top: 1.5rem;
        min-height: unset;
        width: 412px;
        font-size: 3.5rem;
    }

    @media (max-width: 515px) {
        max-width: 372px;
        font-size: 3rem;
    }

    @media (max-width: 415px) {
        max-width: 312px;
        max-height: 136px;
        font-size: 2.6rem;
        line-height: 4.3rem;
    }

    @media (max-width: 340px) {
        max-width: 268px;
        max-height: 106px;
        font-size: 2.2rem;
        line-height: 3.2rem;
    }
`

export const AnimatedSizeOptionsWrapper = styled.div`
    width: 100%;
    height: auto;
    user-select: none;

    .size_options_title {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .size_options {
        display: flex;
        margin: 0.5rem 0 1rem 0;

        .size_wrapper {
            position: relative;
            padding: 0 0.3rem;
            margin: 0 1rem;

            .size_name {
                font-size: 1.7rem;
                font-weight: 700;
            }

            .size_outline {
                position: absolute;
                bottom: 0;
                left: 0 !important;
                /* left: -0.7rem !important; */
                width: 100%;
                height: 4px;
                background-color: rgba(170, 170, 170, 1);
            }

            :first-of-type {
                margin-left: -0.2rem;
            }

            :hover {
                cursor: pointer;
            }
        }
    }

    @media (max-width: 1024px) {
        .size_options {
            margin-top: 0.4rem;
            margin-bottom: 0.8rem;
        }
    }

    @media (max-width: 415px) {
        .size_options {
            margin: 0.8rem 0;
            .size_wrapper {
                margin: 0 0.7rem;
                .size_name {
                    font-size: 1.6rem;
                }

                :first-of-type {
                    margin-left: -0.2rem;
                }
            }
        }
    }

    @media (max-width: 320px) {
        .size_options {
            .size_wrapper {
                margin: 0 0.4rem;
                .size_name {
                    font-size: 1.5rem;
                }
            }
        }
    }
`
