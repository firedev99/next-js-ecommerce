import { ReactElement, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useAppDispatch, useAppSelector } from "../app/hooks/redux"
import {
  fetchHomePageDetails,
  fetchProductDetails,
} from "../app/redux/slices/generalProductSlice"
import {
  CategoryNavigation,
  HomeDisplays,
  MainLayout,
  ProductPageTransition,
} from "../components"

const Slider = dynamic(() => import("../components/sliders/MainSlider"), {
  ssr: false,
})

const FeaturingSlider = dynamic(
  () => import("../components/sliders/FeaturingSlider")
)

export default function HomePage(): ReactElement {
  const dispatch = useAppDispatch()

  // loading props
  const [loadingTransition, setLoadingTransition] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  // fetch all product details
  useEffect(() => {
    ;(async function () {
      setLoadingTransition(true)
      await dispatch(fetchHomePageDetails({}))
    })()
  }, [dispatch])

  // dealy 5sec in total for animation ease and loading settlement
  useEffect(() => {
    let timerID: NodeJS.Timeout
    timerID = setTimeout(() => {
      setIsAnimating(false)
    }, 5000)

    return () => clearTimeout(timerID)
  }, [])

  return (
    <>
      <ProductPageTransition
        loading={loadingTransition}
        setLoading={setLoadingTransition}
      />
      {!loadingTransition && !isAnimating && (
        <>
          <MainLayout>
            <Slider />
            <CategoryNavigation />
            <FeaturingSlider expand />
            <HomeDisplays />
          </MainLayout>
        </>
      )}
    </>
  )
}
