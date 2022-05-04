import {
    ChangeEvent,
    Dispatch,
    ReactElement,
    SetStateAction,
    useRef,
} from 'react'
import { CSSProperties } from 'styled-components'
import { RangeInputWrapper } from './styles'

interface RangeProps {
    id: string
    value: number
    setValue: Dispatch<SetStateAction<number>>
    min?: number
    max?: number
    step?: number
    style?: CSSProperties
}

export default function SimpleRange({
    id,
    value,
    setValue,
    min = 0,
    max,
    step,
    style,
}: RangeProps): ReactElement {
    const rangeRef = useRef<HTMLInputElement>(null)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const _value = event.target.valueAsNumber
        setValue(_value)
    }

    return (
        <RangeInputWrapper>
            <input
                ref={rangeRef}
                type='range'
                id={id}
                defaultValue={value}
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                style={style}
            />
        </RangeInputWrapper>
    )
}
