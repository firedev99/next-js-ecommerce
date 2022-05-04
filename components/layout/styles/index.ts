import styled from 'styled-components'

export const DashboardLayoutContent = styled.div`
    width: calc(100% - 212px);
    min-height: 100vh;
    margin-left: auto;
    padding: 3.3rem 2rem 2rem 2rem;
`

export const MainLayoutContent = styled.div`
    min-height: 100vh;
    max-width: 1536px;
    margin: 0 auto;
    /* display: flex;
    align-items: center; */
    padding: 5rem 1.5rem 0 1.5rem;

    @media (max-width: 436px) {
        padding: 5rem 1rem 0 1rem;
    }

    @media (max-width: 300px) {
        padding: 5rem 0.5rem 0 0.5rem;
    }
`
