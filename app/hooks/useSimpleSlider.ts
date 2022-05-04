import {
  useCallback,
  MouseEvent,
  TouchEvent,
  useState,
  useEffect,
  RefObject,
} from "react"

export function useSimpleSlider<T>({
  assets,
  ref,
  auto,
  duration,
}: {
  assets: T[]
  ref: RefObject<HTMLDivElement>
  auto?: boolean
  duration?: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSwipping, setIsSwipping] = useState(false)
  const [originX, setOriginX] = useState(0)
  const [direction, setDirection] = useState<"forward" | "backward">()

  const dragStart = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!ref.current || isSwipping) return
      event.preventDefault()

      setIsSwipping(true)
      setOriginX(event.clientX)
    },
    [isSwipping, ref]
  )

  const dragEnd = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!ref.current || !isSwipping) return
      event.preventDefault()
      ref.current.style.transition = `all 0.6s ease-in-out`

      setIsSwipping(false)
      const currentX = event.clientX
      const clientWidth = ref.current.clientWidth

      const delta = Math.floor(((currentX - originX) / clientWidth) * 100)

      if (delta < -25) {
        setDirection("forward")
        if (currentIndex === assets.length - 1) {
          setCurrentIndex(0)
        } else {
          setCurrentIndex((prev) => prev + 1)
        }
      } else if (delta > 25) {
        setDirection("backward")
        if (currentIndex === 0) {
          setCurrentIndex(assets.length - 1)
        } else {
          setCurrentIndex((prev) => prev - 1)
        }
      }
    },
    [assets.length, ref, currentIndex, isSwipping, originX]
  )

  const touchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!ref.current || isSwipping) return

      const clientX = event.touches[0].clientX

      setIsSwipping(true)
      setOriginX(clientX)
    },
    [isSwipping, ref]
  )

  const touchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!ref.current || !isSwipping) return
      ref.current.style.transition = `all 0.6s ease-in-out`

      setIsSwipping(false)

      const currentX = event.changedTouches[0].clientX
      const clientWidth = ref.current.clientWidth

      const delta = Math.floor(((currentX - originX) / clientWidth) * 100)

      if (delta < -25) {
        setDirection("forward")
        if (currentIndex === assets.length - 1) {
          setCurrentIndex(0)
        } else {
          setCurrentIndex((prev) => prev + 1)
        }
      } else if (delta > 25) {
        setDirection("backward")
        if (currentIndex === 0) {
          setCurrentIndex(assets.length - 1)
        } else {
          setCurrentIndex((prev) => prev - 1)
        }
      }
    },
    [assets.length, ref, currentIndex, isSwipping, originX]
  )

  const paginateToNext = useCallback(() => {
    if (currentIndex === assets.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [assets.length, currentIndex])

  const paginateToPrev = useCallback(() => {
    if (currentIndex === 0) {
      setCurrentIndex(assets.length - 1)
    } else {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [assets.length, currentIndex])

  useEffect(() => {
    if (!auto) return
    if (!direction) setDirection("forward")

    const intervalID = setInterval(() => {
      if (currentIndex === assets.length - 1) {
        setCurrentIndex(0)
        if (direction === "backward") setDirection("forward")
      } else {
        setCurrentIndex((prev) => prev + 1)
        if (direction === "backward") setDirection("forward")
      }
    }, duration)

    return () => clearInterval(intervalID)
  }, [auto, direction, currentIndex, assets.length, duration])

  // useEffect(() => {
  //     let slider = ref.current
  //     if ( typeof window === 'undefined' || !slider) return

  //     slider.addEventListener('touchstart', touchStart, { passive: false })
  //     slider.addEventListener('touchend', touchEnd, { passive: false })
  //     slider.addEventListener('mousedown', dragStart, { passive: false })
  //     slider.addEventListener('mouseup', dragEnd, { passive: false })
  //     slider.addEventListener('mouseleave', dragEnd, { passive: false })

  //     return () => {
  //         slider?.removeEventListener('touchstart', touchStart)
  //         slider?.removeEventListener('touchend', touchEnd)
  //         slider?.removeEventListener('mousedown', dragStart)
  //         slider?.removeEventListener('mouseup', dragEnd)
  //         slider?.removeEventListener('mouseleave', dragEnd)
  //     }
  // }, [ref, touchStart, touchEnd, dragStart, dragEnd])

  return {
    currentIndex,
    direction,
    touchStart,
    touchEnd,
    dragStart,
    dragEnd,
    paginateToNext,
    paginateToPrev,
  }
}
