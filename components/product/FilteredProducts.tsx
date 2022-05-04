import { Preview } from '..'
import { useAppSelector } from '../../app/hooks/redux'
import { AnimatePresence } from 'framer-motion'
import { FilterProductsWrapper } from './styles/FilteredProductStyles'

export default function FilteredProducts() {
	const { filteredProducts } = useAppSelector(
		(state) => state.product_filtering
	)

	return (
		<FilterProductsWrapper>
			{filteredProducts.length ? (
				filteredProducts.map((product) => (
					<Preview key={`product_${product._id}`} product={product} />
				))
			) : (
				<h1>No Products Found</h1>
			)}
		</FilterProductsWrapper>
	)
}
