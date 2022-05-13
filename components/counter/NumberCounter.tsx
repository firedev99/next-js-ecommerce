import React, { ReactElement, useEffect, useState } from "react"
import { splitToDigit } from "../../lib/splitToDigit"
import {
  NumberContainer,
  NumberCounterWrapper,
} from "./styles/NumberCounterStyles"

type Props = {
  value: number
  className?: string
  numberClassName?: string
}

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
              transform: `translateY(-${numbers[numbers.length - 1] * 100}%)`,
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
