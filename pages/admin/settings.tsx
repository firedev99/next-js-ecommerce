import { ReactElement } from 'react'
import { DashboardLayout } from '../../components'

interface Props {}

function SettingsPage({}: Props): ReactElement {
    return (
        <div>
            <h1>This is settings page</h1>
        </div>
    )
}

SettingsPage.Layout = DashboardLayout

export default SettingsPage
