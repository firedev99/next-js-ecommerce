interface DashboardLinks {
    name: string
    url: string
    logo: 'grid' | 'clipboard' | 'box' | 'pie-chart' | 'users' | 'setting'
}

const dashboardLinks = [
    {
        name: 'Dashboard',
        url: '/admin/dashboard',
        logo: 'grid',
    },
    {
        name: 'Orders',
        url: '/admin/orders',
        logo: 'clipboard',
    },
    {
        name: 'Products',
        url: '/admin/products',
        logo: 'box',
    },
    {
        name: 'Overview',
        url: '/admin/overview',
        logo: 'pie-chart',
    },
    {
        name: 'Customers',
        url: '/admin/customers',
        logo: 'users',
    },
    {
        name: 'Settings',
        url: '/admin/settings',
        logo: 'setting',
    },
] as DashboardLinks[]

export default dashboardLinks
