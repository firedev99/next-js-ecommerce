import {
  ReactElement,
  MouseEvent,
  TouchEvent,
  useCallback,
  useRef,
  useState,
  memo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { Image } from ".."
import Logo from "../../app/services/logo"
import { ProductAssetProps } from "../../typings/interfaces/mains"
import {
  SingleSwiperContainer,
  SingleSwiperWrapper,
  SwiperAsset,
} from "./styles/SingleSwiperStyles"

interface Props {
  assets: ProductAssetProps[]
  className: string
  currentIndex: number
  setCurrentIndex: Dispatch<SetStateAction<number>>
  paginate: boolean
  setPaginate: Dispatch<SetStateAction<boolean>>
}

function SingleSwiper({
  assets,
  className,
  currentIndex,
  setCurrentIndex,
  paginate,
  setPaginate,
}: Props): ReactElement {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const [originX, setOriginX] = useState(0)
  const [translateX, setTranslateX] = useState(0)

  const lastIndex = assets.length - 1

  const mouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (isSwiping || !sliderRef.current) return
      if (paginate) setPaginate(false)
      setIsSwiping(true)
      setOriginX(event.clientX)
    },
    [isSwiping, paginate, setPaginate]
  )

  const touchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (isSwiping || !sliderRef.current) return
      if (paginate) setPaginate(false)
      setIsSwiping(true)
      const currentPosition = event.touches[0].clientX
      setOriginX(currentPosition)
    },
    [isSwiping, paginate, setPaginate]
  )

  const mouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!isSwiping) return
      const currentPosition = event.clientX
      const moveBy = currentPosition - originX
      setTranslateX(moveBy)
    },
    [isSwiping, originX]
  )

  const touchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (!isSwiping) return
      // enable limitation while move
      if (currentIndex === 0 && translateX > 50) setIsSwiping(false)
      if (currentIndex === lastIndex && translateX < -50) setIsSwiping(false)

      const currentPosition = event.touches[0].clientX
      const moveBy = currentPosition - originX
      setTranslateX(moveBy)
    },
    [isSwiping, currentIndex, lastIndex, originX, translateX]
  )

  const mouseEnd = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!isSwiping || !sliderRef.current) return

      const currentPosition = event.clientX
      const delta = Math.floor(
        ((currentPosition - originX) / sliderRef.current.clientWidth) * 100
      )
      setIsSwiping(false)
      setTranslateX(0)

      if (delta < -25) {
        if (currentIndex === lastIndex) return
        sliderRef.current.style.transform = `translateX(-${
          (currentIndex + 1) * 100
        }%)`
        setCurrentIndex(currentIndex + 1)
      } else if (delta > 25) {
        if (currentIndex === 0) return
        sliderRef.current.style.transform = `translateX(-${
          (currentIndex - 1) * 100
        }%)`
        setCurrentIndex(currentIndex - 1)
      }
    },
    [isSwiping, currentIndex, lastIndex, originX, setCurrentIndex]
  )

  const touchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      // disable limitation after release
      if (!isSwiping) {
        if (currentIndex === 0 || lastIndex) setTranslateX(0)
      }

      if (!isSwiping || !sliderRef.current) return
      sliderRef.current.style.cursor = "unset"

      const currentPosition = event.changedTouches[0].clientX

      const delta = Math.floor(
        ((currentPosition - originX) / sliderRef.current.clientWidth) * 100
      )
      setIsSwiping(false)
      setTranslateX(0)

      if (delta < -20) {
        if (currentIndex === lastIndex) return
        sliderRef.current.style.transform = `translateX(-${
          (currentIndex + 1) * 100
        }%)`
        setCurrentIndex(currentIndex + 1)
      } else if (delta > 20) {
        if (currentIndex === 0) return
        sliderRef.current.style.transform = `translateX(-${
          (currentIndex - 1) * 100
        }%)`
        setCurrentIndex(currentIndex - 1)
      }
    },
    [isSwiping, currentIndex, lastIndex, originX, setCurrentIndex]
  )

  useEffect(() => {
    if (!sliderRef.current) return
    if (paginate)
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
  }, [paginate, currentIndex])

  return (
    <SingleSwiperWrapper className={className}>
      <SingleSwiperContainer
        ref={sliderRef}
        style={{ left: `${translateX}px` }}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onMouseUp={mouseEnd}
        onMouseLeave={mouseEnd}
        onTouchEnd={touchEnd}
      >
        {assets.length !== 0 &&
          assets.map((asset, idx) => (
            <SwiperAsset key={`single_swiper_${idx}`}>
              <Image
                className="image"
                imageSrc={asset.imageSrc}
                alt={`swiper_model_unsplash_${idx}`}
              />
            </SwiperAsset>
          ))}
      </SingleSwiperContainer>
    </SingleSwiperWrapper>
  )
}

export default memo(SingleSwiper)
