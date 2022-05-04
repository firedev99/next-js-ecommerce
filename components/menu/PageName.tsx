import { ReactElement, MouseEvent } from 'react'
import { NameWrapper } from './styles'

interface Props {
    title: string
    onMouseEnter: (event: MouseEvent<HTMLDivElement>) => void
    onMouseLeave: (event: MouseEvent<HTMLDivElement>) => void
}

export default function PageName({
    title,
    onMouseEnter,
    onMouseLeave,
}: Props): ReactElement {
    return (
        <NameWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <h1>{title}</h1>
            <h1 className='text_clone'>{title}</h1>
        </NameWrapper>
    )
}
