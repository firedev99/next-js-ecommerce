import { ChangeEvent, ReactElement } from 'react'
import Logo from '../../app/services/logo'
import { CheckBoxWrapper } from './styles'

interface CheckboxProps {
    label?: string
    checked: boolean
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    name?: string
    className?: string
}

export default function SimpleCheckbox({
    label,
    checked,
    onChange,
    name,
    className,
}: CheckboxProps): ReactElement {
    return (
        <CheckBoxWrapper htmlFor={name} className={className}>
            <input
                id={name}
                type='checkbox'
                name={name && name}
                checked={checked}
                onChange={onChange && onChange}
            />
            <div className='checkbox_tick'>
                <Logo name='tick' />
            </div>
            {label && label}
        </CheckBoxWrapper>
    )
}

SimpleCheckbox.defaultProps = {
    checked: true,
}
