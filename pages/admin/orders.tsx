import { ReactElement } from 'react'
import { DashboardLayout } from '../../components'

interface Props {}
interface User {
    email: string
    name: string
}
const state = {
    email: '',
    name: '',
} as User

function OrdersPages({}: Props): ReactElement {
    return (
        <div>
            <h1>This is orders page</h1>
        </div>
    )
}

OrdersPages.Layout = DashboardLayout

export default OrdersPages
