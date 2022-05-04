import { ReactElement, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import {
    closeModal,
    filterByPrice,
} from '../../app/redux/slices/productFilteringSlice'
import SimpleButton from '../buttons/simpleButton'

export default function PriceModal(): ReactElement {
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)

    const dispatch = useAppDispatch()
    const { activeModal } = useAppSelector((state) => state.product_filtering)

    function applyFilter() {
        if (isNaN(minPrice) || isNaN(maxPrice) || maxPrice === 0) return

        dispatch(filterByPrice({ min: minPrice, max: maxPrice }))
        setMinPrice(0)
        setMaxPrice(0)
        dispatch(closeModal(activeModal))
    }

    return (
        <>
            <div className='user_inputs'>
                <input
                    type='number'
                    placeholder='From'
                    min={0}
                    onChange={(event) =>
                        setMinPrice(event.target.valueAsNumber)
                    }
                />
                <input
                    type='number'
                    placeholder='To'
                    min={0}
                    onChange={(event) =>
                        setMaxPrice(event.target.valueAsNumber)
                    }
                />
            </div>
            <div className='brand_filter_controls'>
                <SimpleButton text='APPLY' onClick={applyFilter} />
            </div>
        </>
    )
}
