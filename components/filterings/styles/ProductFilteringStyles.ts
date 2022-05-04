import styled, { css } from 'styled-components'

export const FilteringHeader = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;

    /* scrollbar-width: thin;
    scrollbar-color: rgba(109, 109, 109, 1);
    
    mask-image: linear-gradient(to top, transparent, black),
        linear-gradient(to top, transparent 8px, black 8px);
    mask-size: 100% 20000px;
    mask-position: bottom;
    -webkit-mask-image: linear-gradient(to top, transparent, black),
        linear-gradient(to top, transparent 8px, black 8px);
    -webkit-mask-size: 100% 20000px;
    -webkit-mask-position: bottom;
    
    ::-webkit-scrollbar {
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 0.4rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(109, 109, 109, 1);
        border-radius: 0.4rem;
    }

    :hover {
        mask-position: top;
        -webkit-mask-position: top;
    } */
`
export const LeftFilters = styled.div`
    display: flex;
    gap: 1.5rem;

    @media (max-width: 1024px) {
        gap: 1rem;
    }
`

const PriceInputCSS = css`
    display: flex;
    margin-bottom: 1rem;
    input {
        width: 132px;
        height: 46px;
        margin-right: 1rem;
        background-color: rgba(31, 31, 31, 0.7);
        border: 1.7px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.7rem;
        font-size: 1.1rem;
        font-family: 'Poppins', sans-serif;
        text-indent: 0.4rem;
        font-weight: 600;
        color: rgba(245, 245, 245, 0.4);

        :last-of-type {
            margin-right: 0;
        }

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        ::placeholder {
            font-size: 1.1rem;
            font-family: 'Poppins', sans-serif;
            text-indent: 0.4rem;
            font-weight: 600;
            color: rgba(245, 245, 245, 0.4);
        }
    }
`

const ColorOptionsCSS = css`
    ul {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;

        li {
            margin-right: 0.3rem;
            margin-bottom: 0.5rem;
            min-width: 50px;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            display: grid;
            place-items: center;

            .product_color {
                width: 80%;
                height: 80%;
                border-radius: 50%;
            }

            :nth-child(3n + 3) {
                margin-right: 0;
            }

            :hover {
                border: 2px solid rgba(255, 255, 255, 0.1);
                cursor: pointer;
            }
        }
    }
`

const BrandOptionsCSS = css`
    ul {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;

        li {
            position: relative;
            width: 120px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-radius: 0.5rem;
            user-select: none;
            margin-right: 1.15rem;
            margin-bottom: 0.2rem;
            transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

            label {
                font-size: 1rem;
                line-height: 1.2rem;
                font-weight: 600;
                input {
                    width: 0.1px;
                    height: 0.1px;
                    opacity: 0;

                    :checked {
                        ~ .checkbox_tick {
                            border: 1.8px solid rgba(255, 255, 255, 0.2);

                            svg {
                                transform: scale(1);
                            }
                        }
                    }
                }

                .checkbox_tick {
                    position: absolute;
                    right: -0.5rem;
                    top: -0.15rem;
                    width: 1.45rem;
                    height: 1.45rem;
                    display: grid;
                    place-items: center;
                    border-radius: 50%;
                    border: none;

                    svg {
                        width: 1.1rem;
                        height: 1.1rem;
                        margin-top: 0.1rem;
                        transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
                        transform: scale(0);
                    }
                }
            }

            :nth-child(even) {
                margin-right: 0;
            }

            :nth-last-child(2) {
                margin-bottom: 0.2rem;
            }

            :last-child {
                margin-bottom: 0.2rem;
            }

            :hover {
                background-color: rgba(255, 255, 255, 0.1);

                label {
                    cursor: pointer;
                }
            }
        }
    }
