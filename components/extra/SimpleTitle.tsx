import { ReactElement } from "react"
import { SimpleTitleWrapper } from "./styles"

export default function SimpleTitle({ text }: { text: string }): ReactElement {
  return (
    <SimpleTitleWrapper>
      <h3>{text}</h3>
    </SimpleTitleWrapper>
  )
}
