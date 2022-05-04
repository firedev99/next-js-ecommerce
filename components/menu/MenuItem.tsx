import { useRef, useState } from 'react'
import { MenuData } from '../../dummy/menuData'
// redux
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import {
    trackPosition,
    transformCursor,
} from '../../app/redux/slices/cursorSlice'
// hooks
import { useWindowSize } from '../../app/hooks/useWindowSize'
// ui
import frameAnimation from '../../app/ui/frameAnimation'
import Logo from '../../app/services/logo'
// components
import PageImage from './PageImage'
import PageName from './PageName'
// styles
import { ExtraWrapper, ItemWrapper } from './styles'

interface Props {
    details: MenuData
    pageIndex: number
}

export default function MenuItem({ details, pageIndex }: Props) {
    const liRef = useRef<HTMLLIElement>(null)
    const [opacity, setOpacity] = useState(0)
    const [scale, setScale] = useState(0.8)
    const [rotation, setRotation] = useState(0)
    const [acitve, setActive] = useState(false)

    const dispatch = useAppDispatch()
    const { position } = useAppSelector((state) => state.cursor)
    const { width, height } = useWindowSize()

    // opacity effect
    function handleOpacity(
        initialOpacity: number,
        newOpacity: number,
        duration: number
    ) {
        frameAnimation({
            fromValue: initialOpacity,
            toValue: newOpacity,
            onUpdate: (opacity, callback) => {
                setOpacity(opacity)
                callback()
            },
            duration: duration,
            easeMethod: 'easeInOutCubic',
        })
    }

    // scale effect
    function handleScale(
        initialScale: number,
        newScale: number,
        duration: number
    ) {
        frameAnimation({
            fromValue: initialScale,
            toValue: newScale,
            onUpdate: (scale, callback) => {
                setScale(scale)
                callback()
            },
            duration: duration,
            easeMethod: 'easeInOutCubic',
        })
    }

    // rotation effect
    function handleRotation(currentRotation: number, duration: number) {
        // random number between -15 to 15
        const newRotation =
            Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1)

        frameAnimation({
            fromValue: currentRotation,
            toValue: newRotation,
            onUpdate: (rotation, callback) => {
                setRotation(rotation)
                callback()
            },
            duration: duration,
            easeMethod: 'easeInOutCubic',
        })
    }

    // track the cursor positions on hover
    function hoverEffect(event: globalThis.MouseEvent) {
        const speed: number = -5
        const x = (width - event.pageX * speed) / 100
        const y = (height - event.pageY * speed) / 100

        dispatch(trackPosition({ x, y }))
    }

    function handleMouseEnter() {
        if (!liRef.current) return

        dispatch(transformCursor('regular'))
        setActive(true)
        handleOpacity(0, 1, 500)
        handleScale(0.8, 1, 500)
        handleRotation(0, 500)

        liRef.current.addEventListener('mousemove', hoverEffect)
    }

    function handleMouseLeave() {
        if (!liRef.current) return

        liRef.current.removeEventListener('mousemove', hoverEffect)

        dispatch(transformCursor('small'))
        setActive(false)
        handleOpacity(1, 0, 800)
        handleScale(1, 0.8, 800)
        dispatch(trackPosition({ x: 0, y: -20 }))
    }

    return (
        <ItemWrapper ref={liRef}>
            <PageName
                title={details.name}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <PageImage
                url={details.src}
                opacity={opacity}
                rotation={rotation}
                scale={scale}
                parallaxCordinates={position}
            />
            <ExtraWrapper className={acitve ? 'active' : ''}>
                <p className='header'>
                    <span>
                        <Logo name='hash' />
                        {pageIndex > 9 ? `${pageIndex}` : `0${pageIndex}`}
                    </span>
                </p>

                {details.info.map((item) => (
                    <p key={item}>
                        <span>{item}</span>
                    </p>
                ))}
            </ExtraWrapper>
        </ItemWrapper>
    )
}
