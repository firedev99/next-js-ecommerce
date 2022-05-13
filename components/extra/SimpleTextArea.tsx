import React, { ChangeEvent, ReactElement } from "react"
import { TextAreaWrapper } from "./styles"

interface TextAreaProps {
  value: string
  rows: number
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
}

export default function SimpleTextArea({
  value,
  rows,
  onChange,
  placeholder,
}: TextAreaProps): ReactElement {
  return (
    <TextAreaWrapper>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange && onChange}
      />
    </TextAreaWrapper>
  )
}

SimpleTextArea.defaultProps = {
  value: "",
  rows: 5,
  placeholder: "Enter details here...",
}
