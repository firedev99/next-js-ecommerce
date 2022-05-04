import { ReactElement } from 'react'
import { FilterModal } from '..'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import {
    closeModal,
    filterByCategory,
} from '../../app/redux/slices/productFilteringSlice'
import Logo from '../../app/services/logo'
import { fashionLogos, FashionLogoProp } from '../../dummy/dummyDB'
import random from '../../lib/random'

type Props = {
    opened: boolean
    direction: 'left' | 'right'
}

function CategoryModal({ opened, direction }: Props): ReactElement {
    const { categories, activeModal } = useAppSelector(
        (state) => state.product_filtering
    )
    const dispatch = useAppDispatch()

    function applyFilter(category: string) {
        dispatch(filterByCategory(category))
        dispatch(closeModal(activeModal))
    }

    return (
        <FilterModal
            opened={opened}
            direction={direction}
            className='category_filter_modal'
        >
            {categories.map((category) => (
                <button
                    key={`category-${category.toLowerCase()}`}
                    onClick={() => applyFilter(category)}
                >
                    <div className='display'>
                        <Logo
                            name={
                                random.generateRandomArray(
                                    fashionLogos
                                ) as FashionLogoProp
                            }
                        />
                        <span>{category}</span>
                    </div>
                </button>
            ))}
        </FilterModal>
    )
}

CategoryModal.defaultProps = {
    opened: false,
    direction: 'left',
}

export default CategoryModal
