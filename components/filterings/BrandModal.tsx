import { ChangeEvent, ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import {
    filterByBrand,
    appyBrandFilter,
    resetSelectedBrands,
    closeModal,
} from '../../app/redux/slices/productFilteringSlice'
import Logo from '../../app/services/logo'
import SimpleButton from '../buttons/simpleButton'

export default function BrandModal(): ReactElement {
    const dispatch = useAppDispatch()
    const { brands, selectedBrands, activeModal } = useAppSelector(
        (state) => state.product_filtering
    )

    const smalify = (brand: string) =>
        brand.split(' ').join('-').toLowerCase() || brand.toLowerCase()

    function handleBrandSelection(event: ChangeEvent<HTMLInputElement>) {
        dispatch(filterByBrand(event.target.value))
    }

    function applyFilter() {
        if (!selectedBrands.length) return
        dispatch(appyBrandFilter())
        dispatch(closeModal(activeModal))
    }

    function resetFilter() {
        if (!selectedBrands.length) return
        dispatch(resetSelectedBrands())
    }

    return (
        <>
            <ul>
                {brands.map((item, idx) => (
                    <li key={`filtering_brand_${idx}`}>
                        <label htmlFor={`brand_name_${idx}`}>
                            <input
                                type='checkbox'
                                name={smalify(item)}
                                value={item}
                                id={`brand_name_${idx}`}
                                checked={
                                    !!selectedBrands.find(
                                        (brand) =>
                                            smalify(brand) === smalify(item)
                                    )
                                }
                                onChange={handleBrandSelection}
                            />
                            <div className='checkbox_tick'>
                                <Logo name='tick' />
                            </div>
                            {item}
                        </label>
                    </li>
                ))}
            </ul>
            <div className='brand_filter_controls'>
                <SimpleButton
                    text='CLEAR'
                    onClick={resetFilter}
                    disable={!selectedBrands.length}
                />
                <SimpleButton text='APPLY' onClick={applyFilter} />
            </div>
        </>
    )
}
