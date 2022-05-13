import { ReactNode } from "react"
import RippleEffect from "../../app/ui/rippleEffect"
import { ButtonInner, ButtonWrapper } from "./styles"

interface Props {
  children: ReactNode
}

export default function AuthButton({ children }: Props) {
  return (
    <ButtonWrapper whileTap={{ scale: 0.97 }}>
      <RippleEffect style={{ width: 60, height: 60, borderRadius: "50%" }}>
        <ButtonInner>{children}</ButtonInner>
      </RippleEffect>
    </ButtonWrapper>
  )
}
