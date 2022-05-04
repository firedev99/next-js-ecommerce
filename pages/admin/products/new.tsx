import { ChangeEvent, ReactElement, MouseEvent, useState } from 'react'
import {
    ProductColorOption,
    ProductFormState,
} from '../../../typings/interfaces/mains'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/redux'
import {
    getColorAssets,
    getExtraAssets,
    getMainAsset,
    startCreatingProduct,
    createProduct,
} from '../../../app/redux/slices/adminProductSlice'
import { useForm } from '../../../app/hooks/useForm'
import Logo from '../../../app/services/logo'
import {
    SimpleTitle,
    MainImage,
    ExtraImages,
    ColorOptions,
    UserInput,
    SimpleSelector,
    Button,
    SimpleCheckbox,
    SimpleTextArea,
    Ratings,
    FormError,
    DashboardLayout,
} from '../../../components'
import {
    CheckboxContainer,
    CustomSizeWrapper,
    InputContainer,
    NewProductPageWrapper,
    OptionLabel,
    RatingsWrapper,
    CategoryContainer,
    CountWrapper,
    FeaturesWrapper,
} from '../../../styles/pages/newProductStyles'
import { setNotification } from '../../../app/redux/slices/notificationSlice'
import { uniqueID } from '../../../lib/generateUniqueID'
import validate from '../../../app/services/validationParams'
import { useRouter } from 'next/router'

const categoryOptions = [
    'New In',
    'Hot Trending',
    'Sexy Hunk',
    'Blood Diva',
    'Winter Vibes',
    'Summery',
    'Shoes',
    'Clothing',
    'Men Wears',
    'Women Wears',
    'Boys',
    'Girls',
    'Children',
    'Teenager',
    'Add Custom',
]

const productSizes = [
    'XS',
    'Children',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
    'XXXL',
    'Universal',
    'Add Custom',
]

const initialValues = {
    name: '',
    price: 0,
    vendorName: '',
    category: 'New In',
    description: '',
    sizes: [],
    gender: 'male',
    featuring: false,
    countInStock: 1,
    features: [],
} as ProductFormState

const { NEXT_PUBLIC_CLOUDINARY_API } = process.env

