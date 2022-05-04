export interface MenuData {
    src: string
    name: string
    info: string[]
    href: string
}

const data = [
    {
        src: 'https://images.unsplash.com/photo-1637344630895-3dbeab5e7190?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        name: 'Home Page',
        info: ['Choice Of Uniques', 'Make An Impact', 'Spread Difference'],
        href: '/',
    },
    {
        src: 'https://images.unsplash.com/photo-1637133111206-6a1b88c476a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        name: 'Sign In',
        info: ['Level Up', 'Pick Always Trendy', 'Never Seen Before'],
        href: '/login',
    },
    {
        src: 'https://images.unsplash.com/photo-1635451321197-9c7528b18a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        name: 'Create Account',
        info: ['Stay Connected', 'Live Comfortable', 'Enjoy Being Sexy'],
        href: '/register',
    },
    {
        src: 'https://images.unsplash.com/photo-1635451321384-191d3593a68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        name: 'Contact',
        info: ['Stay Connected', 'Live Comfortable', 'Enjoy Being Sexy'],
        href: '/contact',
    },
    {
        src: 'https://images.unsplash.com/photo-1635451321384-191d3593a68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        name: 'User Profile',
        info: ['Stay Connected', 'Live Comfortable', 'Enjoy Being Sexy'],
        href: '/users/profie',
    },
    {
        src: 'https://images.unsplash.com/photo-1635451321384-191d3593a68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        name: 'Dashboard Page',
        info: ['Stay Connected', 'Live Comfortable', 'Enjoy Being Sexy'],
        href: '/admin/dashboard',
    },
] as MenuData[]

export default data
