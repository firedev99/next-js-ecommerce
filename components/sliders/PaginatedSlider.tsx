import {
  ReactElement,
  useCallback,
  TouchEvent,
  MouseEvent,
  WheelEvent,
  useState,
  useEffect,
  memo,
  useRef,
} from "react"
import { Product, ProductSliderSkeleton } from ".."
import Logo from "../../app/services/logo"
import { ProductProps } from "../../typings/interfaces/mains"
import {
  MultiSliderButton,
  PaginatedSliderContainer,
  PaginatedSliderInner,
  PaginatedSliderWrapper,
} from "./styles/MultiSliderStyles"

interface Props {
  data: ProductProps[]
}

function PaginatedSlider({ data }: Props): ReactElement {
  const [isDragging, setIsDragging] = useState(false)
  const [originX, setOriginX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [disablePrev, setDisablePrev] = useState(true)
  const [disableNext, setDisableNext] = useState(false)
  // allowing event on per wheel
  const [allowWheel, setAllowWheel] = useState(true)
  // self delaying for animation pursose
  const [contentLoaded, setContentLoaded] = useState(false)

  const sliderRef = useRef<HTMLDivElement>(null)

  const dragStart = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!sliderRef.current || isDragging) return
      event.preventDefault()

      setIsDragging(true)
      setOriginX(event.clientX)
    },
    [sliderRef, isDragging]
  )

  const dragEnd = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!sliderRef.current) return
      if (!isDragging) return
      event.preventDefault()
      sliderRef.current.style.transition = `all 0.6s ease-in-out`

      setIsDragging(false)

      const currentX = event.clientX

      if (originX > currentX) {
        if (
          translateX <
          -(sliderRef.current.scrollWidth - sliderRef.current.clientWidth * 2)
        ) {
          setTranslateX(
            translateX -
              (translateX +
                (sliderRef.current.scrollWidth - sliderRef.current.clientWidth))
          )
        } else {
          setTranslateX(translateX - sliderRef.current.clientWidth)
        }
      } else {
        if (-sliderRef.current.clientWidth * 2 < translateX * 2) {
          setTranslateX(0)
        } else {
          setTranslateX(translateX + sliderRef.current.clientWidth)
        }
      }
    },
    [sliderRef, isDragging, originX, translateX]
  )

  const touchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!sliderRef.current || isDragging) return

      setIsDragging(true)
      setOriginX(event.touches[0].clientX)
    },
    [sliderRef, isDragging]
  )

  const touchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!sliderRef.current) return
      if (!isDragging) return
      sliderRef.current.style.transition = `all 0.6s ease-in-out`

      setIsDragging(false)

      const currentX = event.changedTouches[0].clientX

      if (originX > currentX) {
        if (
          translateX <
          -(sliderRef.current.scrollWidth - sliderRef.current.clientWidth * 2)
        ) {
          setTranslateX(
            translateX -
              (translateX +
                (sliderRef.current.scrollWidth - sliderRef.current.clientWidth))
          )
        } else {
          setTranslateX(translateX - sliderRef.current.clientWidth)
        }
      } else {
        if (-sliderRef.current.clientWidth * 2 < translateX * 2) {
          setTranslateX(0)
        } else {
          setTranslateX(translateX + sliderRef.current.clientWidth)
        }
      }
    },
    [sliderRef, isDragging, originX, translateX]
  )

  const mouseWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (!sliderRef.current || !allowWheel || event.deltaY) return
      sliderRef.current.style.transition = "all 0.6s ease-in-out"
      const delta = Math.sign(event.deltaX)

      if (delta > 0) {
        if (
          translateX <
          -(sliderRef.current.scrollWidth - sliderRef.current.clientWidth * 2)
        ) {
          setTranslateX(
            translateX -
              (translateX +
                (sliderRef.current.scrollWidth - sliderRef.current.clientWidth))
          )
        } else {
          setTranslateX(translateX - sliderRef.current.clientWidth)
          setAllowWheel(false)
        }
      } else {
        if (-sliderRef.current.clientWidth * 2 < translateX * 2) {
          setTranslateX(0)
        } else {
          setTranslateX(translateX + sliderRef.current.clientWidth)
          setAllowWheel(false)
        }
      }
    },
    [sliderRef, translateX, allowWheel]
  )

  const paginateNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.style.transition = `all 0.6s ease-in-out`

    if (
      translateX <
      -(sliderRef.current.scrollWidth - sliderRef.current.clientWidth * 2)
    ) {
      setTranslateX(
        translateX -
          (translateX +
            (sliderRef.current.scrollWidth - sliderRef.current.clientWidth))
      )
    } else {
      setTranslateX(translateX - sliderRef.current.clientWidth)
    }
  }, [sliderRef, translateX])

  const paginatePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.style.transition = `all 0.6s ease-in-out`

    if (-sliderRef.current.clientWidth * 2 < translateX * 2) {
      setTranslateX(0)
    } else {
      setTranslateX(translateX + sliderRef.current.clientWidth)
    }
  }, [sliderRef, translateX])

  useEffect(() => {
    if (!contentLoaded || typeof window === "undefined") return
    function setLimitation() {
      if (!sliderRef.current) return

      if (translateX >= 0) {
        setDisablePrev(true)
      } else {
        setDisablePrev(false)
      }

      if (
        translateX <=
        -(sliderRef.current.scrollWidth - sliderRef.current.clientWidth)
      ) {
        setDisableNext(true)
      } else {
        setDisableNext(false)
      }

      if (sliderRef.current.scrollWidth === sliderRef.current.clientWidth) {
        setDisablePrev(true)
        setDisableNext(true)
      }
    }

    setLimitation()

    window.addEventListener("resize", setLimitation)
    return () => window.removeEventListener("resize", setLimitation)
  }, [sliderRef, contentLoaded, translateX])

  useEffect(() => {
    const timerID = setTimeout(() => {
      setContentLoaded(true)
    }, 3000)

    const wheelTimerID = setTimeout(() => {
      if (!allowWheel) setAllowWheel(true)
    }, 900)

    return () => {
      clearTimeout(timerID)
      clearTimeout(wheelTimerID)
    }
  }, [allowWheel])

  if (!contentLoaded) return <ProductSliderSkeleton />

  return (
    <PaginatedSliderWrapper>
      <PaginatedSliderInner>
        <PaginatedSliderContainer
          ref={sliderRef}
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
          onMouseDown={dragStart}
          onMouseUp={dragEnd}
          onMouseLeave={dragEnd}
          onWheel={mouseWheel}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {/* cause i'm possesive about you */}
          {contentLoaded &&
            data.length !== 0 &&
            data.map(
              (
                {
                  _id,
                  name,
                  price,
                  imageSrc,
                  rating,
                  vendorName,
                  hoveringImage,
                  sideImagesSrc,
                },
                idx
              ) => (
                <Product
                  key={`paginated_slider_${idx}_${_id}`}
                  id={_id}
                  name={name}
                  price={price}
                  imageSrc={imageSrc}
                  hoveringImage={
                    hoveringImage
                      ? hoveringImage
                      : sideImagesSrc
                      ? sideImagesSrc[0]
                      : imageSrc
                  }
                  rating={rating - 1}
                  vendor={vendorName || "firedev99"}
                />
              )
            )}
        </PaginatedSliderContainer>
      </PaginatedSliderInner>
      <MultiSliderButton
        disabled={disablePrev}
        onClick={paginatePrev}
        initial={{ translateY: `-50%`, scaleX: -1 }}
        whileTap={{ scale: 0.96 }}
      >
        <Logo name="chevron-right" />
      </MultiSliderButton>
      <MultiSliderButton
        disabled={disableNext}
        onClick={paginateNext}
        initial={{ translateY: `-50%` }}
        whileTap={{ scale: 0.96 }}
      >
        <Logo name="chevron-right" />
      </MultiSliderButton>
    </PaginatedSliderWrapper>
  )
}

export default memo(PaginatedSlider)
