import { motion } from 'framer-motion'
import { ReactElement, useState } from 'react'
import { ProductAssetProps } from '../../typings/interfaces/mains'
import { AnimatedColorOptionsWrapper } from './styles'

interface Props {
    productAssets: ProductAssetProps[]
    condition?: (idx: number) => boolean
    doThis?: (item: string, idx: number) => void
}

export default function AnimatedColorOptions({
    productAssets,
    condition,
    doThis,
}: Props): ReactElement {
    const [selectedColor, setSelectedColor] = useState<string>()

    return (
        <AnimatedColorOptionsWrapper>
            <span className='color_option_title'>Select Color</span>
            <div className='color_options'>
                {productAssets.map(
                    (item, idx) =>
                        item.color && (
                            <div
                                key={`product-color-${item.color}-${idx}`}
                                onClick={() => {
                                    setSelectedColor(item.color)
                                    if (item.color) {
                                        doThis && doThis(item.color, idx)
                                    }
                                }}
                                className='color_wrapper'
                            >
                                <motion.div
                                    className='colored_container'
                                    style={{ backgroundColor: item.color }}
                                />
                                {(selectedColor === item.color ||
                                    (condition && condition(idx))) && (
                                    <motion.span
                                        className='color_outline'
                                        layoutId='color_outline'
                                        style={{ backgroundColor: item.color }}
                                    >
                                        <span className='blank_outline' />
                                    </motion.span>
                                )}
                            </div>
                        )
                )}
            </div>
        </AnimatedColorOptionsWrapper>
    )
}