function NewProduct(): ReactElement {
    const [singleFile, setSingleFile] = useState<File>()
    const [multipleFiles, setMultipleFiles] = useState<File[]>([])
    const [colorFiles, setColorFiles] = useState<File[]>([])

    const [_price, _] = useState<number>()
    const [customCategory, setCustomCategory] = useState(false)
    const [customSize, setCustomSize] = useState(false)
    const [customSizeValue, setCustomSizeValue] = useState('')
    const [feature, setFeature] = useState('')
    const [rating, setRating] = useState(4)

    const router = useRouter()

    const dispatch = useAppDispatch()
    const {
        overSingleDropZone,
        overMultipleDropZone,
        overColorDropZone,
        singlePreview,
        multiplePreview,
        colorPreview,
        colorOptions,
    } = useAppSelector((state) => state.dnd)
    const { status } = useAppSelector((state) => state.admin_product)

    const {
        values,
        setValues,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
    } = useForm<ProductFormState>(
        {
            initialState: initialValues,
            onSubmit: (values) => {
                makeRequest(values)
            },
        },
        validate.createProduct
    )

    const checkError = Object.keys(errors).length !== 0

    const {
        name,
        vendorName,
        category,
        description,
        sizes,
        gender,
        featuring,
        features,
    } = values

    function cloudApi(formData: FormData) {
        const request = fetch(`${NEXT_PUBLIC_CLOUDINARY_API}/image/upload`, {
            method: 'POST',
            body: formData,
        })
        return request
    }

    // handle submit
    async function requestSubmission(productInfos: ProductFormState) {
        try {
            const res = dispatch(
                createProduct({ ...productInfos, rating })
            ).unwrap()
            if ((await res).success === true) {
                dispatch(
                    setNotification({
                        id: uniqueID(),
                        message: 'Done Boss! 🏄🏼‍♀️',
                    })
                )
                setTimeout(() => {
                    router.reload()
                }, 2900)
            } else {
                dispatch(
                    setNotification({
                        id: uniqueID(),
                        message: 'Opps something went wrong! 😩',
                    })
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function makeRequest(productInfos: ProductFormState) {
        const unResolvedPromises = [] as Response[] //array of promises

        // handle single image upload
        if (singleFile) {
            const mainImageData = new FormData()
            mainImageData.append('file', singleFile)
            mainImageData.append('upload_preset', 'rainbow-products')
            mainImageData.append('public_id', `${singleFile.name}-fmain`)
            // checking so that it contains a hovering image by default
            if (multipleFiles.length !== 0) {
                const request = await cloudApi(mainImageData)
                dispatch(startCreatingProduct())
                unResolvedPromises.push(request)
            }
        } else {
            return dispatch(
                setNotification({
                    id: uniqueID(),
                    message: 'This product needs a main display image!',
                })
            )
        }

        // check for side images
        if (multipleFiles.length !== 0) {
            for (const file of multipleFiles) {
                const extraImageData = new FormData()
                extraImageData.append('file', file)
                extraImageData.append('upload_preset', 'rainbow-products')
                extraImageData.append('public_id', `${file.name}-fextra`)
                const request = await cloudApi(extraImageData)

                unResolvedPromises.push(request)
            }
        } else {
            // make sure a default image is provided while hovering
            return dispatch(
                setNotification({
                    id: uniqueID(),
                    message:
                        'Add atleast one extra image to display a hovering image by default!',
                })
            )
        }

        if (colorFiles.length !== 0) {
            for (const file of colorFiles) {
                const colorOptionData = new FormData()
                colorOptionData.append('file', file)
                colorOptionData.append('upload_preset', 'rainbow-products')
                colorOptionData.append('public_id', `${file.name}-fcolor`)
                const request = await cloudApi(colorOptionData)

                unResolvedPromises.push(request)
            }
        }

        // fetch all promise calls from the request array
        try {
            const response = await Promise.all(
                unResolvedPromises.map((res) => res.json())
            )

            // main image
            const main = response
                .filter((data) => (data?.public_id as string).includes('fmain'))
                .map((file) => file.secure_url)

            // side images
            const extra = response
                .filter((data) =>
                    (data?.public_id as string).includes('fextra')
                )
                .map((file) => file.secure_url)

            // images that contains colors
            const color = response
                .filter((data) =>
                    (data?.public_id as string).includes('fcolor')
                )
                .map((file) => file.secure_url)

            // for dnd files
            if (main.length !== 0) dispatch(getMainAsset(main[0]))
            if (extra.length !== 0) dispatch(getExtraAssets(extra))
            if (color.length !== 0) {
                let options = [] as ProductColorOption[]
                colorOptions.map((_options, idx) => {
                    options.push({
                        colorName: _options.colorName,
                        imageSrc: color[idx],
                    })
                })

                dispatch(getColorAssets(options))
            }

            requestSubmission(productInfos)
        } catch (error) {
            console.log(error)
        }
    }

    // handle change event for category selector
    function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        if (event.target.value === 'Add Custom') setCustomCategory(true)
        else setValues({ ...values, category: event.target.value })
    }

    // handle change event for sizes selector
    function handleSizesChange(event: ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        if (event.target.value === 'Add Custom') {
            setCustomSize(true)
        } else {
            setValues({ ...values, sizes: sizes?.concat(event.target.value) })
        }
    }

    // handle gender checkbox change event
    function handleGenderCheck(event: ChangeEvent<HTMLInputElement>) {
        setValues({ ...values, gender: event.target.name })
    }

    // handle description change event
    function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault()
        setValues({ ...values, description: event.target.value })
    }

    // handle count in stock change event
    function handleCountChange(event: ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        setValues({
            ...values,
            countInStock: Number(event.target.value),
        })
    }

    // add features to form
    function addFeature(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        setValues({ ...values, features: features?.concat(feature) })
        setFeature('')
    }

    // delete features from form
    function deleteFeature(idx: number) {
        setValues({
            ...values,
            features: features?.filter((_, i) => i !== idx),
        })
    }

    // handle custom size input change event
    function handleCustomSizeChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setCustomSizeValue(event.target.value)
    }

    // delete sizes from form
    function deleteSize(idx: number) {
        setValues({
            ...values,
            sizes: sizes?.filter((_, i) => i !== idx),
        })
    }

    // add custom size
    function addSize(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        setValues({ ...values, sizes: sizes?.concat(customSizeValue) })
        setCustomSize(false)
    }

    if (status === 'loading') return <h1>Loading</h1>

    return (
        <NewProductPageWrapper onSubmit={handleSubmit}>
            <SimpleTitle text='Create new products' />
            <InputContainer>
                <UserInput label='Name' value={name} onChange={handleChange} />
            </InputContainer>
            <InputContainer>
                <UserInput
                    label='Price'
                    value={_price}
                    onChange={(event) =>
                        setValues({
                            ...values,
                            price: Number(event.target.value),
                        })
                    }
                />
            </InputContainer>
            <InputContainer>
                <UserInput
                    label='Vendor Name'
                    value={vendorName}
                    onChange={handleChange}
                />
            </InputContainer>
            <CategoryContainer>
                {customCategory ? (
                    <UserInput
                        label='Category'
                        value={category}
                        onChange={handleChange}
                    />
                ) : (
                    <SimpleSelector
                        id='categories'
                        options={categoryOptions}
                        label='Choose category'
                        onChange={handleCategoryChange}
                        style={{ maxWidth: 380 }}
                    />
                )}
            </CategoryContainer>
            <OptionLabel style={{ marginTop: '1.5rem' }}>
                Upload main product image
            </OptionLabel>
            <MainImage
                dragging={overSingleDropZone}
                previewImage={singlePreview}
                file={singleFile}
                setFile={setSingleFile}
            />
            <RatingsWrapper>
                <OptionLabel>Rating for this product: </OptionLabel>
                <Ratings rValue={(value) => setRating(value + 1)} />
            </RatingsWrapper>
            <OptionLabel>Write something about the product</OptionLabel>
            <SimpleTextArea
                rows={8}
                value={description}
                onChange={handleDescriptionChange}
            />
            <CustomSizeWrapper>
                {customSize ? (
                    <div className='size_input'>
                        <UserInput
                            label='Custom Size'
                            value={customSizeValue}
                            onChange={handleCustomSizeChange}
                        />
                        <button onClick={addSize}>
                            <Logo name='plus-sign' />
                        </button>
                    </div>
                ) : (
                    <SimpleSelector
                        id='categories'
                        options={productSizes}
                        label='Product sizes:'
                        style={{ maxWidth: 315 }}
                        onChange={handleSizesChange}
                    />
                )}
                {sizes &&
                    sizes.length !== 0 &&
                    sizes.map((size, i) => (
                        <div key={`product-size-${i}`}>
                            <span onClick={() => deleteSize(i)}>{size}</span>
                        </div>
                    ))}
            </CustomSizeWrapper>
            <CheckboxContainer>
                <span>Choose gender: </span>
                <SimpleCheckbox
                    label='male'
                    name='male'
                    checked={gender === 'male' ? true : false}
                    onChange={handleGenderCheck}
                />
                <SimpleCheckbox
                    label='female'
                    name='female'
                    checked={gender === 'female' ? true : false}
                    onChange={handleGenderCheck}
                />
                <SimpleCheckbox
                    label='universal'
                    name='universal'
                    checked={gender === 'universal' ? true : false}
                    onChange={handleGenderCheck}
                />
            </CheckboxContainer>
            <OptionLabel>Upload extra product images</OptionLabel>
            <ExtraImages
                dragging={overMultipleDropZone}
                previewImages={multiplePreview}
                setFiles={setMultipleFiles}
            />
            <CheckboxContainer>
                <span>Make this a featuring product: </span>
                <SimpleCheckbox
                    name='featuring'
                    checked={!!featuring}
                    onChange={handleChange}
                />
            </CheckboxContainer>
            <ColorOptions
                dragging={overColorDropZone}
                colorOptions={colorOptions}
                colorPreview={colorPreview}
                setFiles={setColorFiles}
            />
            <FeaturesWrapper>
                <OptionLabel>Add some features of the product</OptionLabel>
                {features &&
                    features.length !== 0 &&
                    features.map((feature, i) => (
                        <div className='feature' key={`product-feature-${i}`}>
                            <span onClick={() => deleteFeature(i)}>
                                {feature}
                            </span>
                        </div>
                    ))}
                <div className='features_input'>
                    <UserInput
                        label='Features'
                        value={feature}
                        onChange={(event) => setFeature(event.target.value)}
                    />
                    <button onClick={addFeature}>
                        <Logo name='plus-sign' />
                    </button>
                </div>
            </FeaturesWrapper>
            <CountWrapper>
                <SimpleSelector
                    id='categories'
                    options={Array.from(Array(100), (_, i) => i + 1)}
                    label='Count in stock: '
                    style={{ maxWidth: 315 }}
                    onChange={handleCountChange}
                />
            </CountWrapper>
            <FormError
                errors={errors}
                show={checkError}
                style={{ maxWidth: 510, marginBottom: '1rem' }}
            />
            <Button type='submit' text='SUBMIT' />
        </NewProductPageWrapper>
    )
}

NewProduct.Layout = DashboardLayout

export default NewProduct
