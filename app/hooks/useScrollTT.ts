import { throttle } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useScrollTT(scrollLimit: number) {
    const [prevScrollTop, setPrevScrollTop] = useState(0)
    const [showButton, setShowButton] = useState(false)
    const [scrollUp, setScrollUp] = useState(false)
    const timerID = useRef<NodeJS.Timeout>()

    const handleScroll = useCallback(() => {
        const { scrollTop: currentScrollTop } =
            document.documentElement || document.body

        // set the prevScrollTop to the currentScrollTop
        setPrevScrollTop((prev) => {
            prev = currentScrollTop
            return prev
        })

        const scrollingUp = prevScrollTop > currentScrollTop
        const isMinimumScrolled = currentScrollTop > scrollLimit

        // show if it was scrolledUp and was minimumScrolled
        timerID.current = setTimeout(() => {
            setShowButton(isMinimumScrolled && scrollingUp)
        }, 400)
    }, [prevScrollTop, scrollLimit])

    const scrollWithThrottled = throttle(handleScroll)

    useEffect(() => {
        if (typeof document === 'undefined' || typeof window === 'undefined')
            return

        if (scrollUp) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
            setScrollUp(false)
        }

        window.addEventListener('scroll', scrollWithThrottled)

        return () => {
            window.removeEventListener('scroll', scrollWithThrottled)
        }
    }, [scrollWithThrottled, scrollUp])

    useEffect(() => {
        return () => timerID.current && clearTimeout(timerID.current)
    }, [])

    return { showButton, setScrollUp }
}
