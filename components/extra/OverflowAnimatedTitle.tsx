import { motion, Variants } from "framer-motion"
import React, { ReactElement } from "react"
import styled from "styled-components"

interface Props {
  text: string
  amount?: number | "all" | "some"
}

export const Title = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const overflowContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
  },
}

const overflowItemVariants: Variants = {
  initial: { y: 500 },
  animate: {
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  },
}

function OverflowAnimatedTitle({ text, amount }: Props): ReactElement {
  return (
    <Title
      variants={overflowContainerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: amount }}
    >
      <motion.h1 variants={overflowItemVariants}>{text}</motion.h1>
    </Title>
  )
}

OverflowAnimatedTitle.defaultProps = {
  text: "firedev99 is something you need to search for on the web.",
}

export default OverflowAnimatedTitle
