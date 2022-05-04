import {
    useCallback,
    WheelEvent,
    TouchEvent,
    useState,
    RefObject,
    useEffect,
} from 'react'

export function useTouchSlider({
    ref,
    enableScrollY,
}: {
    ref: RefObject<HTMLDivElement>
    enableScrollY?: boolean
}) {
    const [isDragging, setIsDragging] = useState(false)
    const [originX, setOriginX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const touchStart = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
            if (!ref.current || isDragging) return
            ref.current.style.transition = 'none'
            const position = event.touches[0].clientX - ref.current.offsetLeft

            setIsDragging(true)
            setOriginX(position)
            setScrollLeft(ref.current.scrollLeft)
        },
        [ref, isDragging]
    )

    const touchMove = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
            if (!ref.current || !isDragging) return
            const position = event.touches[0].clientX - ref.current.offsetLeft
            const movedBy = position - originX
            ref.current.scrollLeft = scrollLeft - movedBy
        },
        [ref, isDragging, originX, scrollLeft]
    )

    const touchEnd = useCallback(() => {
        if (!ref.current) return
        setIsDragging(false)
        setScrollLeft(ref.current.scrollLeft)
    }, [ref])

    const mouseWheel = useCallback(
        (event: WheelEvent<HTMLDivElement>) => {
            if (!ref.current) return
            ref.current.style.transition = 'none'
            const delta = Math.sign(event.deltaX)
            ref.current.scrollLeft += delta * 12
            setScrollLeft(ref.current.scrollLeft)
        },
        [ref]
    )

    const nonPassiveWheelEvent = useCallback(
        (event: globalThis.WheelEvent) => {
            if (!ref.current) return
            ref.current.style.transition = 'none'
            event.preventDefault()
            const delta = Math.sign(event.deltaX || -event.deltaY)
            ref.current.scrollLeft += delta * 12
            setScrollLeft(ref.current.scrollLeft)
        },
        [ref]
    )

    useEffect(() => {
        let containerRef = ref.current
        if (!containerRef || !enableScrollY) return

        containerRef.addEventListener('wheel', nonPassiveWheelEvent, {
            passive: false,
        })

        return () => {
            containerRef?.removeEventListener('wheel', nonPassiveWheelEvent)
        }
    }, [ref, enableScrollY, nonPassiveWheelEvent])

    return {
        touchStart,
        touchMove,
        touchEnd,
        mouseWheel,
    }
}
