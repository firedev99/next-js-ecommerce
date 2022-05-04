import styled from 'styled-components'

export const NewProductPageWrapper = styled.form``

export const OptionLabel = styled.h3`
    margin: 1.4rem 0 0.6rem 0;
    font-size: 19px;
    font-weight: 700;
    :first-of-type {
        margin-bottom: 1rem;
    }
`

export const InputContainer = styled.div`
    max-width: 486px;
    margin: 1.5rem 0;
`

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 1.6rem 0 1.2rem 0;
    span {
        font-size: 19px;
        font-weight: 700;
        margin-right: 0.6rem;
    }
`

export const CategoryContainer = styled.div`
    max-width: 486px;
    select {
        width: 200px;
    }
`

export const RatingsWrapper = styled.div``

export const CustomSizeWrapper = styled.div`
    margin-top: 1.2rem;
    max-width: 320px;

    span {
        :hover {
            text-decoration: line-through;
        }
    }

    select {
        width: 164px;
    }

    input {
        max-width: 256px;
    }

    .size_input {
        display: flex;

        label {
            margin-left: -0.1rem;
        }

        button {
            background: transparent;
            border: none;
            color: rgba(170, 170, 170, 1);
            margin-top: 1rem;
            transition: transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
            svg {
                width: 2rem;
                height: 2rem;
            }

            :hover {
                cursor: pointer;
                transform: scale(1.03);
            }
        }
    }
`

export const CountWrapper = styled.div`
    margin: 0.2rem 0 2rem 0;
    max-width: 246px;
    select {
        min-width: 80px;
    }
`

export const FeaturesWrapper = styled.div`
    width: 512px;
    margin-top: 1rem;

    span {
        :hover {
            text-decoration: line-through;
        }
    }

    h3 {
        margin: 0 !important;
    }

    .features_input {
        display: flex;
        justify-content: space-between;

        input {
            max-width: 464px;
        }
        label {
            margin-left: -0.3rem;
        }

        button {
            background: transparent;
            border: none;
            color: rgba(170, 170, 170, 1);
            margin-top: 0.6rem;
            transition: transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
            svg {
                width: 2rem;
                height: 2rem;
            }

            :hover {
                cursor: pointer;
                transform: scale(1.03);
            }
        }
    }
`
