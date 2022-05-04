import { useEffect, useRef, useState } from 'react'
import data from '../../dummy/menuData'
import { useWindowSize } from '../../app/hooks/useWindowSize'
// components
import MenuItem from './MenuItem'
import CustomCursor from '../../app/ui/cursor'
// styles
import { MenuInner, MenuWrapper } from './styles'

export default function Menu({ open }: { open: boolean }) {
    const menuRef = useRef<HTMLUListElement>(null)
    const [pageData, setPageData] = useState(data)

    const { height } = useWindowSize()

    function cloneData() {
        if (menuRef.current) {
            // get height of the first children
            const itemHeight = menuRef.current.children[0].clientHeight
            const max = Math.ceil(height / itemHeight)
            // clone only initial rendered viewport elements
            const cloneItems = [...pageData]
                .filter((_, index) => index < max)
                .map((target) => target)

            setPageData([...pageData, ...cloneItems])

            return cloneItems.length * itemHeight
        }

        return 0
    }

    function getScrollPosition() {
        if (menuRef.current) {
            return menuRef.current.scrollTop - (menuRef.current.clientTop || 0)
        }

        return 0
    }

    function setScrollPosition(pos: number) {
        if (menuRef.current) {
            menuRef.current.scrollTop = pos
        }
    }

    function initScroll() {
        const scrollPos = getScrollPosition()
        if (scrollPos <= 0) {
            setScrollPosition(1)
        }
    }

    useEffect(() => {
        const menu = menuRef.current
        if (!menu) return
        // hide over overflows when menu is open
        if (open) document.body.style.overflow = 'hidden'
        // initialize scrolling
        if (menu) menu.style.scrollBehavior = 'unset'
        initScroll()

        function scrollUpdate() {
            const scrollPos = getScrollPosition()
            // clone those data which are rendered on screen and get the total height of cloned data
            const cloneHeight = cloneData()

            if (menu) {
                if (cloneHeight + scrollPos >= menu.scrollHeight) {
                    setScrollPosition(1)
                }
                // from backwards
                // else if (scrollPos <= 0) {
                //     setScrollPosition(menu.scrollHeight - cloneHeight)
                // }
            }
        }

        menu.addEventListener('scroll', scrollUpdate)

        return () => {
            menu.removeEventListener('scroll', scrollUpdate)
            document.body.style.overflow = 'auto'
        }
        // eslint-disable-next-line
    }, [open])

    return (
        <>
            {open ? <CustomCursor /> : null}
            <MenuWrapper open={open}>
                <MenuInner>
                    <ul ref={menuRef}>
                        {pageData.map((item, index) => (
                            <MenuItem
                                key={index}
                                details={item}
                                pageIndex={index}
                            />
                        ))}
                    </ul>
                </MenuInner>
            </MenuWrapper>
        </>
    )
}
