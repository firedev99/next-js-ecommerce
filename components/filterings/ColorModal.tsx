import { ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import {
    applyColorFilter,
    closeModal,
    filterByColor,
} from '../../app/redux/slices/productFilteringSlice'
import SimpleButton from '../buttons/simpleButton'

function ColorModal(): ReactElement {
    const dispatch = useAppDispatch()
    const { colors, selectedColors, activeModal, products } = useAppSelector(
        (state) => state.product_filtering
    )

    function handleSelection(color: string) {
        dispatch(filterByColor(color))
    }
    function applyFilter() {
        if (!selectedColors.length) return
        dispatch(applyColorFilter())
        dispatch(closeModal(activeModal))
    }

    return (
        <>
            <ul>
                {colors.map((color, idx) => (
                    <li
                        key={`filtering_color_${idx}`}
                        onClick={() => handleSelection(color)}
                        style={{
                            border: selectedColors.includes(color)
                                ? `2px solid ${color}`
                                : `none`,
                        }}
                    >
                        <div
                            className='product_color'
                            style={{ backgroundColor: color }}
                        />
                    </li>
                ))}
            </ul>
            <div className='brand_filter_controls'>
                <SimpleButton text='APPLY' onClick={applyFilter} />
            </div>
        </>
    )
}

ColorModal.defaultProps = {
    opened: false,
    direction: 'left',
}

export default ColorModal
