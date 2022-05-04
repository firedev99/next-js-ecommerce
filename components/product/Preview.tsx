import { ReactElement, useState, MouseEvent } from 'react'
import Link from 'next/link'
import Logo from '../../app/services/logo'
import { ControlModal, Image, Ratings } from '..'
import { useAppDispatch } from '../../app/hooks/redux'
import { ProductProps } from '../../typings/interfaces/mains'
import { addToCart, saveToWishlist } from '../../app/redux/slices/featureSlice'
import { PreviewWrapper, ProductWrapper } from './styles/PreviewStyles'

type Props = {
	product: ProductProps
}

export default function Preview({ product }: Props): ReactElement {
	const [hover, setHover] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const dispatch = useAppDispatch()

	const {
		_id: id,
		name,
		imageSrc,
		price,
		vendorName,
		colors,
		hoveringImage,
		sideImagesSrc,
		rating,
	} = product

	const colorOptions = colors?.map((options) => options.colorName)
	const hoveringImg = hoveringImage
		? hoveringImage
		: sideImagesSrc
		? sideImagesSrc[0]
		: imageSrc

	// add to cart
	function handleCart(cartItem: ProductProps) {
		return (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault()
			dispatch(addToCart({ ...cartItem, quantity: 1 }))
			setOpenModal(false)
		}
	}

	// save to wishlist
	function handleWishlist(item: ProductProps) {
		return (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault()
			dispatch(saveToWishlist(item))
		}
	}

	return (
		<Link passHref href={{ pathname: '/products/item', query: { id } }}>
			<PreviewWrapper>
				<ProductWrapper
					onHoverStart={() => setHover(true)}
					onHoverEnd={() => setHover(false)}
				>
					<div className='preview_inner'>
						<Image
							alt={`random_model_fi_${id}`}
							layout='fill'
							imageSrc={hover ? hoveringImg : imageSrc}
							className='preview_image'
						/>
						<button onClick={handleWishlist(product)}>
							<Logo name='heart' />
						</button>
					</div>
					<div className='preview_meta'>
						<h3>{name}</h3>
						<h5>
							by, <span className='vendor_name'>{vendorName}</span>
						</h5>
						<span className='preview_price'>${price}</span>
						{colorOptions && colorOptions.length !== 0 && (
							<div className='preview_colors'>
								{colorOptions.map((color, idx) => (
									<div
										key={`product_${id}_color_${idx}`}
										className='color_option'
										style={{
											backgroundColor: color,
											left: `${idx * 16}px`,
											zIndex: idx * 2,
										}}
									/>
								))}
							</div>
						)}
						<div className='preview_controls'>
							<Ratings value={rating - 1} className='preview_ratings' />
							<ControlModal
								open={openModal}
								setOpen={setOpenModal}
								className='preview_modal'
								text='Buy Now'
							>
								<button className='navigator' onClick={handleCart(product)}>
									<Logo name='cart' />
									<span>Add to cart</span>
								</button>
								<button className='navigator'>
									<Logo name='right-arrow' />
									<span>See details</span>
								</button>
							</ControlModal>
						</div>
					</div>
				</ProductWrapper>
			</PreviewWrapper>
		</Link>
	)
}
