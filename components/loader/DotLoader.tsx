import { ReactElement } from 'react'
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
    0%, 80%, 100% { 
        -webkit-transform: scale(0);
        transform: scale(0);
    } 
    40% { 
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .bounce {
        margin: 0 4px;
        width: 18px;
        height: 18px;
        background-color: #999999;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: ${bounce} 1.4s infinite ease-in-out both;
        animation: ${bounce} 1.4s infinite ease-in-out both;
    }
    .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }
    .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
`

export default function DotLoader(): ReactElement {
    return (
        <Container>
            <div className='bounce bounce1' />
            <div className='bounce bounce2' />
            <div className='bounce' />
        </Container>
    )
}
