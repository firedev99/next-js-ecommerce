import {
    CreateProductRequest,
    LoginRequest,
    RegistrationRequest,
} from '../../typings/interfaces/mains'

interface Errors {
    email?: string
    password?: string | number
    firstName?: string
    lastName?: string
    name?: string
    price?: string
    vendorName?: string
    description?: string
}

function login({ values }: { values: LoginRequest }) {
    let errors = {} as Errors

    if (!values.email) {
        errors.email = 'email required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'invalid email address'
    } else if (/[A-Z]/.test(values.email)) {
        errors.email = "email can't contain capital characters"
    }

    if (!values.password) {
        errors.password = 'password required'
    } else if (values.password.length < 8) {
        errors.password = 'password must be atleast 8 characters'
    }

    return errors
}

function register({ values }: { values: RegistrationRequest }) {
    let errors = {} as Errors

    if (!values.firstName) errors.firstName = 'first name required'
    if (!values.lastName) errors.lastName = 'last name required'

    if (!values.email) {
        errors.email = 'email required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'invalid email address'
    } else if (/[A-Z]/.test(values.email)) {
        errors.email = "email can't contain capital alphabet"
    }

    if (!values.password) {
        errors.password = 'password required'
    } else if (values.password.length < 8) {
        errors.password = 'password must be atleast 8 characters'
    }

    return errors
}

function createProduct({ values }: { values: CreateProductRequest }) {
    let errors = {} as Errors

    if (!values.name) errors.name = 'name is required'
    if (!values.price) errors.price = 'price is required'
    if (!values.vendorName) errors.vendorName = 'vendor name is required'
    if (!values.description) errors.description = 'description is required'

    return errors
}

const validate = {
    login,
    register,
    createProduct,
}

export default validate
