import {
    ReactElement,
    DragEvent,
    Dispatch,
    SetStateAction,
    MouseEvent,
    ChangeEvent,
} from 'react'
import Image from 'next/image'
import { useAppDispatch } from '../../app/hooks/redux'
import {
    overMultipleDropbox,
    handleMultiplePreview,
    deleteMultiplePreview,
    handleMultipleLeave,
} from '../../app/redux/slices/dndSlice'
import Logo from '../../app/services/logo'
import {
    DragOverlay,
    DropboxInner,
    ExtraDropZone,
    FileUploadWrapper,
    MultiDropboxWrapper,
    PreviewItem,
} from './styles'
import { motion } from 'framer-motion'
import { setNotification } from '../../app/redux/slices/notificationSlice'
import { uniqueID } from '../../lib/generateUniqueID'

interface MultipleDNDProps {
    dragging: boolean
    previewImages: string[]
    setFiles: Dispatch<SetStateAction<File[]>>
}

export default function MultipleDnD({
    dragging,
    previewImages,
    setFiles,
}: MultipleDNDProps): ReactElement {
    const dispatch = useAppDispatch()

    // handle files
    function handleFiles(files: FileList) {
        if (files.length > 10) {
            dispatch(
                setNotification({
                    id: uniqueID(),
                    message: 'only 10 extra images are allowed 😔',
                })
            )
            dispatch(handleMultipleLeave())
        } else {
            Array.from(files).forEach((file) => {
                if (validateFile(file)) {
                    let preview = URL.createObjectURL(file)
                    dispatch(handleMultiplePreview(preview))
                    setFiles((_files) => _files.concat(file))
                }
            })
        }
    }

    // check for valitdation requirements before droping
    function validateFile(file: File) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if (validTypes.indexOf(file.type) === -1) {
            dispatch(
                setNotification({
                    id: uniqueID(),
                    message: 'only image type allowed 😔',
                })
            )
            return false
        }

        return true
    }

    // handle on drag over or hovering around drop box
    function handleDragOver(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'
        dispatch(overMultipleDropbox())
    }

    // handle image drop
    function handleDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        const files = event.dataTransfer.files
        handleFiles(files)
    }

    // handle drop box or drag leave
    function handleLeave(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.dataTransfer.clearData
        dispatch(handleMultipleLeave())
    }

    // handle input change
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        if (!(event.target.files && event.target.files.length)) return
        const files = event.target.files
        handleFiles(files)
    }

    // handle file delete
    function handleDelete(
        event: MouseEvent<HTMLButtonElement>,
        fileIndex: number
    ) {
        event.preventDefault()
        setFiles((_files) => _files.filter((_, index) => index !== fileIndex))
        dispatch(deleteMultiplePreview(fileIndex))
    }

    function OverlayPlaceholders({ small = false }: { small?: boolean }) {
        return dragging ? (
            <DragOverlay>
                <motion.h3
                    style={{ fontSize: small ? `1.2rem` : `1.5rem` }}
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.25, opacity: 0.5 }}
                >
                    DROP HERE!!!
                </motion.h3>
            </DragOverlay>
        ) : (
            <>
                <input
                    type='file'
                    id='upload_multiple_media'
                    multiple
                    onChange={handleChange}
                />
                <label htmlFor='upload_multiple_media'>
                    <Logo name='upload' />
                    <p>Drag or click to upload extra images</p>
                </label>
            </>
        )
    }

    return (
        <MultiDropboxWrapper>
            <DropboxInner>
                {previewImages.length === 0 ? (
                    <PreviewItem
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleLeave}
                        style={{
                            width: '100%',
                            maxWidth: 486,
                            display: `grid`,
                            placeItems: `center`,
                        }}
                    >
                        <FileUploadWrapper>
                            <OverlayPlaceholders />
                        </FileUploadWrapper>
                    </PreviewItem>
                ) : (
                    <>
                        {previewImages &&
                            previewImages.map((preview, index) => (
                                <PreviewItem key={`preview-extra-${index}`}>
                                    <Image
                                        src={preview}
                                        alt={`@preview-extra-${index}`}
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
                            ))}
                        <ExtraDropZone
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragLeave={handleLeave}
                        >
                            <OverlayPlaceholders small={true} />
                        </ExtraDropZone>
                    </>
                )}
            </DropboxInner>
        </MultiDropboxWrapper>
    )
}
