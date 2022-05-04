import { ReactElement, useEffect, useState } from 'react'
import { OverflowAnimatedTitle, Image } from '..'
import { ProductProps } from '../../typings/interfaces/mains'
import { useAppDispatch } from '../../app/hooks/redux'
import { fetchProductByCategory } from '../../app/redux/slices/generalProductSlice'
import {
    CategoryBigTitle,
    CategoryImage,
    CategoryImageSection,
    CategoryProducts,
    HomeDisplayCategoryWrapper,
    ProductNav,
} from './styles/HomeDisplayCategoryStyles'
import {
    categoryImgConVariants,
    categoryImgItemVariants,
    overflowItemVariants,
} from './variants'

interface Props {
    category: string
    text: string
    reverse: boolean
    data: ProductProps[]
    image: string
}

export default function HomeDisplayCategory({
    reverse,
    category,
    data,
    text,
    image,
}: Props): ReactElement {
    return (
        <HomeDisplayCategoryWrapper reverse={reverse}>
            <CategoryProducts
                variants={categoryImgConVariants}
                initial='initial'
                whileInView='animate'
                viewport={{ once: true, amount: 0.8 }}
            >
                {data &&
                    data
                        .filter((_, idx) => idx < 4)
                        .map((product, idx) => (
                            <ProductNav
                                key={`${category}-product-${idx}`}
                                variants={categoryImgItemVariants}
                            >
                                <Image
                                    imageSrc={product.imageSrc}
                                    layout='fill'
                                    alt={`display_image_${category}_${idx}`}
                                />

                                <div className='overlay'>
                                    <h4>{product.name}</h4>
                                    <span className='price'>
                                        starting from US ${product.price}
                                    </span>
                                    <span className='vendor'>
                                        by {product.vendorName}
                                    </span>
                                </div>
                            </ProductNav>
                        ))}
            </CategoryProducts>
            <CategoryImageSection
                variants={overflowItemVariants}
                initial='initial'
                whileInView='animate'
                viewport={{ once: true }}
            >
                <CategoryImage>
                    <Image imageSrc={image} alt={`${category}_model`} />
                </CategoryImage>
                <CategoryBigTitle reverse={reverse}>
                    <OverflowAnimatedTitle text={text} />
                </CategoryBigTitle>
            </CategoryImageSection>
        </HomeDisplayCategoryWrapper>
    )
}

HomeDisplayCategory.defaultProps = {
    reverse: false,
}
