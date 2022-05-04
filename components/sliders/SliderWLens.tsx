import {
  Dispatch,
  memo,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { NumberCounter, PreviewLens, SingleSwiper, Image } from ".."
import { useAppDispatch, useAppSelector } from "../../app/hooks/redux"
import { useWindowSize } from "../../app/hooks/useWindowSize"
import {
  startZoom,
  stopZoom,
  trackPosition,
} from "../../app/redux/slices/cursorSlice"
import Logo from "../../app/services/logo"
import {
  PreviewChecker,
  ProductSliderButton,
  ProductSliderWrapper,
  SliderPreview,
  SliderPreviewWrapper,
} from "../../styles/pages/ProductTempStyles"
import { ProductAssetProps } from "../../typings/interfaces/mains"

interface Props {
  productAssets: ProductAssetProps[]
  currentIndex: number
  setCurrentIndex: Dispatch<SetStateAction<number>>
  paginate: boolean
  setPaginate: Dispatch<SetStateAction<boolean>>
}

function SliderWLens({
  productAssets,
  currentIndex,
  setCurrentIndex,
  paginate,
  setPaginate,
}: Props): ReactElement {
  const { width } = useWindowSize()
  const dispatch = useAppDispatch()
  const { position, zoomEffect } = useAppSelector((state) => state.cursor)
  const containerRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(false)
  const [allowZoom, setAllowZoom] = useState(false)

  const zoomOnHover = useCallback(
    (event: globalThis.MouseEvent) => {
      if (!containerRef.current) return
      event.preventDefault()

      let client = containerRef.current.getBoundingClientRect()
      let x = event.pageX - client.left
      let y = event.pageY - client.top
      dispatch(trackPosition({ x, y }))
    },
    [dispatch]
  )

  const applyFilter = useCallback(() => {
    if (!loading) setLoading(true)
    dispatch(startZoom())
  }, [loading, dispatch])

  const handleMouseLeave = useCallback(() => {
    if (zoomEffect) {
      dispatch(stopZoom())
      dispatch(trackPosition({ x: 0, y: -20 }))
    }
  }, [zoomEffect, dispatch])

  function PaginateButtons({ bigbois }: { bigbois?: boolean }) {
    return (
      <>
        {currentIndex !== 0 && (
          <ProductSliderButton
            onClick={() => {
              // check for the 2nd index and start the zoom if clicked (paginated from backwards)
              setCurrentIndex(currentIndex - 1)
              if (!paginate) setPaginate(true)
              // if (currentIndex === 1 && bigbois) applyFilter()
            }}
            // onMouseEnter={() => {
            //   if (!zoomEffect || !bigbois) return
            //   handleMouseLeave()
            // }}
            // onMouseLeave={() => {
            //   if (!bigbois) return
            //   // if (!zoomEffect) applyFilter()
            // }}
          >
            <Logo name="chevron-right" />
          </ProductSliderButton>
        )}
        {currentIndex !== productAssets.length - 1 && (
          <ProductSliderButton
            next
            onClick={() => {
              setCurrentIndex(currentIndex + 1)
              if (!paginate) setPaginate(true)
              // check for the 2nd last index and start the zoom if clicked
              // if (currentIndex === productAssets.length - 2 && bigbois)
              //   applyFilter()
            }}
            onMouseEnter={() => {
              if (!allowZoom) return
              handleMouseLeave()
              //   if (!zoomEffect || !bigbois) return
              //   handleMouseLeave()
            }}
            onMouseLeave={() => {
              if (!allowZoom) return
              if (!zoomEffect) applyFilter()
              //   if (!bigbois) return
              //   if (!zoomEffect) applyFilter()
            }}
          >
            <Logo name="chevron-right" />
          </ProductSliderButton>
        )}
      </>
    )
  }

  useEffect(() => {
    if (!lensRef.current || productAssets.length === 0) return
    if (!loading) {
      let ratio = 3

      lensRef.current.style.backgroundImage = `url(${productAssets[currentIndex].imageSrc})`
      // lensRef.current.style.backgroundSize = 'cover'
      lensRef.current.style.backgroundPosition = `-${position.x * ratio}px -${
        position.y * ratio
      }px`
    }
  }, [loading, currentIndex, position, productAssets])

  useEffect(() => {
    let ref = containerRef.current
    if (!ref) return

    if (allowZoom && zoomEffect) {
      ref.addEventListener("mousemove", zoomOnHover)
      ref.style.cursor = "zoom-in"
    }

    return () => {
      if (ref) {
        ref.removeEventListener("mousemove", zoomOnHover)
        ref.style.cursor = "unset"
      }
    }
  }, [zoomEffect, allowZoom, zoomOnHover])

  useEffect(() => {
    let timerID: NodeJS.Timeout
    if (loading) {
      timerID = setTimeout(() => {
        setLoading(false)
      }, 2000)
    }

    return () => clearTimeout(timerID)
  }, [loading])

  return width > 1024 ? (
    <>
      <ProductSliderWrapper
        ref={containerRef}
        onMouseEnter={() => {
          if (!allowZoom) return
          applyFilter()
        }}
        onMouseLeave={() => {
          if (!allowZoom) return
          handleMouseLeave()
        }}
      >
        <button
          className="zoom_on"
          onMouseEnter={() => {
            if (!zoomEffect) return
            handleMouseLeave()
          }}
          onClick={() => {
            setAllowZoom((prev) => {
              if (prev === false) applyFilter()
              return !prev
            })
          }}
          style={{
            backgroundColor: allowZoom
              ? "rgba(0, 0, 0, 0.4)"
              : "rgba(0, 0, 0, 0.2)",
          }}
        >
          <Logo name="search-icon" />
        </button>
        <SingleSwiper
          assets={productAssets}
          className="product_slider_wrapper"
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          paginate={paginate}
          setPaginate={setPaginate}
        />
        <PaginateButtons bigbois />
        <SliderPreviewWrapper
        // onMouseEnter={() => {
        //   if (!zoomEffect) return
        //   handleMouseLeave()
        // }}
        // onMouseLeave={() => {
        //   if (!zoomEffect) applyFilter()
        // }}
        >
          {productAssets.map(
            (asset, idx) =>
              !asset.color && (
                <SliderPreview
                  key={`@swiper_preview_unsplash_${idx}`}
                  active={idx === currentIndex}
                  length={productAssets.length}
                  onClick={() => {
                    setCurrentIndex(idx)
                    if (!paginate) setPaginate(true)
                  }}
                >
                  <Image
                    imageSrc={asset.imageSrc}
                    alt={`swiper_p_model_unsplash_${idx}`}
                  />
                </SliderPreview>
              )
          )}
        </SliderPreviewWrapper>
      </ProductSliderWrapper>
      {zoomEffect && <PreviewLens ref={lensRef} loading={loading} />}
    </>
  ) : (
    <ProductSliderWrapper
      ref={containerRef}
      onMouseEnter={() => {
        if (!containerRef.current) return
        containerRef.current.style.cursor = "default"
      }}
    >
      <SingleSwiper
        assets={productAssets}
        className="product_slider_wrapper"
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        paginate={paginate}
        setPaginate={setPaginate}
      />
      <PaginateButtons />
      <SliderPreviewWrapper>
        {productAssets.map(
          (asset, idx) =>
            !asset.color && (
              <SliderPreview
                key={`@swiper_preview_unsplash_${idx}`}
                active={idx === currentIndex}
                length={productAssets.length}
              >
                <Image
                  imageSrc={asset.imageSrc}
                  alt={`swiper_p_model_unsplash_${idx}`}
                />
              </SliderPreview>
            )
        )}
      </SliderPreviewWrapper>
      <PreviewChecker>
        <NumberCounter value={currentIndex + 1} />
        <span
          className="prop"
          style={{
            marginRight: productAssets.length < 10 ? "0.5rem" : 0,
          }}
        >
          /
        </span>
        <NumberCounter className="asset_length" value={productAssets.length} />
      </PreviewChecker>
    </ProductSliderWrapper>
  )
}

export default memo(SliderWLens)
