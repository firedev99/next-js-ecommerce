import { motion } from 'framer-motion'
import Image from 'next/image'
import {
    ReactElement,
    Dispatch,
    SetStateAction,
    DragEvent,
    MouseEvent,
    ChangeEvent,
    useState,
} from 'react'
import { SimpleModal } from '..'
import { useAppDispatch } from '../../app/hooks/redux'
import {
    addColorOption,
    deleteColorPreview,
    deleteColorPreviewOption,
    handleColorDropboxLeave,
    handleColorPreview,
    overColorDropbox,
} from '../../app/redux/slices/dndSlice'
import { setNotification } from '../../app/redux/slices/notificationSlice'
import Logo from '../../app/services/logo'
import { uniqueID } from '../../lib/generateUniqueID'
import SimpleButton from '../buttons/simpleButton'
import SimpleRange from '../inputs/SimpleRange'
import {
    ChooseColor,
    ColorDropboxWrapper,
    ColorOptionsWrapper,
    DragOverlay,
    DropboxInner,
    FileUploadWrapper,
    PreviewItem,
    RangeWrapper,
    SpecificColor,
} from './styles'

interface ColorOptions {
    colorName: string
    optionPreview: string
}

interface ColorDNDProps {
    colorPreview: string
    dragging: boolean
    colorOptions: ColorOptions[]
    setFiles: Dispatch<SetStateAction<File[]>>
}

