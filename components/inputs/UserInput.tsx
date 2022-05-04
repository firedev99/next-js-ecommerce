import { ChangeEvent, FocusEvent, ReactElement, useState } from 'react'
import Logo from '../../app/services/logo'
import camelize from '../../lib/camelCasing'
import { IconWrapper, InputWrapper, Label, SimpleInput } from './styles'

interface Props {
    type: 'text' | 'password'
    label: string
    name?: string
    value?: string | number
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}

export default function UserInput({
    type,
    label,
    value,
    name,
    onChange,
    onBlur,
}: Props): ReactElement {
    const [unlockPass, setUnlockPass] = useState(false)
    const camelName = camelize(label)
    // rename if the prop is passed with an exceptional name
    const _name = name ? name : camelName

    return (
        <InputWrapper>
            <Label htmlFor={_name} id={_name}>
                <SimpleInput
                    type={
                        type === 'password'
                            ? unlockPass
                                ? 'text'
                                : 'password'
                            : type
                    }
                    name={_name}
                    id={_name}
                    placeholder=' '
                    autoComplete='current-password'
                    spellCheck='false'
                    value={value && value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <span>{label}</span>
                {type === 'password' && (
                    <IconWrapper onClick={() => setUnlockPass(!unlockPass)}>
                        {unlockPass ? (
                            <Logo name='eye-open' />
                        ) : (
                            <Logo name='eye-close' />
                        )}
                    </IconWrapper>
                )}
            </Label>
        </InputWrapper>
    )
}

UserInput.defaultProps = {
    type: 'text',
    label: 'agunbhai',
}
