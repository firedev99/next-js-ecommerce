import { ReactElement } from "react"
import { useAppSelector } from "../../app/hooks/redux"
import HomeDisplayCategory from "./HomeDisplayCategory"
import { HomeDisplayWrapper } from "./styles/HomeDisplayCategoryStyles"

export default function HomeDisplaySection(): ReactElement {
  const { newInProducts, menWearsProducts, womenWearsProducts, status } =
    useAppSelector((state) => state.general_product)

  if (status === "loading") return <div />

  return (
    <HomeDisplayWrapper>
      <HomeDisplayCategory
        category="new-in"
        data={newInProducts}
        text="We provide you with the best, up to date looks and comfortable wears."
        image="https://res.cloudinary.com/firey/image/upload/v1642446938/rainbow-products/rainbow-product-5-black.jpg-fmain.jpg"
      />
      <HomeDisplayCategory
        reverse={true}
        category="men-wears"
        data={menWearsProducts}
        text="See all of our trendy, stylish and bold looks from the men's section"
        image="https://res.cloudinary.com/firey/image/upload/v1642530409/rainbow-products/rainbow-product-9-blue.jfif-fcolor.jpg"
      />
      <HomeDisplayCategory
        category="women-wears"
        data={womenWearsProducts}
        text="See all of our trendy, stylish and bold looks from the women's section"
        image="https://res.cloudinary.com/firey/image/upload/v1642537346/rainbow-products/rainbow-product-14-white-1.jfif-fmain.jpg"
      />
    </HomeDisplayWrapper>
  )
}
