import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react'

export function useForm<T>(
    { initialState, onSubmit }: { initialState: T; onSubmit: (cb: T) => void },
    validate?: (values: any) => any
) {
    const [values, setValues] = useState<T>(initialState)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length === 0) onSubmit(values)

        return () => {
            setIsSubmitting(false)
        }
    }, [errors, isSubmitting, onSubmit, values])

    // handle change event
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { type, name, value, checked } = event.target
        const _value = type === 'checkbox' ? checked : value
        setValues({ ...values, [name]: _value })
    }

    // handle blur event
    function handleBlur(event: FocusEvent<HTMLInputElement>) {
        const { name } = event.target

        if (validate) {
            const validateErrors = validate({ values })
            // merge errors object and new updated object along within new unique fields
            let updatedErrors = Object.assign(errors, {
                [name]: validateErrors[name],
            })
            // delete undefined fields from the error object
            Object.keys(updatedErrors).forEach(
                (key) =>
                    updatedErrors[key] === undefined &&
                    delete updatedErrors[key]
            )

            setErrors({ ...updatedErrors })
        }
    }

    // handle form submit
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (validate) {
            const _errors = validate({ values })
            setErrors(_errors)
            setIsSubmitting(true)
        }
    }

    return {
        values,
        setValues,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    }
}

// how to use it
// const {} = useForm<T>({ initialState: state, onSubmit: (values) => console.log(values) }, validate: validateFunc || () => { return {} })
