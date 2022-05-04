import { AnimatePresence } from 'framer-motion'
import { ReactElement } from 'react'
import { CSSProperties } from 'styled-components'
import { ErrorWrapper } from './styles'

interface FormErrorProps {
    errors: {
        email?: string
        password?: string
        firstName?: string
        lastName?: string
    }
    style?: CSSProperties
    show?: boolean
}

export default function FormError({
    errors,
    style,
    show,
}: FormErrorProps): ReactElement {
    return (
        <AnimatePresence>
            {show && (
                <ErrorWrapper
                    style={style}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <span>{Object.values(errors)[0]}</span>
                </ErrorWrapper>
            )}
        </AnimatePresence>
    )
}
