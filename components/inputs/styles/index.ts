import styled from 'styled-components'

export const InputWrapper = styled.div`
    width: 100%;
    height: 42px;
    margin: 14px 0;
`

export const Label = styled.label`
    position: relative;
    letter-spacing: 0.2px;

    span {
        position: absolute;
        top: 0;
        left: 4px;
        transform-origin: 0 0;
        transform: translate3d(0, 0, 0);
        transition: all 0.2s ease;
        font-size: 19px;
        pointer-events: none;
        font-weight: 600;
    }
`
export const IconWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 10px;

    :hover {
        cursor: pointer;
    }
`

export const SimpleInput = styled.input`
    width: 100%;
    height: 100%;
    transition: all 0.15s ease;
    background-color: transparent;
    border: none;
    color: rgba(170, 170, 170, 1);
    font-family: 'Poppins';
    letter-spacing: 0.2px;
    font-size: 17.5px;
    box-shadow: inset 0 -2px 0 rgba(37, 37, 37, 1);
    padding-left: 3.4px;
    :focus {
        outline: none;
        box-shadow: inset 0 -2px 0 rgba(170, 170, 170, 1);
    }
    :focus ~ span {
        transform: translate3d(0, -24px, 0) scale(0.82);
    }

    :not(:placeholder-shown) ~ span {
        transform: translate3d(0, -24px, 0) scale(0.82);
    }

    /* preventing autofill default behaviour  */
    :-webkit-autofill {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: rgba(170, 170, 170, 1);
    }
`

export const RangeInputWrapper = styled.div`
    display: flex;
    input {
        width: 186px;
    }
`

export const CheckBoxWrapper = styled.label`
    display: flex;
    margin-right: 0.5rem;
    user-select: none;

    input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;

        :checked {
            ~ .checkbox_tick {
                svg {
                    transform: scale(1);
                }
            }
        }
    }

    .checkbox_tick {
        width: 1.4rem;
        height: 1.4rem;
        display: grid;
        place-items: center;
        border-radius: 3px;
        border: 1px solid rgba(170, 170, 170, 1);
        margin-right: 0.5rem;
        svg {
            width: 1.3rem;
            height: 1.3rem;
            transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: scale(0);
        }
    }

    :hover {
        cursor: pointer;
    }
`
