import { ReactNode, useEffect, useRef } from 'react'
import styled, { CSSProperties, keyframes } from 'styled-components'

const rippleAnimation = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1.1);
    opacity: 0;
  }
`

const Button = styled.button`
    border: none;
    position: relative;
    overflow: hidden;
    background-color: transparent;
    .ripple {
        position: absolute;
        z-index: 2;
        border-radius: 50%;
        background-color: rgba(24, 24, 24, 0.2);
        animation: ${rippleAnimation} 1.1s forwards;
    }

    :hover {
        cursor: pointer;
    }
`

interface IClientRect {
    width: number
    height: number
    left: number
    top: number
}

export default function RippleEffect({
    children,
    style,
}: {
    children: ReactNode
    style: CSSProperties
}) {
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        let mounted: boolean = true
        const containerRef = button.current
        containerRef?.addEventListener('click', (event) => {
            const wrapper: IClientRect = containerRef
                ? containerRef.getBoundingClientRect()
                : {
                      width: 0,
                      height: 0,
                      left: 0,
                      top: 0,
                  }

            const ripple = document.createElement('div')
            const width = Math.max(wrapper.width, wrapper.height) * 2
            ripple.style.width = width + 'px'
            ripple.style.height = width + 'px'
            ripple.style.left = event.clientX - wrapper.left - width / 2 + 'px'
            ripple.style.top = event.clientY - wrapper.top - width / 2 + 'px'
            ripple.className = 'ripple'
            containerRef.appendChild(ripple)

            setTimeout(() => mounted && containerRef.removeChild(ripple), 1000)
        })

        return () => {
            mounted = false
        }
    }, [])

    return (
        <Button ref={button} style={style}>
            {children}
        </Button>
    )
}
