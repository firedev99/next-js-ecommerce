import { ReactElement, useEffect, useState } from "react"
import Image from "next/image"

interface Props {
  imageSrc: string
  alt?: string
  width?: string | number
  height?: string | number
  layout: "fixed" | "fill" | "intrinsic" | "responsive"
  className?: string
}

export default function CustomImage({
  imageSrc,
  alt,
  width,
  height,
  layout,
  className,
}: Props): ReactElement {
  const [blurData, setBlurData] = useState("")
  const modSrc = imageSrc.split("upload/").join("upload/e_blur:400/")

  useEffect(() => {
    // using AbortController for cleaning up the below async call
    let controller = new AbortController()
    ;(async function fetchBase64URL() {
      try {
        const response = await fetch(`${modSrc}`, {
          signal: controller.signal,
        })
        const buffer = await response.arrayBuffer()
        const bas64URL = Buffer.from(buffer).toString("base64")
        setBlurData(`data:image/png;base64,${bas64URL}`)
      } catch {
        return null
      }
    })()

    return () => controller.abort()
  }, [modSrc, blurData])

  if (!blurData) return <div />

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={layout === "responsive" ? width : undefined}
      height={layout === "responsive" ? height : undefined}
      layout={layout}
      className={className}
      objectFit="cover"
      // objectPosition="0 0"
      placeholder="blur"
      blurDataURL={blurData}
    />
  )
}

CustomImage.defaultProps = {
  width: "100%",
  height: "100%",
  layout: "responsive",
}
