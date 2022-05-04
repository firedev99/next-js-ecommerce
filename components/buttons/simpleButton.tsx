import React, { MouseEventHandler, ReactElement } from 'react'
import { CSSProperties } from 'styled-components'
import { SimpleButtonWrapper } from './styles'

interface Props {
    text: string
    style?: CSSProperties
    type: 'button' | 'reset' | 'submit'
    disable?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    noTap?: boolean
    className?: string
}

export default function SimpleButton({
    text,
    style,
    type,
    disable,
    onClick,
    noTap,
    className,
}: Props): ReactElement {
    return (
        <SimpleButtonWrapper
            type={type}
            whileTap={{ scale: noTap ? 1 : 0.97 }}
            style={style && style}
            disabled={disable && disable}
            onClick={onClick}
            className={className}
        >
            {text}
        </SimpleButtonWrapper>
    )
}

SimpleButton.defaultProps = {
    text: 'agunbhai',
    type: 'button',
}
