import { ReactNode } from 'react'
// redux
import { useAppSelector } from '../../app/hooks/redux'
// components
import { DashboardSidebar, PopupStatus } from '..'
// styles
import { DashboardLayoutContent } from './styles'

export default function DashbordLayout({ children }: { children: ReactNode }) {
    const { notifications } = useAppSelector((state) => state.notication)

    return (
        <>
            <PopupStatus notifications={notifications} />
            <DashboardSidebar />
            <main>
                <DashboardLayoutContent>{children}</DashboardLayoutContent>
            </main>
        </>
    )
}
