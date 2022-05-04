import { ReactElement, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../hooks/redux'

const CursorWrapper = styled.div`
    .regular {
        width: 8.2rem;
        height: 8.2rem;
    }

    .medium {
        width: 6rem;
        height: 6rem;
    }

    .small {
        width: 1.2rem;
        height: 1.2rem;
        border-width: 2px;
    }
`
const SecendoryCursor = styled.div`
    position: fixed;
    z-index: 100;
    overflow: hidden;
    border-radius: 50%;
    pointer-events: none;
    transform: translate3d(0, 0, 0);
    background: transparent;
    border: 3px solid rgba(255, 135, 202, 1);
    transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1),
        height 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    transform-origin: center;

    @media (max-width: 768px) {
        display: none;
    }
`

export default function CustomCursor(): ReactElement {
    const { size } = useAppSelector((state) => state.cursor)
    const secendoryCursor = useRef<HTMLDivElement>(null)
    const positionRef = useRef({
        mouseX: -80,
        mouseY: -80,
        destinationX: 0,
        destinationY: 0,
        distanceX: 0,
        distanceY: 0,
        key: -1,
    })

    useEffect(() => {
        function trackPosition(event: globalThis.MouseEvent) {
            const { clientX, clientY } = event

            const mouseX = clientX
            const mouseY = clientY

            if (secendoryCursor.current) {
                positionRef.current.mouseX =
                    mouseX - secendoryCursor.current.clientWidth / 2
                positionRef.current.mouseY =
                    mouseY - secendoryCursor.current.clientHeight / 2
            }
        }

        document.addEventListener('mousemove', trackPosition)

        return () => document.removeEventListener('mousemove', trackPosition)
    }, [])

    useEffect(() => {
        function followMouse() {
            positionRef.current.key = requestAnimationFrame(followMouse)
            const {
                mouseX,
                mouseY,
                destinationX,
                destinationY,
                distanceX,
                distanceY,
            } = positionRef.current
            if (!destinationX || !destinationY) {
                positionRef.current.destinationX = mouseX
                positionRef.current.destinationY = mouseY
            } else {
                positionRef.current.distanceX = (mouseX - destinationX) * 0.1
                positionRef.current.distanceY = (mouseY - destinationY) * 0.1
                if (
                    Math.abs(positionRef.current.distanceX) +
                        Math.abs(positionRef.current.distanceY) <
                    0.1
                ) {
                    positionRef.current.destinationX = mouseX
                    positionRef.current.destinationY = mouseY
                } else {
                    positionRef.current.destinationX += distanceX
                    positionRef.current.destinationY += distanceY
                }
            }

            if (secendoryCursor && secendoryCursor.current)
                secendoryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0px)`
        }

        followMouse()

        let ref = positionRef.current
        return () => cancelAnimationFrame(ref.key)
    }, [])

    return (
        <CursorWrapper>
            <SecendoryCursor className={size} ref={secendoryCursor} />
        </CursorWrapper>
    )
}
