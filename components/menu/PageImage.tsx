import { ReactElement } from 'react'
import { ImageWrapper, StyledImage } from './styles'

interface Props {
    url: string
    opacity: number
    scale: number
    rotation: number
    parallaxCordinates: {
        x: number
        y: number
    }
}

export default function PageImage({
    url,
    opacity,
    rotation,
    scale,
    parallaxCordinates,
}: Props): ReactElement {
    return (
        <ImageWrapper
            style={{
                opacity,
                transform: `translate3d(${parallaxCordinates.x}px, ${parallaxCordinates.y}px, 0px) rotate(${rotation}deg) scale(${scale})`,
            }}
        >
            <StyledImage
                src={url}
                alt='@unsplash'
                layout='responsive'
                width={100}
                height={142}
                quality={100}
                objectFit='cover'
            />
        </ImageWrapper>
    )
}
