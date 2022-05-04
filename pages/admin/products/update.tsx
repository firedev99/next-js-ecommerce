import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
    AnimatedAccordion,
    AnimatedColorOptions,
    AnimatedProductTitle,
    AnimatedSizeOptions,
    MainLayout,
    NumberCounter,
    Ratings,
    SingleSwiper,
} from '../../../components'
import {
    ProductAssetProps,
    ProductProps,
} from '../../../typings/interfaces/mains'
import { useAppDispatch } from '../../../app/hooks/redux'
import { fetchProductByID } from '../../../app/redux/slices/generalProductSlice'
import {
    ProductColorOptionsWrapper,
    ProductDescriptionWrapper,
    ProductDetailsWrapper,
    ProductFeaturesWrapper,
    ProductInformationsWrapper,
    ProductMainDisplay,
    ProductSliderWrapper,
    ProductPageWrapper,
    ProductPriceWColorWrapper,
    ProductSizesWrapper,
    ProductTitleWrapper,
    ProductSliderButton,
    SliderPreviewWrapper,
    SliderPreview,
    PreviewChecker,
    ProductRatingWrapper,
} from '../../../styles/pages/ProductTempStyles'
import Logo from '../../../app/services/logo'

function ProductUpdatePage(): ReactElement {
    const router = useRouter()
    const { id } = router.query

    const dispatch = useAppDispatch()

    const [productDetails, setProductDetails] = useState<ProductProps | null>(
        null
    )
    const [productAssets, setProductAssets] = useState<ProductAssetProps[]>([])
    const [productSizes, setProductSizes] = useState<string[]>([])

    // carousel props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [paginate, setPaginate] = useState(false)

    // update props
    const [rating, setRating] = useState(0)

    // fetch specific product details and store it
    useEffect(() => {
        ;(async function fetchProductDetails() {
            if (id) {
                const response = await dispatch(
                    fetchProductByID(id as string)
                ).unwrap()

                response.success && setProductDetails(response.data)
            }
        })()
    }, [dispatch, id])

    // store all details related to the product
    useEffect(() => {
        if (productDetails) {
            productDetails.sizes && setProductSizes(productDetails.sizes)

            const assets = [] as ProductAssetProps[] //empty array
            // mainImage
            assets.push({ imageSrc: productDetails.imageSrc })
            // sideImages
            productDetails.sideImagesSrc &&
                productDetails.sideImagesSrc.forEach((src) =>
                    assets.push({ imageSrc: src })
                )
            // imagesWColorOptions
            productDetails.colors &&
                productDetails.colors.forEach((options) =>
                    assets.push({
                        color: options.colorName,
                        imageSrc: options.imageSrc,
                    })
                )

            setProductAssets(assets)
        }
    }, [productDetails])

    if (!productDetails || productAssets.length === 0) return <h1>Loading</h1>

    return (
        <ProductPageWrapper>
            <ProductMainDisplay>
                <ProductDetailsWrapper>
                    <ProductSliderWrapper>
                        <ProductSliderWrapper>
                            <SingleSwiper
                                assets={productAssets}
                                className='product_slider_wrapper'
                                currentIndex={currentIndex}
                                setCurrentIndex={setCurrentIndex}
                                paginate={paginate}
                                setPaginate={setPaginate}
                            />
                        </ProductSliderWrapper>
                        {currentIndex !== 0 && (
                            <ProductSliderButton
                                onClick={() => {
                                    setCurrentIndex(currentIndex - 1)
                                    if (!paginate) setPaginate(true)
                                }}
                            >
                                <Logo name='chevron-right' />
                            </ProductSliderButton>
                        )}
                        {currentIndex !== productAssets.length - 1 && (
                            <ProductSliderButton
                                next
                                onClick={() => {
                                    setCurrentIndex(currentIndex + 1)
                                    if (!paginate) setPaginate(true)
                                }}
                            >
                                <Logo name='chevron-right' />
                            </ProductSliderButton>
                        )}
                        <PreviewChecker>
                            <NumberCounter value={currentIndex + 1} />
                            <span className='prop'>/</span>
                            <NumberCounter
                                className='asset_length'
                                value={productAssets.length}
                            />
                        </PreviewChecker>
                        <SliderPreviewWrapper>
                            {productAssets.map(
                                (asset, idx) =>
                                    !asset.color && (
                                        <SliderPreview
                                            key={`@swiper_preview_unsplash_${idx}`}
                                            active={idx === currentIndex}
                                            onClick={() => {
                                                setCurrentIndex(idx)
                                                if (!paginate) setPaginate(true)
                                            }}
                                        >
                                            <Image
                                                src={asset.imageSrc}
                                                alt={`@swiper_model_unsplash_${idx}`}
                                                layout='fill'
                                                objectFit='cover'
                                                objectPosition='0 0'
                                            />
                                        </SliderPreview>
                                    )
                            )}
                        </SliderPreviewWrapper>
                    </ProductSliderWrapper>
                    <ProductInformationsWrapper>
                        <AnimatedProductTitle
                            text={
                                productDetails.bigName
                                    ? productDetails.bigName
                                    : productDetails.name
                            }
                            className='big_product_title'
                        />
                        <ProductTitleWrapper>
                            <h3>{productDetails.name}</h3>
                        </ProductTitleWrapper>
                        <ProductSizesWrapper>
                            {productSizes.length !== 0 && (
                                <AnimatedSizeOptions
                                    rValue={(size) => console.log(size)}
                                    sizes={productSizes}
                                />
                            )}
                        </ProductSizesWrapper>
                        <ProductRatingWrapper>
                            <Ratings
                                style={{ marginLeft: '-0.2rem' }}
                                rValue={(value) => setRating(value + 1)}
                            />
                            <span>{productDetails.rating}, </span>
                            <span className='review'>
                                {productDetails.reviews?.length} REVIEWS
                            </span>
                        </ProductRatingWrapper>
                        <ProductPriceWColorWrapper
                            colors={productAssets.some((item) => item.color)}
                        >
                            <span className='product_price'>
                                {productDetails.price}$
                            </span>
                            <ProductColorOptionsWrapper>
                                {productAssets.some((item) => item.color) && (
                                    <AnimatedColorOptions
                                        productAssets={productAssets}
                                        condition={(idx) =>
                                            currentIndex === idx
                                        }
                                        doThis={(_, idx) => {
                                            setCurrentIndex(idx)
                                            if (!paginate) setPaginate(true)
                                        }}
                                    />
                                )}
                            </ProductColorOptionsWrapper>
                        </ProductPriceWColorWrapper>
                        <ProductDescriptionWrapper>
                            <span>Description</span>
                            <h4>{productDetails.description}</h4>
                        </ProductDescriptionWrapper>
                        <ProductFeaturesWrapper>
                            <AnimatedAccordion
                                title='Features'
                                className='product_features_admin'
                                open={true}
                            >
                                {productDetails.features?.map((item, idx) => (
                                    <li key={`product_feature_${idx}`}>
                                        {item}
                                    </li>
                                ))}
                            </AnimatedAccordion>
                        </ProductFeaturesWrapper>
                    </ProductInformationsWrapper>
                </ProductDetailsWrapper>
            </ProductMainDisplay>
        </ProductPageWrapper>
    )
}

ProductUpdatePage.Layout = MainLayout

export default ProductUpdatePage
