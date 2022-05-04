import { AnimateSharedLayout, motion } from 'framer-motion'
import { ReactElement, useState } from 'react'
import { AnimatedAccordion } from '..'
import { AnimatedSizeOptionsWrapper } from './styles'

interface Props {
	sizes: string[]
	rValue?: (item: string) => void
}

export default function AnimatedSizeOptions({
	sizes,
	rValue,
}: Props): ReactElement {
	const [selectedSize, setSelectedSize] = useState<string>(sizes[0])

	return (
		<AnimateSharedLayout>
			<AnimatedSizeOptionsWrapper>
				<span className='size_options_title'>Select Size</span>
				{sizes.length !== 0 && (
					<div className='size_options'>
						{sizes.slice(0, 4).map((size, idx) => (
							<div
								key={`product-size-${size}-${idx}`}
								onClick={() => {
									setSelectedSize(size)
									rValue && rValue(size)
								}}
								className='size_wrapper'
							>
								<span className='size_name'>{size}</span>
								{selectedSize === size && (
									<motion.span
										className='size_outline'
										layoutId='size_outline'
									/>
								)}
							</div>
						))}
					</div>
				)}
				{sizes.length > 4 && (
					<AnimatedAccordion
						title='more sizes'
						className='size_accordion'
						list={sizes.slice(4, sizes.length)}
						selected={selectedSize}
						onClick={(item) => {
							setSelectedSize(item)
							rValue && rValue(item)
						}}
					/>
				)}
			</AnimatedSizeOptionsWrapper>
		</AnimateSharedLayout>
	)
}
