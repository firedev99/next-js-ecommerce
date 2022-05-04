import styled, { CSSProperties } from 'styled-components'

export const TextWrapper = styled.div`
    font-family: 'PT Serif', serif;
    font-size: 56px;
    line-height: 98px;
    color: rgba(187, 187, 187, 1);

    @media (max-height: 486px) {
        max-width: 356px;
        font-size: 32px;
        line-height: 56px;
    }
`

export default function BigShopName({
    textTitle,
    style,
}: {
    textTitle: string
    style?: CSSProperties
}) {
    const singleTexts: string[] = textTitle.split('')

    return (
        <TextWrapper>
            <h1
                className={
                    singleTexts.length > 8 ? 'multiple_line' : 'single_line'
                }
                style={style}
            >
                {singleTexts.map((text) => text)}
            </h1>
        </TextWrapper>
    )
}

BigShopName.defaultProps = {
    textTitle: 'Rainbow. Ecommerce',
}
