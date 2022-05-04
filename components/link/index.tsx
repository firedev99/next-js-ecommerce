import Link from "next/link"
import { CSSProperties } from "styled-components"
import { ReactElement } from "react"
import { LinkWrapper } from "./style"

type Props = {
  href?: string
  text: string
  style?: CSSProperties
}

export default function CustomLink({
  href = "/",
  text,
  style,
}: Props): ReactElement {
  return (
    <LinkWrapper style={style}>
      <Link href={href}>{text}</Link>
    </LinkWrapper>
  )
}
