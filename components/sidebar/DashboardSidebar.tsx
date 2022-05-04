import { ReactElement, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import dashboardLinks from "../../dummy/dashboardLinks"
import { AnimateSharedLayout, motion } from "framer-motion"
import Logo from "../../app/services/logo"

import {
  LinksWrapper,
  SidebarInner,
  SidebarItem,
  SidebarWrapper,
  StlyedImage,
  UserWrapper,
} from "./styles/dashboardStyles"

export default function DashboardSidebar(): ReactElement {
  const router = useRouter()
  const pageName = router.asPath.split("/")[2]
  const [active, setActive] = useState(pageName)

  const name = {
    isActive: (name: string) => active === name.toLowerCase(),
    lower: (name: string) => {
      return name.toLowerCase()
    },
  }

  return (
    <SidebarWrapper>
      <SidebarInner>
        <UserWrapper>
          <div className="user_profile">
            <StlyedImage
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80"
              alt="@unsplash"
              layout="responsive"
              objectFit="cover"
              width="65px"
              height="65px"
            />
            <span className="edit">
              <Logo name="edit" />
            </span>
          </div>
          <span>Jessie Pinkman.</span>
          <span style={{ fontStyle: "italic", fontSize: 14 }}>Admin</span>
        </UserWrapper>
        <AnimateSharedLayout>
          <LinksWrapper>
            {dashboardLinks.map((item, index) => (
              <Link href={item.url} key={`admin-link-${index}`} passHref>
                <SidebarItem
                  key={index}
                  onClick={() => setActive(name.lower(item.name))}
                  active={name.isActive(item.name)}
                >
                  {name.isActive(item.name) && (
                    <motion.div layoutId="active_prop" className="active_prop">
                      <div className="active_prop_line" />
                    </motion.div>
                  )}
                  <span className="">
                    <Logo name={item.logo} />
                  </span>
                  <span>{item.name}</span>
                </SidebarItem>
              </Link>
            ))}
          </LinksWrapper>
        </AnimateSharedLayout>
        <SidebarItem>
          <div className="">
            <Logo name="logout" />
          </div>
          <span>Logout</span>
        </SidebarItem>
      </SidebarInner>
    </SidebarWrapper>
  )
}
