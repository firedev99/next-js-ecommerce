import styled from 'styled-components'

export const SimpleSelectorWrapper = styled.div`
    max-width: 356px;
    position: relative;
    label {
        font-size: 19px;
        font-weight: 700;
        margin-right: 0.6rem;
    }
    select {
        -webkit-appearance: none;
        appearance: none;
        background-color: rgba(0, 0, 0, 1);
        color: rgba(170, 170, 170, 1);
        font-size: 19px;
        font-family: 'Poppins', sans-serif;
        padding: 0.2rem 1rem;
        :focus {
            ~ .select_icon {
                svg {
                    transform: rotate(180deg);
                }
            }
        }

        ::-webkit-scrollbar {
            height: 12px;
            width: 13px;
        }
        /* Track */
        ::-webkit-scrollbar-track {
            padding: 1px;
            background: none;
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background: #5a5a5a;
            width: 12px;
        }
        /* On hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #b3b3b3;
        }
    }

    .select_icon {
        pointer-events: none;
        position: absolute;
        top: 6px;
        right: 8px;
        svg {
            transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
    }
`
