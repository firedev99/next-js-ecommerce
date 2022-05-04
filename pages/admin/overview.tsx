import { ReactElement, useEffect } from "react"
import { useAppDispatch } from "../../app/hooks/redux"
import { fetchSpecificProductDetails } from "../../app/redux/slices/generalProductSlice"
import { DashboardLayout } from "../../components"

interface Props {}

function OverviewPage({}: Props): ReactElement {
  const dispatch = useAppDispatch()
  useEffect(() => {
    ;(async function fetchData() {
      await dispatch(
        fetchSpecificProductDetails("61e57bbc31193e264761fac0")
      ).unwrap()
    })()
  }, [])

  return (
    <div>
      <h1>This is overview page</h1>
    </div>
  )
}

OverviewPage.Layout = DashboardLayout

export default OverviewPage
