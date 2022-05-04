import { memo, ReactElement, useRef } from "react"
import { MainSliderProps } from "../../typings/interfaces/mains"
import { sliderData as data } from "../../dummy/sliderData"
import { motion } from "framer-motion"
import { Button, Image, SliderSkeleton } from ".."
import { useSimpleSlider } from "../../app/hooks/useSimpleSlider"
import {
  mainSliderVariants,
  mainSliderTextVariants,
  sliderImageVariants,
  opacityVariants,
} from "./variants"
import {
  SliderCategoryShortcuts,
  MainSliderImage,
  MainSliderMessage,
  MainSliderShoppingNav,
  MainSliderWrapper,
  MainSliderInner,
  MainSliderIntro,
} from "./styles/MainSliderStyles"
import SliderNavigation from "../home/SliderNavigation"
import { useAppSelector } from "../../app/hooks/redux"

function MainSlider(): ReactElement {
  const { status } = useAppSelector((state) => state.general_product)
  const mainSliderRef = useRef<HTMLDivElement>(null)
  const {
    currentIndex,
    dragStart,
    dragEnd,
    touchStart,
    touchEnd,
    paginateToPrev,
    paginateToNext,
  } = useSimpleSlider<MainSliderProps>({
    assets: data,
    ref: mainSliderRef,
    auto: true,
    duration: 5000,
  })

  const isActive = (idx: number) => currentIndex === idx

  if (status === "loading") return <SliderSkeleton />

  return (
    <MainSliderWrapper
      ref={mainSliderRef}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseLeave={dragEnd}
    >
      {data.map((item, idx) => (
        <MainSliderInner
          key={`main_slider_content_${idx}`}
          style={{ opacity: isActive(idx) ? 1 : 0 }}
        >
          <MainSliderIntro
            variants={mainSliderVariants}
            initial="initial"
            animate={isActive(idx) ? "animate" : "initial"}
          >
            {item.bigText.split("").map((lett, idx) => (
              <motion.h1
                key={`main_slider_letter${idx}`}
                variants={mainSliderTextVariants}
              >
                {lett}
              </motion.h1>
            ))}
          </MainSliderIntro>
          <MainSliderImage
            variants={sliderImageVariants}
            initial="initial"
            animate={isActive(idx) ? "animate" : "initial"}
          >
            <div className="image_container">
              <Image
                imageSrc={item.imageSrc}
                layout="fill"
                className="image"
                alt={`main_slider_img_${idx}`}
              />
            </div>
          </MainSliderImage>
          <MainSliderMessage>
            <motion.span
              variants={opacityVariants}
              initial="initial"
              animate={isActive(idx) ? "animate" : "initial"}
            >
              {item.message}
            </motion.span>
          </MainSliderMessage>
        </MainSliderInner>
      ))}
      <SliderCategoryShortcuts>
        <SliderNavigation />
      </SliderCategoryShortcuts>
      <MainSliderShoppingNav>
        <Button
          text="start shopping"
          noTap
          className="start_shopping_navigator"
        />
      </MainSliderShoppingNav>
    </MainSliderWrapper>
  )
}

export default memo(MainSlider)
