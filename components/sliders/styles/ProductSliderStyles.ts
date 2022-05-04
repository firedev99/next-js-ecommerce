import styled from 'styled-components'
import { motion } from 'framer-motion'

export const MainProductImage = styled(motion.div)`
    position: absolute;
    height: 100%;
    width: 100%;

    .image_wrapper {
        position: relative !important;
        height: inherit;
        width: inherit;
    }

    :hover {
        cursor: zoom-in;
    }

    @media (max-width: 1024px) {
        :hover {
            cursor: pointer;
        }
    }
`
