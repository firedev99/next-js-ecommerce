import { ReactElement, useEffect, useState } from "react"
import Link from "next/link"
import {
  DashboardLayout,
  DogLottie,
  ProductBox,
  SimpleTitle,
} from "../../../components"
import Logo from "../../../app/services/logo"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/redux"
import { fetchProductDetails } from "../../../app/redux/slices/generalProductSlice"
import { ProductProps } from "../../../typings/interfaces/mains"
import {
  AdminProducts,
  AdminProductWrapper,
  CreateOption,
  NewProductLink,
  ViewModes,
} from "../../../styles/pages/AProductsStyles"

function ProductsPage(): ReactElement {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.general_product)

  const [grid, setGrid] = useState(true)
  const [turn, setTurn] = useState(1)
  const [productCount, setProductCount] = useState(0)
  const [products, setProducts] = useState<ProductProps[]>([])

  const pageCount = Math.floor(productCount / 20)

  function paginateNext() {
    setTurn((prev) => {
      return prev + 1
    })
  }

  function paginatePrev() {
    setTurn((prev) => {
      if (prev === 1) return prev
      return prev - 1
    })
  }

  // fetch product data based on page index or count
  useEffect(() => {
    ;(async function fetchData() {
      const res = await dispatch(fetchProductDetails(String(turn))).unwrap()
      setProducts([...res.data.map((item) => item)])
      setProductCount(res.productCount)
    })()
  }, [dispatch, turn])

  if (status === "loading") return <h1>Loading</h1>

  return (
    <AdminProductWrapper>
      <SimpleTitle text="Products" />
      <CreateOption>
        <Link href="/admin/products/new" passHref>
          <NewProductLink>
            <Logo name="plus-sign" />
            <span>Create new product</span>
          </NewProductLink>
        </Link>
      </CreateOption>
      <ViewModes>
        <button onClick={() => setGrid(true)} className={grid ? "active" : ""}>
          <Logo name="grid" />
        </button>
        <button
          onClick={() => setGrid(false)}
          className={!grid ? "active" : ""}
        >
          <Logo name="three-line" />
        </button>
      </ViewModes>
      <AdminProducts className={grid ? "view_grid" : "view_list"}>
        {products.length !== 0 &&
          products.map(({ name, _id, imageSrc, countInStock }) => (
            <ProductBox
              key={_id}
              name={name}
              imageSrc={imageSrc}
              id={_id}
              quantity={countInStock}
            />
          ))}
      </AdminProducts>
      {products.length === 0 && (
        <div className="empty">
          <DogLottie />
          <h2>no products found!</h2>
        </div>
      )}
      {pageCount !== 0 && (
        <div className="pagination_control">
          <button
            disabled={turn === 1}
            className="prev_btn"
            onClick={() => paginatePrev()}
          >
            <Logo name="chevron-right" />
          </button>
          {[...Array(pageCount)].map((_, idx) => (
            <button
              key={`paginated-idx-${idx}`}
              onClick={() => setTurn(idx + 1)}
              className={turn === idx + 1 ? "pagination_active" : ""}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={turn === pageCount}
            className="next_btn"
            onClick={() => paginateNext()}
          >
            <Logo name="chevron-right" />
          </button>
        </div>
      )}
    </AdminProductWrapper>
  )
}

ProductsPage.Layout = DashboardLayout

export default ProductsPage
