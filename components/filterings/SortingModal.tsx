import { motion } from 'framer-motion'
import { ReactElement, useState, MouseEvent } from 'react'
import { FilterModal } from '..'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import {
    closeModal,
    setSubModal,
    sortByAlphabet,
    sortByPrice,
    sortByTime,
} from '../../app/redux/slices/productFilteringSlice'
import Logo from '../../app/services/logo'
import BrandModal from './BrandModal'
import ColorModal from './ColorModal'
import PriceModal from './PriceModal'

type Props = {
    opened: boolean
    direction: 'left' | 'right'
}

function SortingModal({ direction, opened }: Props): ReactElement {
    const [active, setActive] = useState(0)

    const dispatch = useAppDispatch()
    const { subModal } = useAppSelector((state) => state.product_filtering)

    function BackButton(): ReactElement {
        return (
            <button
                className='back_button'
                onClick={() => dispatch(setSubModal('main_section'))}
            >
                <Logo name='right-arrow' />
            </button>
        )
    }

    function applyPriceSorting(direction: 'ASC' | 'DESC') {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            setActive(direction === 'ASC' ? 2 : 3)
            dispatch(sortByPrice(direction === 'ASC' ? 'ASC' : 'DESC'))
            dispatch(closeModal(4))
        }
    }

    function applyAlphabetSorting(direction: 'ASC' | 'DESC') {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            setActive(direction === 'ASC' ? 4 : 5)
            dispatch(sortByAlphabet(direction === 'ASC' ? 'ASC' : 'DESC'))
            dispatch(closeModal(4))
        }
    }

    function applyTimeSorting() {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            setActive(1)
            dispatch(sortByTime())
            dispatch(closeModal(4))
        }
    }

    return (
        <FilterModal
            opened={opened}
            direction={direction}
            className='sorting_filter_modal'
        >
            {/* main_filters_ui */}
            {subModal === 'main_section' && (
                <motion.div
                    className='main_section'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h4 className='title'>Sort By</h4>
                    <button onClick={applyTimeSorting()}>
                        <span>Recently Added</span>
                        {active === 1 && <Logo name='tick' />}
                    </button>
                    <button onClick={applyPriceSorting('ASC')}>
                        <span>Price: Low to High</span>
                        {active === 2 && <Logo name='tick' />}
                    </button>
                    <button onClick={applyPriceSorting('DESC')}>
                        <span>Price: High to Low</span>
                        {active === 3 && <Logo name='tick' />}
                    </button>
                    <button onClick={applyAlphabetSorting('ASC')}>
                        <span>Character: A - Z</span>
                        {active === 4 && <Logo name='tick' />}
                    </button>
                    <button onClick={applyAlphabetSorting('DESC')}>
                        <span>Character: Z - A</span>
                        {active === 5 && <Logo name='tick' />}
                    </button>
                    <h4 className='title filter_title'>Filter By</h4>
                    <button
                        className='price_filter'
                        onClick={() => dispatch(setSubModal('price_section'))}
                    >
                        <span>Price</span>
                        <Logo name='right-arrow' />
                    </button>
                    <button
                        className='color_filter'
                        onClick={() => dispatch(setSubModal('color_section'))}
                    >
                        <span>Color</span>
                        <Logo name='right-arrow' />
                    </button>
                    <button
                        className='brand_filter'
                        onClick={() => dispatch(setSubModal('brand_section'))}
                    >
                        <span>Brand / Vendor</span>
                        <Logo name='right-arrow' />
                    </button>
                </motion.div>
            )}
            {/* price modal ui */}
            {subModal === 'price_section' && (
                <motion.div
                    className='price_section'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <BackButton />
                    <PriceModal />
                </motion.div>
            )}
            {/* color modal ui */}
            {subModal === 'color_section' && (
                <motion.div
                    className='color_section'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <BackButton />
                    <ColorModal />
                </motion.div>
            )}
            {subModal === 'brand_section' && (
                <motion.div className='brand_section'>
                    <BackButton />
                    <BrandModal />
                </motion.div>
            )}
        </FilterModal>
    )
}

SortingModal.defaultProps = {
    opened: false,
    direction: 'right',
}

export default SortingModal
