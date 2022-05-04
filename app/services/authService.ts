// http calls
type TRegUser = {
    email: string
    password: string
    firstName: string
    lastName: string
}
// http call for user login
function login(email: string, password: string) {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
}

// http call for user registration
function register(userInfo: TRegUser) {
    return fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    })
}

const authService = {
    login,
    register,
}

export default authService
