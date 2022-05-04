import { ReactElement } from "react"
import data from "../../dummy/menuData"
import { AnimatePresence, motion, Variants } from "framer-motion"
import LinkItem from "./LinkItem"
import { FancyBackground, MenuWrapper } from "./styles"

interface Props {
  open: boolean
}

const menuLinkVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1.5,
    },
  },
}

export default function NavMenu({ open }: Props): ReactElement {
  function checkRole() {
    // reminder - change this below two constants while copying for a production project - also the link urls
    const isAuthenticated = true
    const isAdmin = true

    if (isAuthenticated) {
      if (isAdmin) {
        return data
      }
      return data.filter((_, idx) => idx !== 5)
    } else {
      return data.slice(0, 4)
    }
  }

  return (
    <AnimatePresence
      onExitComplete={() => (document.body.style.overflow = "auto")}
    >
      {open && (
        <>
          <MenuWrapper
            initial={{ visibility: "hidden" }}
            animate={{
              visibility: "visible",
              transition: { delay: 1 },
            }}
            onAnimationStart={() => (document.body.style.overflow = "hidden")}
            exit={{
              visibility: "hidden",
              transition: { delay: 1 },
            }}
          >
            <motion.ul
              variants={menuLinkVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {checkRole().map(({ name, src, href }, idx) => (
                <LinkItem
                  key={`fancy-nav-item@${idx}`}
                  name={name}
                  imageSrc={src}
                  index={idx}
                  length={checkRole.length}
                  href={href}
                />
              ))}
            </motion.ul>
          </MenuWrapper>
          <FancyBackground
            initial={{ height: "0%" }}
            animate={{
              height: ["0%", "100%", "0%"],
              top: 0,
            }}
            exit={{
              height: ["0%", "100%", "0%"],
              top: 0,
            }}
            transition={{
              ease: [0.56, -0.05, 0.01, 0.88],
              duration: 2,
              times: [0, 0.5, 1],
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
