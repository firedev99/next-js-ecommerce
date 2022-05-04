interface AnimateProps {
    fromValue: number
    toValue: number
    onUpdate: (value: number, cb: () => void) => void
    onComplete?: () => void
    duration: number
    easeMethod:
        | 'linear'
        | 'easeInQuad'
        | 'easeOutQuad'
        | 'easeInOutQuad'
        | 'easeInCubic'
        | 'easeOutCubic'
        | 'easeInOutCubic'
        | 'easeInQuart'
        | 'easeOutQuart'
        | 'easeInOutQuart'
        | 'easeInQuint'
        | 'easeOutQuint'
        | 'easeInOutQuint'
}

interface EasingMethods {
    linear: (t: number) => number
    easeInQuad: (t: number) => number
    easeOutQuad: (t: number) => number
    easeInOutQuad: (t: number) => number
    easeInCubic: (t: number) => number
    easeOutCubic: (t: number) => number
    easeInOutCubic: (t: number) => number
    easeInQuart: (t: number) => number
    easeOutQuart: (t: number) => number
    easeInOutQuart: (t: number) => number
    easeInQuint: (t: number) => number
    easeOutQuint: (t: number) => number
    easeInOutQuint: (t: number) => number
}

const easing = {
    // no easing, no acceleration
    linear: (t) => t,
    // accelerating from zero velocity
    easeInQuad: (t) => t * t,
    // decelerating to zero velocity
    easeOutQuad: (t) => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    // accelerating from zero velocity
    easeInCubic: (t) => t * t * t,
    // decelerating to zero velocity
    easeOutCubic: (t) => --t * t * t + 1,
    // acceleration until halfway, then deceleration
    easeInOutCubic: (t) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // accelerating from zero velocity
    easeInQuart: (t) => t * t * t * t,
    // decelerating to zero velocity
    easeOutQuart: (t) => 1 - --t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: (t) =>
        t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    // accelerating from zero velocity
    easeInQuint: (t) => t * t * t * t * t,
    // decelerating to zero velocity
    easeOutQuint: (t) => 1 + --t * t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuint: (t) =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
} as EasingMethods

// requestID = getValue
function getValue(
    start: number,
    end: number,
    elapsed: number,
    duration: number,
    easeMethod: string
) {
    if (elapsed > duration) return end

    return (
        start +
        (end - start) *
            easing[easeMethod as keyof EasingMethods](elapsed / duration)
    )
}

export default function frameAnimation({
    fromValue,
    toValue,
    onUpdate,
    onComplete,
    duration = 600,
    easeMethod = 'linear',
}: AnimateProps) {
    const startTime = performance.now()

    function animation() {
        // difference from the intial performance.now() start time
        const elapsed = performance.now() - startTime

        if (typeof window !== 'undefined') {
            let frameId: number = window.requestAnimationFrame(() => {
                return onUpdate(
                    getValue(fromValue, toValue, elapsed, duration, easeMethod),
                    elapsed <= duration
                        ? animation
                        : () => {
                              window.cancelAnimationFrame(frameId)
                              onComplete && onComplete()
                          }
                )
            })
        }
    }

    animation()
}
