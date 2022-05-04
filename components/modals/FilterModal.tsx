import { AnimatePresence } from "framer-motion"
import { ReactNode } from "react"
import { FilterModalWrapper } from "./styles"

type FilterModalTypes = {
  children: ReactNode
  opened: boolean
  className?: string
  direction: "left" | "right"
}

export default function FilterModal({
  children,
  opened,
  className,
  direction,
}: FilterModalTypes) {
  return (
    <AnimatePresence>
      {opened && (
        <FilterModalWrapper
          direction={direction}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.6, 0.01, -0.05, 0.95],
          }}
        >
          {children}
        </FilterModalWrapper>
      )}
    </AnimatePresence>
  )
}
