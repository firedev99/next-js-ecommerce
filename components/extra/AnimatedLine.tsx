import { motion } from "framer-motion"
import { ReactElement } from "react"
import styled from "styled-components"

interface Props {
  className?: string
  delay: number
}

export const LineWrapper = styled(motion.div)`
  width: 100%;
  height: 2px;
  border-radius: 4px;
  background-color: rgba(170, 170, 170, 1);
`

export default function AnimatedLine({
  className,
  delay,
}: Props): ReactElement {
  return (
    <LineWrapper
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        ease: [0.6, 0.01, -0.05, 0.95],
        delay: delay,
        duration: 1,
      }}
      className={className}
    />
  )
}
