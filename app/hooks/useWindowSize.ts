import { useState, useEffect } from 'react'
import { debounce } from 'lodash'

interface Sizes {
    height: number
    width: number
}

export function useWindowSize(value = 200) {
    const isAvailable = typeof window !== 'undefined'

    const [windowSize, setWindowSize] = useState<Sizes>({
        height: isAvailable ? window.innerHeight : 0,
        width: isAvailable ? window.innerWidth : 0,
    })

    useEffect(() => {
        if (typeof window === 'undefined') return

        function handleChange() {
            setWindowSize({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }

        const withDebounce = debounce(handleChange, value)

        window.addEventListener('resize', withDebounce)

        return () => window.removeEventListener('resize', withDebounce)
    }, [value])

    const { height, width } = windowSize

    return { height, width }
}
