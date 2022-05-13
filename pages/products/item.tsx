import { ReactElement, useEffect, useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import {
  hideVariants,
  mediaItemVariant,
} from "../../app/variants/productPageVariants"

import { useAppDispatch, useAppSelector } from "../../app/hooks/redux"
import { fetchSpecificProductDetails } from "../../app/redux/slices/generalProductSlice"

import {
  AnimatedAccordion,
  AnimatedColorOptions,
  AnimatedLine,
  AnimatedProductTitle,
  AnimatedSizeOptions,
  CustomLink,
  Image,
  MainLayout,
  NumberCounter,
  ProductPageTransition,
  Ratings,
} from "../../components"
import { ProductAssetProps, ProductProps } from "../../typings/interfaces/mains"
import {
  ProductDetailsWrapper,
  ProductInformationsWrapper,
  ProductMainDisplay,
  ProductPageWrapper,
  ProductRatingWrapper,
  ProductSizesWrapper,
  ProductSliderWrapper,
  ProductTitleWrapper,
  ProductPriceWColorWrapper,
  ProductColorOptionsWrapper,
  ProductQuantityWrapper,
  ProductCartButton,
  ProductDescriptionWrapper,
  ProductFeaturesWrapper,
  RecommendationWrapper,
  ExtraMediaWrapper,
  ProductExtraDisplay,
} from "../../styles/pages/ProductTempStyles"
import { addQuantity, addToCart } from "../../app/redux/slices/featureSlice"
import { setNotification } from "../../app/redux/slices/notificationSlice"
import { uniqueID } from "../../lib/generateUniqueID"

const Slider = dynamic(() => import("../../components/sliders/SliderWLens"), {
  ssr: false,
})

const CategorySlider = dynamic(
  () => import("../../components/sliders/MultiSlider"),
  {
    ssr: false,
  }
)

const FeaturingSlider = dynamic(
  () => import("../../components/sliders/FeaturingSlider")
)

export default function SingleProductPage(): ReactElement {
  // router props
  const router = useRouter()
  const dynamicRoute = useRouter().asPath // so that all of the states changes to it's initial value on dynamic route change
  const { id } = router.query

  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.general_product)
  const { cart } = useAppSelector((state) => state.features)

  // loading props
  const [loadingTransition, setLoadingTransition] = useState(true)

  // products props
  const [productDetails, setProductDetails] = useState<ProductProps>()
  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductProps[]
  >([])
  const [productAssets, setProductAssets] = useState<ProductAssetProps[]>([])
  const [productSizes, setProductSizes] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)
  const [chosenSize, setChosenSize] = useState(productSizes[0])
  const [chosenColor, setChosenColor] = useState<string>()

  // single slider props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paginate, setPaginate] = useState(false)

  // handle purchase
  function handlePurchase() {
    if (!productDetails) return

    // check if the product already exists in the cart
    const exists = cart.find((item) => item._id === productDetails._id)
    if (exists) {
      return dispatch(addQuantity(productDetails._id))
    } else {
      // check if the user has chosen a desired size or not!
      if (!chosenSize) {
        return dispatch(
          setNotification({
            id: uniqueID(),
            message: "please add a desired size!",
          })
        )
      } else {
        dispatch(
          addToCart({
            ...productDetails,
            quantity,
            chosenSize,
            chosenColor,
          })
        )
      }
    }

    dispatch(
      setNotification({
        id: uniqueID(),
        message: `${productDetails.name.split(" ")[0]}${
          productDetails.name.split(" ").length === 1 ? "" : ".. "
        } added to cart!`,
      })
    )
  }

  // fetch specific product details and store it
  useEffect(() => {
    // start it with initial value for dynamic routing
    setCurrentIndex(0)
    setProductAssets([])

    if (id) {
      ;(async function fetchProductDetails() {
        const res = await dispatch(
          fetchSpecificProductDetails(id as string)
        ).unwrap()
        setLoadingTransition(true)
        setProductDetails(res.product)
        setRecommendedProducts(res.recommendedProducts)
      })()
    }
    // set dynamic route path as dependency so that all of the state changes into it's inital value
  }, [dispatch, id, dynamicRoute])

  // fetch all product assets
  useEffect(() => {
    if (productDetails) {
      productDetails.sizes && setProductSizes(productDetails.sizes)
      setProductAssets((prev) => [
        ...prev,
        { imageSrc: productDetails.imageSrc },
      ])
      // sideImages
      productDetails.sideImagesSrc &&
        productDetails.sideImagesSrc.forEach((src) =>
          setProductAssets((prev) => [...prev, { imageSrc: src }])
        )
      // imagesWColorOptions
      productDetails.colors &&
        productDetails.colors.forEach((options) =>
          setProductAssets((prev) => [
            ...prev,
            {
              color: options.colorName,
              imageSrc: options.imageSrc,
            },
          ])
        )
    }
  }, [productDetails])

  // render error screen
  if (status === "error") return <h1>Product Not Found!</h1>

  // render loading screen
  if (!loadingTransition && status === "loading") return <h1>Loading</h1>

  return (
    <>
      <ProductPageTransition
        loading={loadingTransition}
        setLoading={setLoadingTransition}
      />

      {!loadingTransition && productDetails && (
        <>
          <MainLayout>
            <ProductPageWrapper>
              <ProductMainDisplay>
                <ProductDetailsWrapper>
                  {/* Slider */}
                  <ProductSliderWrapper
                    variants={hideVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <Slider
                      productAssets={productAssets}
                      currentIndex={currentIndex}
                      setCurrentIndex={setCurrentIndex}
                      paginate={paginate}
                      setPaginate={setPaginate}
                    />
                  </ProductSliderWrapper>

                  <ProductInformationsWrapper>
                    {/* Animated Product Title */}
                    <AnimatedProductTitle
                      className="big_product_title"
                      text={
                        productDetails.bigName
                          ? productDetails.bigName
                          : productDetails.name
                      }
                    />

                    {/* Product Name */}
                    <ProductTitleWrapper
                      variants={hideVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <h3>{productDetails.name}</h3>
                    </ProductTitleWrapper>

                    {/* Product Size Options */}
                    <ProductSizesWrapper
                      variants={hideVariants}
                      initial="initial"
                      animate="animate"
                    >
                      {productSizes.length && (
                        <AnimatedSizeOptions
                          rValue={(size) => setChosenSize(size)}
                          sizes={productSizes}
                        />
                      )}
                    </ProductSizesWrapper>

                    {/* Product Rating Options */}
                    <ProductRatingWrapper
                      variants={hideVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Ratings
                        selectDisabled
                        style={{
                          marginLeft: "-0.2rem",
                        }}
                      />
                      <span>{productDetails.rating}, </span>
                      <span className="review">
                        {productDetails.reviews?.length} REVIEWS
                      </span>
                    </ProductRatingWrapper>

                    <ProductPriceWColorWrapper
                      variants={hideVariants}
                      initial="initial"
                      animate="animate"
                    >
                      {/* Product Price */}
                      <span className="product_price">
                        {productDetails.price}$
                      </span>

                      {/* Product Color Options */}
                      <ProductColorOptionsWrapper>
                        {productAssets.some((item) => item.color) && (
                          <AnimatedColorOptions
                            productAssets={productAssets}
                            condition={(idx) => currentIndex === idx}
                            doThis={(colorName, idx) => {
                              setCurrentIndex(idx)
                              if (!paginate) setPaginate(true)
                              setChosenColor(colorName)
                            }}
                          />
                        )}
                      </ProductColorOptionsWrapper>
                    </ProductPriceWColorWrapper>

                    {/* Cart Quantity Options */}
                    <ProductQuantityWrapper
                      variants={hideVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <AnimatedLine className="animated_line_1" delay={1.4} />
                      <div className="quantity_controls">
                        <motion.button
                          disabled={quantity === 0}
                          whileTap={{ scale: 0.96 }}
                          onClick={() =>
                            setQuantity((quantity) => quantity - 1)
                          }
                        >
                          -
                        </motion.button>

                        {/* Number Counter / Cart Product Count */}
                        <NumberCounter
                          value={quantity}
                          className={
                            quantity < 10
                              ? `product_quantity_single`
                              : `product_quantity_double`
                          }
                        />

                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={() =>
                            setQuantity((quantity) => quantity + 1)
                          }
                        >
                          +
                        </motion.button>
                      </div>
                      <AnimatedLine className="animated_line_2" delay={1.4} />
                    </ProductQuantityWrapper>
                    <ProductCartButton
                      whileTap={{
                        scale: 0.98,
                      }}
                      variants={hideVariants}
                      initial="initial"
                      animate="animate"
                      onClick={handlePurchase}
                    >
                      <span>Add to cart</span>
                    </ProductCartButton>

                    {/* Product Description */}
                    <ProductDescriptionWrapper
                      variants={hideVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <span>Description</span>
                      <h4>{productDetails.description}</h4>
                    </ProductDescriptionWrapper>

                    {/* Product Features */}
                    <ProductFeaturesWrapper
                      variants={hideVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <AnimatedAccordion
                        title="Features"
                        className="product_features"
                        open={true}
                      >
                        {productDetails.features?.map((item, idx) => (
                          <li key={`product_feature_${idx}`}>{item}</li>
                        ))}
                      </AnimatedAccordion>
                    </ProductFeaturesWrapper>
                  </ProductInformationsWrapper>
                </ProductDetailsWrapper>
              </ProductMainDisplay>

              {/* Extra Display */}
              <ProductExtraDisplay>
                <h3 className="vendor_name">{productDetails.vendorName}</h3>
                <ExtraMediaWrapper>
                  {productAssets.map(({ imageSrc }, idx) => (
                    <motion.div
                      className="extra_media_img_wrapper"
                      key={`extra_media_${idx}`}
                      variants={mediaItemVariant}
                      initial="initial"
                      whileInView="animate"
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                    >
                      <Image
                        imageSrc={imageSrc}
                        alt={`unsplash_model_media-${idx}`}
                      />
                    </motion.div>
                  ))}
                </ExtraMediaWrapper>
              </ProductExtraDisplay>

              {/* Recommendation Section */}
              <RecommendationWrapper>
                {recommendedProducts.length !== 0 && (
                  <>
                    <div className="navigate_to_category">
                      <h3 className="lg">
                        If you like this product, you would also like these
                        products as well. Happy Shopping!
                      </h3>
                      <h3 className="sm">Some similar products for you.</h3>
                      <CustomLink text="see all" />
                    </div>
                    <CategorySlider data={recommendedProducts} />
                  </>
                )}
                <FeaturingSlider expand />
              </RecommendationWrapper>
            </ProductPageWrapper>
          </MainLayout>
        </>
      )}
    </>
  )
}
