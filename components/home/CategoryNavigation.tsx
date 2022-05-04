import { ReactElement } from "react"
import Link from "next/link"
import Logo from "../../app/services/logo"
import { categoriesNavData } from "../../dummy/dummyDB"
import { CategoryNavigationWrapper } from "./styles/CategoryNavigationStyles"

export default function CategoryNavigation(): ReactElement {
  return (
    <CategoryNavigationWrapper>
      {categoriesNavData.map((item, idx) => (
        <Link
          key={`slider_category_sc_${idx}`}
          href={{
            pathname: "/product/categories",
            query: {
              type: item.name.split(" ").join("-").toLowerCase(),
            },
          }}
          passHref
        >
          <a>
            <div className="category_container">
              <Logo name={item.logo} />
              <span>{item.name}</span>
            </div>
          </a>
        </Link>
      ))}
    </CategoryNavigationWrapper>
  )
}
