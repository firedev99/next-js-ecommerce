import { ReactElement, MouseEvent, useState } from 'react'
import { CSSProperties } from 'styled-components'
import Logo from '../../app/services/logo'
import { RatingStarsWrapper, StarContainer } from './styles'

interface Props {
    style?: CSSProperties
    rValue?: (index: number) => void
    selectDisabled: boolean
    value?: number
    className?: string
}

export default function Ratings({
    style,
    selectDisabled,
    rValue,
    value,
    className,
}: Props): ReactElement {
    const [selectedStar, setSelectedStar] = useState(value || 3)

    function handleSelection(i: number) {
        return (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault()
            if (selectDisabled) return
            setSelectedStar(i)
            rValue && rValue(i)
        }
    }

    return (
        <RatingStarsWrapper style={style} className={className}>
            {[...Array(5)].map((_, i) => (
                <StarContainer
                    selected={i <= selectedStar}
                    key={`star-${i}`}
                    onClick={handleSelection(i)}
                >
                    <Logo name='star' />
                </StarContainer>
            ))}
        </RatingStarsWrapper>
    )
}

Ratings.defaultProps = {
    selectDisabled: false,
}
