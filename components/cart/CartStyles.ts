import { motion } from 'framer-motion'
import styled from 'styled-components'

export const CartWrapper = styled(motion.aside)`
    width: 100%;
    position: fixed;
    z-index: 500;
    left: 0;
    top: 0;
    bottom: 0;

    .confirmation_modal {
        width: 80%;
        max-width: 486px;
        background-color: rgba(0, 0, 0, 0.4);
        color: rgba(255, 255, 255, 0.9);
        text-align: center;

        h3 {
            font-weight: 600;
            margin-bottom: 0.7rem;
            line-height: 1.3rem;
        }

        .control_btns {
            display: flex;
            justify-content: center;
            gap: 1.2rem;

            .remove_btn,
            .cancel_btn {
                padding: 0.55rem 1.4rem;
                border-radius: 0.5rem;
                font-family: 'Poppins', sans-serif;
                font-size: 1.1rem;
                border: none;
                color: rgba(255, 255, 255, 0.9);
                font-weight: 500;
                letter-spacing: 1px;

                :hover {
                    cursor: pointer;
                }
            }

            .remove_btn {
                background-color: rgba(39, 174, 96, 0.85);
            }

            .cancel_btn {
                background-color: rgba(192, 57, 43, 0.9);
            }
        }

        @media (max-width: 600px) {
            width: 90%;
            padding: 3.5rem 0.8rem;
            max-width: 320px;

            h3 {
                font-size: 1rem;
            }

            .control_btns {
                .remove_btn,
                .cancel_btn {
                    font-size: 1rem;
                }
            }
        }

        @media (max-width: 360px) {
            width: 94%;

            h3 {
                font-size: 0.9rem;
                font-weight: 600;
            }

            .control_btns {
                .remove_btn,
                .cancel_btn {
                    font-size: 0.9rem;
                    padding: 0.5rem 1.2rem;
                }
            }
        }
    }

    ul {
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        margin-left: auto;
        width: 686px;
        height: 100%;
        background-color: rgba(223, 230, 233, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        list-style-type: none;
        padding: 4rem 1.5rem 1.5rem 1.5rem;
        box-shadow: -2px 0 32px 4px rgba(0, 0, 0, 0.08);

        scrollbar-width: thin;
        scrollbar-color: rgba(109, 109, 109, 1);

        ::-webkit-scrollbar {
            display: none;
        }

        :hover {
            ::-webkit-scrollbar {
                display: block;
                width: 8px;
            }

            ::-webkit-scrollbar-track {
                border-radius: 2px;
                margin-top: 0.5px;
                margin-bottom: 1px;
            }

            ::-webkit-scrollbar-thumb {
                background-color: rgba(109, 109, 109, 1);
                border-radius: 2px;
            }
        }
        h3 {
            color: rgba(0, 0, 0, 0.8);
            max-width: 356px;
            font-size: 1.1rem;
            font-weight: 600;
            margin-right: auto;
        }

        .empty_cart {
            max-width: 420px;
            text-align: center;
            h2 {
                margin-bottom: 0.4rem;
                color: rgba(0, 0, 0, 0.75);
            }
        }

        .close_modal {
            position: absolute;
            right: 1.5rem;
            top: 1rem;
            border: none;
            background-color: transparent;

            svg {
                width: 1.8rem;
                height: 1.8rem;
                color: rgba(0, 0, 0, 0.9);
            }

            :hover {
                cursor: pointer;
            }
        }

        li {
            /* touch-action: pan-x !important; */
            position: relative;
            padding: 1rem;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            box-shadow: -2px 2px 10px 2px rgba(0, 0, 0, 0.07);
            border-radius: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            h3 {
                color: rgba(0, 0, 0, 0.75);
                font-size: 1rem;
            }

            .product_details {
                display: flex;
                align-items: center;

                .product_img {
                    width: 72px;
                    height: 86px;
                    position: relative;
                    margin-right: 0.6rem;

                    :after {
                        content: ' ';
                        position: absolute;
                        height: inherit;
                        width: inherit;
                        top: 0;
                        left: 0;
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                }

                .product_meta {
                    color: rgba(0, 0, 0, 0.9);
                    display: flex;
                    flex-direction: column;

                    .product_price {
                        display: none;
                    }

                    .selection_controls {
                        display: flex;
                        align-items: center;

                        button {
                            opacity: 0;
                            margin-left: 0.5rem;
                            margin-top: 0.05rem;
                            background-color: transparent;
                            border: none;
                            transition: all 0.3s ease-in-out;

                            svg {
                                width: 1.16rem;
                                height: 1.16rem;
                                color: rgba(45, 129, 255, 0.9);
                            }
                        }

                        :first-of-type {
                            margin-top: 0.5rem;
                            margin-bottom: -0.3rem;
                        }

                        :hover {
                            cursor: pointer;
                            button {
                                opacity: 1;
                            }
                        }
                    }

                    h4 {
                        font-size: 1rem;
                        width: 200px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    span {
                        color: rgba(0, 0, 0, 0.5);
                        font-weight: 600;
                        line-height: 1.1rem;
                        font-size: 0.9rem;
                    }
                }
            }

            .product_controls {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 108px;

                button {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 1px solid rgba(0, 0, 0, 0.5);
                    border-radius: 0.4rem;
                    background-color: rgba(223, 230, 233, 1);
                    font-family: 'Poppins', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    color: rgba(0, 0, 0, 0.8);

                    :hover {
                        cursor: pointer;
                    }

                    :disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                }

                .cart_quantity_counter_double {
                    margin-left: -1.8rem !important;
                    margin-top: 0.5rem;

                    .counter_number {
                        :nth-child(2) {
                            margin-left: 0.6rem;
                        }
                    }

                    span {
                        font-size: 1.5rem;
                        color: rgba(0, 0, 0, 0.6);
                    }
                }

                .cart_quantity_counter {
                    margin-left: -2.9rem !important;
                    margin-top: 0.5rem;

                    span {
                        font-size: 1.5rem;
                        color: rgba(0, 0, 0, 0.6);
                    }
                }
            }
        }

        .delete_product {
            border: none;
            border: none;
            background-color: transparent;
            margin-top: 0.1rem;
            transition: all 0.3s ease-in-out;
            border-radius: 50%;
            width: 40px;
            height: 40px;

            svg {
                color: rgba(0, 0, 0, 0.8);
                width: 1.4rem;
                height: 1.4rem;
            }

            :hover {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.2);
            }
        }

        @media (max-width: 776px) {
            width: 100%;
        }

        @media (max-width: 600px) {
            gap: 1.5rem;

            li {
                .product_details {
                    .product_meta {
                        .product_vendorname {
                            display: none;
                        }
                        .product_price {
                            display: block;
                        }
                    }
                }
                h3 {
                    display: none;
                }

                .delete_product {
                    position: absolute;
                    right: 0.8rem;
                    top: 0.6rem;
                }

                .product_controls {
                    width: 86px;
                    margin-top: auto;
                    margin-left: auto;

                    button {
                        width: 28px;
                        height: 28px;
                    }

                    .cart_quantity_counter,
                    .cart_quantity_counter_double {
                        height: 28px;
                        margin-top: 0.3rem;

                        span {
                            font-size: 1rem;
                        }
                    }

                    .cart_quantity_counter_double {
                        .counter_number {
                            :nth-child(2) {
                                margin-left: 1.15rem;
                            }
                            :nth-child(3) {
                                margin-right: 0.45rem;
                            }
                        }
                    }

                    .cart_quantity_counter {
                        margin-left: -3.3rem !important;
                    }
                }
            }
        }

        @media (max-width: 480px) {
            h3 {
                font-size: 1rem;
            }
            li {
                .product_details {
                    align-items: flex-start;
                    .product_meta {
                        span {
                            font-size: 0.8rem;
                            line-height: 1rem;
                        }

                        h4 {
                            font-weight: 500;
                            font-size: 0.95rem;
                            line-height: 1.1rem;
                        }

                        .selection_controls {
                            height: 20px;
                            :first-of-type {
                                margin-top: 0;
                            }
                        }
                    }

                    .product_img {
                        height: 100px;
                    }
                }

                .product_controls {
                    position: absolute;
                    bottom: 0.75rem;
                    left: 6.1rem;

                    button {
                        width: 26px;
                        height: 26px;
                    }

                    .cart_quantity_counter {
                        margin-top: 0.3rem;
                        margin-left: -3.35rem !important;
                    }
                }

                .delete_product {
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }

        @media (max-width: 380px) {
            h3 {
                font-size: 0.9rem;
                line-height: 1.1rem;
            }

            li {
                padding: 0.9rem 0.7rem;
                border-radius: 0.4rem;

                .product_details {
                    .product_meta {
                        span {
                            font-size: 0.75rem;
                            line-height: 1rem;
                        }

                        h4 {
                            font-size: 0.9rem;
                            line-height: 1rem;
                            max-width: 180px;
                        }

                        .selection_controls {
                            height: 20px;
                            :first-of-type {
                                margin-top: -0.2rem;
                            }
                        }
                    }

                    .product_img {
                        height: 92px;
                    }
                }

                .product_controls {
                    position: absolute;
                    bottom: 0.75rem;
                    left: 5.8rem;
                    width: 76px;

                    button {
                        width: 24px;
                        height: 24px;

                        span {
                            font-size: 0.9rem;
                        }
                    }

                    .cart_quantity_counter {
                        margin-top: 0.3rem;
                        margin-left: -3.35rem !important;
                    }
                }

                .delete_product {
                    width: 36px;
                    height: 36px;
                    svg {
                        width: 20px;
                        height: 20px;
                    }
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }

        @media (max-width: 346px) {
            h3 {
                font-size: 0.8rem;
                line-height: 1rem;
            }
            li {
                padding: 0.6rem 0.4rem;
                .product_details {
                    .product_img {
                        width: 56px;
                        height: 78px;
                        margin-right: 0.3rem;
                    }

                    .product_meta {
                        h4 {
                            font-size: 0.8rem;
                            line-height: 0.95rem;
                            max-width: 146px;
                        }

                        span {
                            font-size: 0.7rem;
                            line-height: 0.8rem;
                        }

                        .selection_controls {
                            height: 17px;
                            letter-spacing: -0.3px;
                        }
                    }
                }

                .product_controls {
                    left: 4.2rem;
                    bottom: 0.2rem;
                    width: 76px;
                    button {
                        width: 22px;
                        height: 22px;
                        font-size: 0.8rem;
                    }
                }

                .delete_product {
                    svg {
                        width: 1.35rem;
                        height: 1.35rem;
                    }
                }
            }
        }
    }
`
