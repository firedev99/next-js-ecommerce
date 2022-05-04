import { ReactElement, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { LinkImage, LinkWrapper, MenuItem, PageName } from "./styles"

interface Props {
  name: string
  imageSrc: string
  index: number
  length: number
  href: string
}

const textOverflow: Variants = {
  initial: { y: 200 },
  animate: {
    y: 0,
    transition: {
      ease: [0.56, -0.05, 0.01, 0.88],
      duration: 0.6,
    },
  },
}

export default function LinkItem({
  name,
  imageSrc,
  index,
  length,
  href,
}: Props): ReactElement {
  const [hovered, setHovered] = useState(false)
  const linkRef = useRef<HTMLDivElement>(null)

  const [{ x, y }, setMousePosition] = useState<{
    x: number
    y: number
  }>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    let ref = linkRef.current
    if (!ref) return

    function handlePosition(event: globalThis.MouseEvent) {
      if (!ref) return
      let client = ref.getBoundingClientRect()
      let x = event.pageX - client.left
      let y = event.pageY - client.top

      setMousePosition({ x, y })
    }

    ref.addEventListener("mousemove", handlePosition)
    return () => {
      if (ref) ref.removeEventListener("mousemove", handlePosition)
    }
  }, [hovered])

  const rotation = Math.random() * 60 * (Math.round(Math.random()) ? 0.1 : 0.1)

  return (
    <MenuItem key={`nav_link_${index}`} length={length}>
      <LinkWrapper>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.8, delay: 1.3 },
          }}
        >
          0{index + 1}
        </motion.span>
        <Link href={href} passHref>
          <a href={href}>
            <PageName
              ref={linkRef}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
            >
              <motion.h1 variants={textOverflow}>{name}</motion.h1>
              <h1 className="text_clone">{name}</h1>
            </PageName>
          </a>
        </Link>

        <LinkImage
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{
            opacity: hovered ? 1 : 0,
            x: x,
            y: y,
            scale: hovered ? 1 : 0.75,
            rotate: rotation,
            transition: {
              ease: "linear",
            },
          }}
        >
          <div className="image_wrapper">
            <Image
              src={imageSrc}
              alt={`@unsplash_image_link_${index}`}
              layout="fill"
              objectFit="cover"
              quality="100"
            />
          </div>
        </LinkImage>
      </LinkWrapper>
    </MenuItem>
  )
}
