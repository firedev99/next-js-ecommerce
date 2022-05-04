import { Variants } from "framer-motion"

export const mainSliderVariants: Variants = {
  animate: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
}

export const mainSliderTextVariants: Variants = {
  initial: {
    y: 300,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.5,
    },
  },
  animate: {
    y: 0,
    skewY: 2,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.5,
    },
  },
}

export const sliderImageVariants: Variants = {
  initital: {
    filter: `grayscale(1) brightness(0.8) opacity(0)`,
  },
  animate: {
    filter: [
      `grayscale(1) brightness(0.8) opacity(0)`,
      `grayscale(0) brightness(0.8) opacity(1)`,
      `grayscale(1) brightness(0.8) opacity(1)`,
      `grayscale(0) brightness(0.8) opacity(1)`,
    ],
    transition: {
      duration: 4,
    },
  },
}

export const opacityVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.5,
    },
  },
}
