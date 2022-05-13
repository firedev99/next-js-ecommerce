import { AnimatePresence, motion } from "framer-motion"
import { ReactElement } from "react"
import styled from "styled-components"
import { useScrollTT } from "../../app/hooks/useScrollTT"
import Logo from "../../app/services/logo"
import { ScrollControlButton } from "./styles"

export default function ScrollControl(): ReactElement {
  const { showButton, setScrollUp } = useScrollTT(80)

  return (
    <AnimatePresence>
      {showButton && (
        <ScrollControlButton>
          <motion.button
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            transition={{
              duration: 0.3,
              easings: [0.56, -0.05, 0.01, 0.88],
            }}
            onClick={() => setScrollUp(true)}
          >
            <Logo name="right-arrow" />
          </motion.button>
        </ScrollControlButton>
      )}
    </AnimatePresence>
  )
}
