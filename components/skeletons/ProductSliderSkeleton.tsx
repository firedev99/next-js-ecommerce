import { motion } from 'framer-motion'
import styled, { CSSProperties } from 'styled-components'

export const SliderSkeletonWrapper = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
`

export const SkeletonBox = styled(motion.div)`
    min-width: 212px;
    width: 212px;
    margin-right: 1.5rem;
    height: 212px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.07);
    position: relative;
    overflow: hidden;

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

    :last-of-type {
        margin-right: 0;
    }

    @media (max-width: 1256px) {
        min-width: 18.7%;
        width: 18.7%;
    }

    @media (max-width: 1128px) {
        min-width: 23.5%;
    }

    @media (max-width: 900px) {
        min-width: 31%;
    }

    @media (max-width: 700px) {
        min-width: 47%;
    }

    @media (max-width: 493px) {
        min-width: 91%;
    }
`

export default function ProductSliderSkeleton({
    style,
}: {
    style?: CSSProperties
}) {
    return (
        <SliderSkeletonWrapper style={style}>
            {[...Array(12)].map((_, idx) => (
                <SkeletonBox key={`product_slider_skeleton_box_${idx}`}>
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
                </SkeletonBox>
            ))}
        </SliderSkeletonWrapper>
    )
}
