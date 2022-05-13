import dynamic from "next/dynamic"
import { ReactElement, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux"
import { fetchProductDetails } from "../../app/redux/slices/productFilteringSlice"
import {
  FilteredProducts,
  MainLayout,
  ProductPageTransition,
} from "../../components"

const ProductFilteringOptions = dynamic(
  () => import("../../components/filterings/ProductFilteringOptions"),
  {
    ssr: false,
  }
)

export default function ProductsPage(): ReactElement {
  const { products } = useAppSelector((state) => state.product_filtering)
  const dispatch = useAppDispatch()

  // loading props
  const [loadingTransition, setLoadingTransition] = useState(true)

  // fetch all product details
  useEffect(() => {
    ;(async function () {
      if (!products.length) await dispatch(fetchProductDetails({})).unwrap()
    })()
  }, [products.length, dispatch])

  // render loading screen
  if (products.length === 0) return <h1>Loading</h1>

  return (
    <>
      <ProductPageTransition
        loading={loadingTransition}
        setLoading={setLoadingTransition}
      />
      {!loadingTransition && (
        <>
          <MainLayout>
            <div>
              <h1>Explore all of our products!</h1>
              <ProductFilteringOptions />
              <FilteredProducts />
            </div>
          </MainLayout>
        </>
      )}
    </>
  )
}
