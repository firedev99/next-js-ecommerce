import styled from 'styled-components'
import { motion } from 'framer-motion'

export const PageWrapper = styled(motion.div)`
    height: 100vh;
    width: 100%;
    display: flex;
`

export const TitleContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`

export const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    /* background: green; */
    display: flex;
    align-items: center;
    justify-content: end;
`

export const FormInner = styled.div`
    width: 100%;
    height: auto;
    /* background: red; */
    display: flex;
    flex-direction: column;
`

export const FormExtra = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    h3 {
        align-self: flex-end;
        font-size: 36px;
        color: rgba(187, 187, 187, 1);
        font-family: 'Poppins', sans-serif;
        margin-bottom: 4px;
    }
`

export const LogoWrapper = styled.div`
    width: 136px;
    height: auto;
    align-self: flex-end;
    justify-content: space-between;
    display: flex;
    margin-bottom: 24px;
`

export const FormElements = styled.form`
    align-self: flex-end;
    height: 100%;
    width: 100%;
    max-width: 442px;
    /* background: yellow; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
`
