import {
    Dispatch,
    ReactElement,
    SetStateAction,
    DragEvent,
    MouseEvent,
    ChangeEvent,
} from 'react'
import Image from 'next/image'
import { useAppDispatch } from '../../app/hooks/redux'
import {
    deleteSinglePreview,
    handleSinglePreview,
    overSingleDropbox,
} from '../../app/redux/slices/dndSlice'
import Logo from '../../app/services/logo'
import {
    DragOverlay,
    FileUploadWrapper,
    PreviewItem,
    SingleDropboxWrapper,
} from './styles'
import { motion } from 'framer-motion'

interface SingleDND {
    previewImage: string
    file: File | undefined
    setFile: Dispatch<SetStateAction<File | undefined>>
    dragging: boolean
}

export default function SingleDnD({
    previewImage,
    file,
    setFile,
    dragging,
}: SingleDND): ReactElement {
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

    // handle drop event
    function handleDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (validateFile(file)) {
            let preview = URL.createObjectURL(file)
            dispatch(handleSinglePreview(preview))
            setFile(file)
        }
    }

    // handle on drag over or hovering around drop box
    function handleDragOver(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'
        dispatch(overSingleDropbox())
    }

    // handle drop box or drag leave
    function handleLeave(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.dataTransfer.clearData
        dispatch(deleteSinglePreview())
    }

    // handle delete file
    function handleDelete(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        dispatch(deleteSinglePreview())
        setFile(undefined)
    }

    // handle input change
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        if (!(event.target.files && event.target.files.length)) return
        const file = event.target.files[0]
        if (validateFile(file)) {
            let preview = URL.createObjectURL(file)
            dispatch(handleSinglePreview(preview))
            setFile(file)
        }
    }

    return (
        <SingleDropboxWrapper>
            {typeof file === 'undefined' ? (
                <PreviewItem
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleLeave}
                    style={{
                        width: '100%',
                        maxWidth: 486,
                        height: 236,
                        display: `grid`,
                        placeItems: `center`,
                    }}
                >
                    <FileUploadWrapper>
                        {dragging ? (
                            <DragOverlay>
                                <motion.h3
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
                                    id='upload_single_media'
                                    multiple
                                    onChange={handleChange}
                                />
                                <label htmlFor='upload_single_media'>
                                    <Logo name='upload' />
                                    <p>Drag or click to upload main image</p>
                                </label>
                            </>
                        )}
                    </FileUploadWrapper>
                </PreviewItem>
            ) : (
                <PreviewItem style={{ maxWidth: 198 }}>
                    {previewImage && (
                        <Image
                            src={previewImage}
                            alt='@preview'
                            layout='responsive'
                            width={90}
                            height={109}
                            quality={100}
                            objectFit='cover'
                        />
                    )}
                    <button type='reset' onClick={handleDelete}>
                        <Logo name='trash' />
                    </button>
                </PreviewItem>
            )}
        </SingleDropboxWrapper>
    )
}
