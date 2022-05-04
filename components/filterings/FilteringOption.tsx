import { forwardRef, MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'

type FilteringOptionsProps = {
    onClick: MouseEventHandler<HTMLButtonElement>
    children?: ReactNode
    className?: string
}

export const FilteringOptionWrapper = styled.button`
    background-color: transparent;
    color: rgba(255, 255, 255, 0.7);
    border: none;
    position: relative;
`

const FilteringOption = forwardRef<HTMLButtonElement, FilteringOptionsProps>(
    ({ children, onClick, className }: FilteringOptionsProps, ref) => {
        return (
            <FilteringOptionWrapper
                ref={ref}
                onClick={onClick}
                className={className}
            >
                {children}
            </FilteringOptionWrapper>
        )
    }
)

FilteringOption.displayName = `Filtering Option`

export default FilteringOption
