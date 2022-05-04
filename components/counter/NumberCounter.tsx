import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { splitToDigit } from '../../lib/splitToDigit'

type Props = {
    value: number
    className?: string
    numberClassName?: string
}

export const NumberCounterWrapper = styled.div`
    pointer-events: none;
    user-select: none;
    overflow: hidden;
    min-width: 64px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

export const NumberContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;

    :first-of-type {
        left: 0;
    }
    :last-of-type {
        right: 0;
    }

    span {
        font-size: 1.8rem;
        font-weight: 600;
        transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }
`

function NumberCounter({
    value,
    className,
    numberClassName,
}: Props): ReactElement {
    const [number, setNumber] = useState(value)
    const numbers = splitToDigit(number)

    useEffect(() => {
        setNumber(value)
    }, [value])

    return (
        <NumberCounterWrapper
            className={className}
            style={{ marginLeft: numbers.length > 1 ? `1.8rem` : 0 }}
        >
            <NumberContainer className={numberClassName}>
                {[...Array(10)].map((_, i) => (
                    <span
                        style={{
                            opacity: numbers.length < 3 ? `0` : `1`,
                            transform: `translateY(-${numbers[0] * 100}%)`,
                        }}
                        key={`counter_${i}_${value}`}
                    >
                        {i}
                    </span>
                ))}
            </NumberContainer>
            <NumberContainer className={numberClassName}>
                {[...Array(10)].map((_, i) => (
                    <span
                        style={{
                            opacity: numbers.length < 2 ? `0` : `1`,
                            transform:
                                numbers.length > 2
                                    ? `translateY(-${numbers[1] * 100}%)`
                                    : `translateY(-${numbers[0] * 100}%)`,
                        }}
                        key={`counter_${i}_${value}`}
                    >
                        {i}
                    </span>
                ))}
            </NumberContainer>
            <NumberContainer className={numberClassName}>
                {[...Array(10)].map((_, i) => (
                    <span
                        style={{
                            transform: `translateY(-${
                                numbers[numbers.length - 1] * 100
                            }%)`,
                        }}
                        key={`counter_${i}_${value}`}
                    >
                        {i}
                    </span>
                ))}
            </NumberContainer>
        </NumberCounterWrapper>
    )
}

NumberCounter.defaultProps = {
    value: 0,
}

export default NumberCounter
