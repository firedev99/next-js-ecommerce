import React, {
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useRef,
} from "react"
import { useOnClickOutside } from "../../app/hooks/useOnClickOutside"
import { AnimatePresence } from "framer-motion"
import { ILogo } from "../../app/services/logo"
import { ControlModalWrapper } from "./styles"

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  className?: string
  text?: string
  logo?: ILogo["name"]
}

export default function ControlModal({
  open,
  setOpen,
  children,
  className,
  text,
  logo,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(modalRef, () => setOpen(false))

  function openModal(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setOpen((prev) => !prev)
  }

  return (
    <div ref={modalRef}>
      {text && <button onClick={openModal}>{text}</button>}
      <AnimatePresence exitBeforeEnter>
        {open && (
          <ControlModalWrapper
            className={className}
            initial={{ scale: 0, transformOrigin: "bottom right" }}
            animate={{ scale: 1, transition: { duration: 0.1 } }}
            exit={{ scale: 0, transition: { duration: 0.1 } }}
          >
            {children}
          </ControlModalWrapper>
        )}
      </AnimatePresence>
    </div>
  )
}