export default function ColorsDnD({
    colorPreview,
    dragging,
    colorOptions,
    setFiles,
}: ColorDNDProps): ReactElement {
    const [modal, setModal] = useState(false)
    const [red, setRed] = useState(255)
    const [green, setGreen] = useState(255)
    const [blue, setBlue] = useState(255)
    const [alpha, setAlpha] = useState(1)
    const [fileState, setFileState] = useState<File>()

    const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`

    const dispatch = useAppDispatch()

    // check for valitdation requirements before droping
    function validateFile(file: File) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if (validTypes.indexOf(file.type) === -1) {
            console.log('only image type allowed ')
            return false
        }

        return true
    }

    // handle on drag over or hovering around drop box
    function handleDragOver(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'
        dispatch(overColorDropbox())
    }

    // handle image drop
    function handleDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (validateFile(file)) {
            setFileState(file)
            let preview = URL.createObjectURL(file)
            dispatch(handleColorPreview(preview))
        }
    }

    // handle drop box or drag leave
    function handleLeave(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.dataTransfer.clearData
        dispatch(handleColorDropboxLeave())
    }

    // handle input change
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        if (!(event.target.files && event.target.files.length)) return
        const file = event.target.files[0]
        if (validateFile(file)) {
            setFileState(file)
            let preview = URL.createObjectURL(file)
            dispatch(handleColorPreview(preview))
        }
    }

    // handle file delete
    function handlePreviewDelete() {
        dispatch(deleteColorPreview())
        setFileState(undefined)
    }

    function handleDelete(
        event: MouseEvent<HTMLButtonElement>,
        fileIndex: number
    ) {
        event.preventDefault()
        setFiles((_files) => _files.filter((_, index) => index !== fileIndex))
        dispatch(deleteColorPreviewOption(fileIndex))
    }

    function addSpecificProduct() {
        if (fileState) {
            setFiles((_files) => _files.concat(fileState))
            dispatch(
                addColorOption({ colorName: rgba, optionPreview: colorPreview })
            )
            dispatch(deleteColorPreview())
            setFileState(undefined)
            setRed(255)
            setBlue(255)
            setGreen(255)
            setAlpha(1)
            setModal(false)
        } else {
            dispatch(
                setNotification({
                    id: uniqueID(),
                    message: 'image is missing 😩',
                })
            )
        }
    }

    return (
        <ColorDropboxWrapper>
            <DropboxInner>
                {colorOptions.length === 0 ? (
                    <ChooseColor>
                        <h3>Choose a color</h3>
                        <button type='button' onClick={() => setModal(true)}>
                            <Logo name='plus-sign' />
                        </button>
                    </ChooseColor>
                ) : (
                    <>
                        {colorOptions &&
                            colorOptions.map(
                                ({ colorName, optionPreview }, index) => (
                                    <ColorOptionsWrapper
                                        key={`color-preview-${index}`}
                                    >
                                        <PreviewItem>
                                            <Image
                                                src={optionPreview}
                                                alt={`@preview-color-${index}`}
                                                layout='responsive'
                                                width={90}
                                                height={109}
                                                quality={100}
                                                objectFit='cover'
                                            />
                                            <button
                                                type='reset'
                                                onClick={(event) =>
                                                    handleDelete(event, index)
                                                }
                                            >
                                                <Logo name='trash' />
                                            </button>
                                        </PreviewItem>
                                        <SpecificColor
                                            style={{
                                                backgroundColor: colorName,
                                            }}
                                        />
                                    </ColorOptionsWrapper>
                                )
                            )}
                        <ChooseColor previewMode>
                            <h3>Choose another color</h3>
                            <button
                                type='button'
                                onClick={() => setModal(true)}
                            >
                                <Logo name='plus-sign' />
                            </button>
                        </ChooseColor>
                    </>
                )}
            </DropboxInner>

            {/* modal */}
            <SimpleModal open={modal} setOpen={setModal} style={{ width: 380 }}>
                <ColorOptionsWrapper>
                    {colorPreview.length === 0 ? (
                        <PreviewItem
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragLeave={handleLeave}
                            style={{ display: 'grid', placeItems: 'center' }}
                        >
                            <FileUploadWrapper>
                                {dragging ? (
                                    <DragOverlay>
                                        <motion.h3
                                            style={{ fontSize: `1.2rem` }}
                                            initial={{ scale: 1 }}
                                            animate={{
                                                scale: 1.25,
                                                opacity: 0.5,
                                            }}
                                        >
                                            DROP HERE!!!
                                        </motion.h3>
                                    </DragOverlay>
                                ) : (
                                    <>
                                        <input
                                            type='file'
                                            id='upload_color_images'
                                            multiple
                                            onChange={handleChange}
                                        />
                                        <label htmlFor='upload_color_images'>
                                            <Logo name='upload' />
                                            <p>
                                                Drag or click to upload image
                                                for this color
                                            </p>
                                        </label>
                                    </>
                                )}
                            </FileUploadWrapper>
                        </PreviewItem>
                    ) : (
                        <PreviewItem>
                            <Image
                                src={colorPreview && colorPreview}
                                alt={`@preview-${rgba}`}
                                layout='responsive'
                                width={90}
                                height={109}
                                quality={100}
                                objectFit='cover'
                            />
                            <button type='reset' onClick={handlePreviewDelete}>
                                <Logo name='trash' />
                            </button>
                        </PreviewItem>
                    )}
                    <SpecificColor
                        style={{
                            backgroundColor: rgba,
                        }}
                    />
                    <RangeWrapper>
                        <SimpleRange
                            id='red'
                            value={red}
                            setValue={setRed}
                            max={255}
                        />
                        <output id='red'>{red}</output>
                        <span>R</span>
                    </RangeWrapper>
                    <RangeWrapper>
                        <SimpleRange
                            id='green'
                            value={green}
                            setValue={setGreen}
                            max={255}
                        />
                        <output id='green'>{green}</output>
                        <span>G</span>
                    </RangeWrapper>
                    <RangeWrapper>
                        <SimpleRange
                            id='blue'
                            value={blue}
                            setValue={setBlue}
                            max={255}
                        />
                        <output id='blue'>{blue}</output>
                        <span>B</span>
                    </RangeWrapper>
                    <RangeWrapper>
                        <SimpleRange
                            id='alpha'
                            value={alpha}
                            setValue={setAlpha}
                            max={1}
                            step={0.01}
                        />
                        <output id='alpha'>{alpha}</output>
                        <span>A</span>
                    </RangeWrapper>
                    <SimpleButton
                        style={{ marginTop: '1rem' }}
                        text={'ADD'}
                        onClick={addSpecificProduct}
                    />
                </ColorOptionsWrapper>
            </SimpleModal>
            {/* end of modal */}
        </ColorDropboxWrapper>
    )
}
