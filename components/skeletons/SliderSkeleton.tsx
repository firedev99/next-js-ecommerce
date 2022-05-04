import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

type Props = {}

export const SliderSkeletonWrapper = styled.div`
    width: 100%;
    height: 524px;
    position: relative;
    background-color: rgba(255, 255, 255, 0.07);
    overflow: hidden;
    border-radius: 0.5rem;
    margin-bottom: 1.2rem;

    .shimmer {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        transform: translate(0);

        .shimmer_inner {
            width: 20%;
            transform: skewX(-30deg);
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 24px 24px rgba(255, 255, 255, 0.09);
        }
    }
`

export default function SliderSkeleton({}: Props) {
    return (
        <SliderSkeletonWrapper>
            <motion.div
                className='shimmer'
                animate={{
                    x: ['-50%', '125%'],
                    transition: {
                        repeat: Infinity,
                        duration: 0.5,
                    },
                }}
            >
                <div className='shimmer_inner' />
            </motion.div>
        </SliderSkeletonWrapper>
    )
}
