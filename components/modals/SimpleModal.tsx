import { AnimatePresence } from 'framer-motion'
import {
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useRef,
} from 'react'
import { CSSProperties } from 'styled-components'
import { useOnClickOutside } from '../../app/hooks/useOnClickOutside'
import Logo from '../../app/services/logo'
import {
    ModalCloseButton,
    SimpleModalInner,
    SimpleModalWrapper,
} from './styles'

interface SimpleModalProps {
    open: boolean
    children: ReactNode
    setOpen: Dispatch<SetStateAction<boolean>>
    style?: CSSProperties
    className?: string
}

export default function SimpleModal({
    open,
    children,
    setOpen,
    style,
    className,
}: SimpleModalProps): ReactElement {
    const modalRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(modalRef, () => setOpen(false))

    return (
        <AnimatePresence exitBeforeEnter>
            {open && (
                <SimpleModalWrapper>
                    <SimpleModalInner
                        style={style}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        ref={modalRef}
                        className={className}
                    >
                        <ModalCloseButton onClick={() => setOpen(false)}>
                            <Logo name='cross' />
                        </ModalCloseButton>
                        {children}
                    </SimpleModalInner>
                </SimpleModalWrapper>
            )}
        </AnimatePresence>
    )
}
