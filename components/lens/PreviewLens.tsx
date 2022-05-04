import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { DotLoader } from '..'

interface Props {
    loading: boolean
}

export const PreviewLensContainer = styled(motion.div)`
    width: 50vw;
    max-width: 768px;
    height: 100%;
    border: 2px solid red;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 30;

    @media (max-width: 916px) {
        display: none;
    }
`

export const LoaderWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 1);
`

const PreviewLens = forwardRef<HTMLDivElement, Props>(
    ({ loading }: Props, ref) => {
        return (
            <PreviewLensContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                ref={ref}
            >
                {loading && (
                    <LoaderWrapper>
                        <DotLoader />
                    </LoaderWrapper>
                )}
            </PreviewLensContainer>
        )
    }
)

PreviewLens.displayName = 'Preview Lens'

export default PreviewLens
