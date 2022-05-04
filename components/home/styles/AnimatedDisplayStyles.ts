import { motion } from 'framer-motion'
import styled from 'styled-components'

export const AnimatedDisplayWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    max-height: 896px;
    width: 100%;
    overflow: hidden;

    @media (max-width: 1024px) {
        margin-top: 4rem;
        flex-direction: column;
        justify-content: space-evenly;
    }

    @media (max-width: 586px) {
        margin-top: 2rem;
    }

    @media (max-width: 386px) {
        margint-top: 0;
        max-height: 756px;
        height: 756px;
    }

    @media (max-width: 346px) {
        max-height: 624px;
    }
`

export const AnimatedDisplayTitle = styled.div`
    max-width: 524px;
    height: 200px;

    h1 {
        font-size: 2.5rem;
        text-align: center;
        line-height: 3.1rem;
    }

    @media (max-width: 586px) {
        max-width: 386px;
        h1 {
            font-size: 2rem;
            line-height: 2.8rem;
        }
    }

    @media (max-width: 412px) {
        max-width: 336px;

        h1 {
            font-size: 1.8rem;
            line-height: 2.4rem;
        }
    }

    @media (max-width: 386px) {
        max-width: 286px;

        h1 {
            font-size: 1.55rem;
            line-height: 2.1rem;
        }
    }

    @media (max-width: 346px) {
        max-width: 246px;

        h1 {
            font-size: 1.35rem;
            line-height: 1.8rem;
        }
    }
`

export const AnimatedModelAssets = styled(motion.div)`
    height: 590px;
    width: 656px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    gap: 1rem 1.5rem; /* row-gap column gap */
    row-gap: 1rem;
    column-gap: 1.5rem;

    @media (max-width: 1286px) {
        overflow: hidden;
        width: 420px;
        height: 500px;
    }

    @media (max-width: 586px) {
        width: 330px;
        height: 404px;
    }

    @media (max-width: 472px) {
        width: 292px;
        height: 352px;
        gap: 0.5rem 0.5rem; /* row-gap column gap */
        row-gap: 0.5rem;
        column-gap: 0.5rem;
    }

    @media (max-width: 386px) {
        width: 256px;
        height: 328px;
    }

    @media (max-width: 346px) {
        width: 232px;
        height: 274px;
    }
`

export const BoxAsset = styled(motion.div)`
    width: 146px;
    min-width: 146px;
    height: 186px;
    position: relative;
    filter: brightness(0.5);

    @media (max-width: 1286px) {
        width: 124px;
        min-width: 124px;
        height: 156px;
    }

    @media (max-width: 586px) {
        width: 94px;
        min-width: 94px;
        height: 124px;
    }

    @media (max-width: 472px) {
        width: 92px;
        min-width: 92px;
        height: 112px;
    }

    @media (max-width: 386px) {
        width: 80px;
        min-width: 80px;
        height: 104px;
    }

    @media (max-width: 346px) {
        width: 72px;
        min-width: 72px;
        height: 86px;
    }
`