`

export const FilteringOptionsWrapper = styled.div`
    position: relative;

    .category_filter_modal {
        min-width: 224px;
        max-height: 186px;
        padding: 0.8rem 0.35rem 0.3rem 0.5rem;

        button {
            width: 100%;
            min-width: 100%;
            background-color: transparent;
            border: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: transparent;
            transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

            .display {
                display: flex;
                align-items: center;

                svg {
                    width: 1.6rem;
                    height: 1.6rem;
                    margin-right: 0.7rem;
                    filter: grayscale(1);
                }
            }

            span {
                margin-top: -0.1rem;
                font-size: 0.9rem;
                font-family: 'Poppins', sans-serif;
                color: rgba(245, 245, 245, 0.8);
            }

            :hover {
                cursor: pointer;
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }

    .brand_filter_modal {
        min-width: 300px;
        max-height: 226px;
        padding-top: 1.3rem;

        ${BrandOptionsCSS}
    }

    .color_filter_modal {
        min-width: 202px;
        max-height: 246px;
        padding-top: 0.6rem;

        ${ColorOptionsCSS}
    }

    .price_filter_modal {
        min-width: 316px;

        .user_inputs {
            ${PriceInputCSS}
        }
    }

    .sorting_filter_modal {
        min-width: 264px;
        height: 276px;

        .back_button {
            position: absolute;
            z-index: 5;
            left: 0;
            top: 0.5rem;
            background-color: transparent;
            border: none;

            svg {
                color: rgba(255, 255, 255, 0.5);
                width: 2rem;
                height: 2rem;
                transform: scaleX(-1);
            }

            :hover {
                cursor: pointer;
            }
        }

        .brand_section {
            position: absolute;
            width: 95%;
            height: 95%;
            top: 0.6rem;
            left: 0.5rem;
            padding-top: 2.5rem;

            ${BrandOptionsCSS}
            ul {
                justify-content: center;
                li {
                    width: 80px;
                    label {
                        font-size: 0.9rem;
                    }
                }
            }

            .brand_filter_controls {
                padding-bottom: 1.5rem !important;

                button {
                    :first-of-type {
                        display: none;
                    }
                }
            }
        }

        .color_section {
            position: absolute;
            width: 95%;
            height: 95%;
            top: 0.6rem;
            left: 0.5rem;
            padding-top: 2.5rem;
            ${ColorOptionsCSS}
            button {
                margin-bottom: 1rem !important;
            }

            ul {
                justify-content: center;

                li {
                    margin-right: 0.7rem !important;
                }
            }
        }

        .price_section {
            position: absolute;
            width: 95%;
            height: 95%;
            top: 0.6rem;
            left: 0.5rem;
            display: grid;
            place-content: center;

            .user_inputs {
                ${PriceInputCSS}
                flex-direction: column !important;
                input {
                    margin-left: 0.9rem;
                    :last-of-type {
                        margin-top: 0.5rem;
                    }
                }
            }
        }

        .main_section {
            position: absolute;
            top: 0.7rem;
            left: 0.5rem;
            height: 95%;
            width: 95%;

            .title {
                margin: 0 0 0.5rem 0.4rem;
                color: rgba(255, 255, 255, 0.3);
                font-weight: 500;
            }

            .filter_title {
                margin-top: 1.2rem;
                display: none;
            }

            .price_filter,
            .color_filter,
            .brand_filter {
                display: none;
            }

            button {
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.1rem;
                padding: 0.65rem 0.45rem;
                background-color: transparent;
                border: none;
                color: rgba(255, 255, 255, 0.45);
                border-radius: 0.3rem;
                transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

                span {
                    font-size: 1rem;
                    font-weight: 600;
                }

                svg {
                    margin-top: -0.3rem;
                }

                :last-of-type {
                    margin-bottom: 0;
                }

                :hover {
                    background-color: rgba(245, 245, 245, 0.2);
                    cursor: pointer;
                }
            }
        }

        @media (max-width: 922px) {
            height: 356px;
            .main_section {
                .filter_title {
                    display: block;
                }

                .price_filter {
                    display: flex;
                }
            }
        }

        @media (max-width: 600px) {
            height: 402px;

            .main_section {
                .color_filter {
                    display: flex;
                }
            }
        }

        @media (max-width: 486px) {
            height: 446px;
            .main_section {
                .brand_filter {
                    display: flex;
                }
            }
        }
    }

    .brand_filter_controls {
        width: 100%;
        display: flex;
        justify-content: space-around;
        border-top: 2px solid rgba(255, 255, 255, 0.2);

        button {
            margin-top: 1rem;
            font-size: 1.05rem;
            width: 7.5rem;
            border-radius: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;

            :first-of-type {
                background-color: rgba(255, 255, 255, 0.1);

                :hover {
                    background-color: rgba(187, 187, 187, 1);
                }
            }
            :last-of-type {
                background-color: rgba(45, 129, 255, 0.7);
            }
        }
    }

    @media (max-width: 922px) {
        :nth-of-type(4) {
            display: none;
        }

        .last_filter_option {
            margin-top: -0.1rem;
            padding: 0.6rem;
            border-radius: 50%;

            svg {
                margin-right: 0;
            }

            span {
                display: none;
            }
        }
    }

    @media (max-width: 600px) {
        :nth-of-type(3) {
            display: none;
        }
    }

    @media (max-width: 486px) {
        :nth-of-type(2) {
            display: none;
        }
    }
`

export const RightFilters = styled.div`
    position: relative;

    .sorting_tag {
        position: absolute;
        font-size: 0.85rem;
        background: rgba(0, 0, 0, 1);
        white-space: nowrap;
        top: -0.38rem;
        letter-spacing: 0.5px;
        left: 1.6rem;
        opacity: 0.8;
        font-weight: 600;
    }

    @media (max-width: 922px) {
        .sorting_tag {
            display: none;
        }
    }
`

export const FilteringOptionDisplay = styled.div`
    user-select: none;
    padding: 0.55rem 1.4rem;
    border: 1.8px solid rgba(255, 255, 255, 0.2);
    border-radius: 1.3rem;
    display: flex;
    align-items: center;

    svg {
        width: 1.3rem;
        height: 1.3rem;
        margin-right: 0.5rem;
        margin-top: -0.15rem;
    }

    span {
        font-size: 1rem;
        opacity: 0.8;
        white-space: nowrap;
    }

    :hover {
        border-color: rgba(255, 255, 255, 0.35);
        cursor: pointer;
    }
`
