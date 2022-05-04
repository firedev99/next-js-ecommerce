import dynamic from 'next/dynamic'
import React, { MouseEvent, ReactElement, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../app/hooks/redux'
import { fetchFeaturingProducts } from '../app/redux/slices/generalProductSlice'
import { MainLayout, MultiSlider } from '../components'
import { randomBG } from '../lib/randomBG'
import { useSimpleSlider } from '../app/hooks/useSimpleSlider'
import { motion } from 'framer-motion'

interface Props {}

const Slider = dynamic(() => import('../components/sliders/MainSlider'), {
    ssr: false,
})

export const Wrapper = styled.div`
    padding-top: 5rem;
`

export const SliderWrapper = styled(motion.div)`
    width: 400px;
    height: 400px;
    background: whitesmoke;
    position: relative;
    cursor: grab;
`

export const SliderInner = styled(motion.div)`
    width: 90%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    overflow: hidden;

    .wrapper {
        width: 120px;
        height: 120px;
        background-color: rgba(0, 0, 0, 0.5);
        display: grid;
        place-items: center;
        border-radius: 4px;
        span {
            font-size: 4rem;
        }
    }
`

const data = [1, 2, 3, 4, 5] as number[]

function TestPage({}: Props): ReactElement {
    const dispatch = useAppDispatch()
    const { featuringProducts } = useAppSelector(
        (state) => state.general_product
    )
    const mainSliderRef = useRef<HTMLDivElement>(null)
    const nextBtnRef = useRef<HTMLButtonElement>(null)
    const {
        currentIndex,
        direction,
        touchStart,
        touchEnd,
        dragStart,
        dragEnd,
        paginateToPrev,
        paginateToNext,
    } = useSimpleSlider<number>({
        assets: data,
        ref: mainSliderRef,
        nextBtnRef: nextBtnRef,
        auto: true,
        duration: 4000,
    })

    const isActive = (idx: number) => currentIndex === idx

    useEffect(() => {
        if (featuringProducts.length === 0) {
            dispatch(fetchFeaturingProducts({}))
        }
    }, [dispatch, featuringProducts.length])

    if (featuringProducts.length === 0) return <div />

    return (
        <Wrapper>
            {/* <MultiSlider data={featuringProducts} /> */}
            {/* <Slider /> */}
            <SliderWrapper
                ref={mainSliderRef}
                onMouseDown={dragStart}
                onMouseUp={dragEnd}
                onMouseLeave={dragEnd}
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
                animate={{
                    background: `linear-gradient(${randomBG()})`,
                }}
            >
                {data.map((num, idx) => (
                    <SliderInner key={`slider_${idx}`}>
                        <motion.div
                            className='wrapper'
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: isActive(idx) ? 1 : 0,
                                x:
                                    isActive(idx) && direction
                                        ? direction === 'forward'
                                            ? [300, 0]
                                            : [-300, 0]
                                        : 0,
                            }}
                        >
                            <span>{num}</span>
                        </motion.div>
                    </SliderInner>
                ))}
                <button
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault()
                        paginateToNext()
                    }}
                >
                    NEXT
                </button>
            </SliderWrapper>
        </Wrapper>
    )
}

TestPage.Layout = MainLayout

export default TestPage
