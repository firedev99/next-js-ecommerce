import React, { ReactElement } from 'react'
import { DashboardLayout } from '../../components'

interface Props {}

function DashboardPage({}: Props): ReactElement {
    return (
        <div>
            <h1>This is dashboard page</h1>
        </div>
    )
}

DashboardPage.Layout = DashboardLayout

export default DashboardPage
