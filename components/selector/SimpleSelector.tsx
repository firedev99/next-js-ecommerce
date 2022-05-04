import { ChangeEvent, ReactElement } from 'react'
import { CSSProperties } from 'styled-components'
import Logo from '../../app/services/logo'
import { SimpleSelectorWrapper } from './styles'

interface SimpleSelectorProps {
    id: string
    options: string[] | number[]
    label?: string
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    style?: CSSProperties
}

export default function SimpleSelector({
    id,
    options,
    label,
    onChange,
    style,
}: SimpleSelectorProps): ReactElement {
    return (
        <SimpleSelectorWrapper style={style}>
            <label htmlFor={id}>{label}</label>
            <select id={id} onChange={onChange}>
                {options &&
                    options.map((value, index) => (
                        <option key={`${id}-option-${index}`} value={value}>
                            {value}
                        </option>
                    ))}
            </select>
            <div className='select_icon'>
                <Logo name='chevron-down' />
            </div>
        </SimpleSelectorWrapper>
    )
}

SimpleSelector.defaultProps = {
    id: 'agunbhai',
    options: [],
    label: 'agunbhai',
    onChange: () => {},
}
