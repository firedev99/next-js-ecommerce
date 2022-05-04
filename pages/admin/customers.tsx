import { ReactElement } from 'react'
import { DashboardLayout } from '../../components'

interface Props {}

function CustomersPage({}: Props): ReactElement {
    return (
        <div>
            <h1>This is customers page</h1>
        </div>
    )
}

CustomersPage.Layout = DashboardLayout

export default CustomersPage
