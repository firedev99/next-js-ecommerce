import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { FilteringOption, FilterModal } from '..'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import { useWindowSize } from '../../app/hooks/useWindowSize'
import {
    closeModal,
    openModal,
} from '../../app/redux/slices/productFilteringSlice'
import Logo from '../../app/services/logo'
import BrandModal from './BrandModal'
import CategoryModal from './CategoryModal'
import ColorModal from './ColorModal'
import PriceModal from './PriceModal'
import SortingModal from './SortingModal'

import {
    FilteringHeader,
    LeftFilters,
    RightFilters,
    FilteringOptionsWrapper,
    FilteringOptionDisplay,
} from './styles/ProductFilteringStyles'

type Props = {}

export default function ProductFilteringOptions({}: Props): ReactElement {
    const [direction, setDirection] = useState<'left' | 'right'>('left')

    const dispatch = useAppDispatch()
    const { openedModals, activeModal } = useAppSelector(
        (state) => state.product_filtering
    )

    const catsNavRef = useRef<HTMLButtonElement[]>([])
    const catsModalRef = useRef<HTMLDivElement[]>([])
    const { width } = useWindowSize()

    // handle clicked outside
    const clickedOutside = useCallback(
        (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
            if (openedModals[activeModal] === false) return
            if (
                !catsModalRef.current[activeModal] ||
                catsModalRef.current[activeModal].contains(event.target as Node)
            ) {
                return
            }

            dispatch(closeModal(activeModal))
        },
        [dispatch, activeModal, openedModals]
    )

    // handle modal controls and set the direction based on the area left on the right side
    // if the client width of the modal is not less then the area left on the right than set the direction from right or start align it from the right side
    function popupModal(idx: number) {
        if (!catsModalRef.current[idx]) return
        // set the direction of the modal
        if (
            width -
                catsModalRef.current[idx].offsetLeft -
                catsModalRef.current[idx].clientWidth >
            100
        ) {
            setDirection('left')
        } else {
            setDirection('right')
        }

        if (openedModals[idx]) {
            dispatch(closeModal(idx))
        } else {
            dispatch(openModal(idx))
        }
    }

    useEffect(() => {
        if (typeof window === 'undefined') return

        window.addEventListener('mousedown', clickedOutside)
        window.addEventListener('touchstart', clickedOutside)

        return () => {
            window.removeEventListener('mousedown', clickedOutside)
            window.removeEventListener('touchstart', clickedOutside)
        }
    }, [clickedOutside])

    return (
        <FilteringHeader>
            <LeftFilters>
                {/* categories */}
                <FilteringOptionsWrapper
                    ref={(el) =>
                        (catsModalRef.current[0] = el as HTMLDivElement)
                    }
                >
                    <FilteringOption
                        ref={(el) =>
                            (catsNavRef.current[0] = el as HTMLButtonElement)
                        }
                        onClick={() => popupModal(0)}
                    >
                        <FilteringOptionDisplay>
                            <Logo name='package-box' />
                            <span>Category</span>
                        </FilteringOptionDisplay>
                    </FilteringOption>
                    <CategoryModal
                        direction={'left'}
                        opened={openedModals[0]}
                    />
                </FilteringOptionsWrapper>

                {/* brands / vendors */}
                <FilteringOptionsWrapper
                    ref={(el) =>
                        (catsModalRef.current[1] = el as HTMLDivElement)
                    }
                >
                    <FilteringOption
                        ref={(el) =>
                            (catsNavRef.current[1] = el as HTMLButtonElement)
                        }
                        onClick={() => popupModal(1)}
                    >
                        <FilteringOptionDisplay>
                            <Logo name='slack-logo' />
                            <span>Brand / Vendor</span>
                        </FilteringOptionDisplay>
                    </FilteringOption>
                    <FilterModal
                        opened={openedModals[1]}
                        direction={direction}
                        className='brand_filter_modal'
                    >
                        <BrandModal />
                    </FilterModal>
                </FilteringOptionsWrapper>

                {/* Color */}
                <FilteringOptionsWrapper
                    ref={(el) =>
                        (catsModalRef.current[2] = el as HTMLDivElement)
                    }
                >
                    <FilteringOption
                        ref={(el) =>
                            (catsNavRef.current[2] = el as HTMLButtonElement)
                        }
                        onClick={() => popupModal(2)}
                    >
                        <FilteringOptionDisplay>
                            <Logo name='life-buoy-sign' />
                            <span>Color</span>
                        </FilteringOptionDisplay>
                    </FilteringOption>
                    <FilterModal
                        opened={openedModals[2]}
                        direction={direction}
                        className='color_filter_modal'
                    >
                        <ColorModal />
                    </FilterModal>
                </FilteringOptionsWrapper>

                {/* Price Range */}
                <FilteringOptionsWrapper
                    ref={(el) =>
                        (catsModalRef.current[3] = el as HTMLDivElement)
                    }
                >
                    <FilteringOption
                        ref={(el) =>
                            (catsNavRef.current[3] = el as HTMLButtonElement)
                        }
                        onClick={() => popupModal(3)}
                    >
                        <FilteringOptionDisplay>
                            <Logo name='dollar-sign' />
                            <span>Price Range</span>
                        </FilteringOptionDisplay>
                    </FilteringOption>
                    <FilterModal
                        opened={openedModals[3]}
                        direction={direction}
                        className='price_filter_modal'
                    >
                        <PriceModal />
                    </FilterModal>
                </FilteringOptionsWrapper>
            </LeftFilters>

            {/* Filter & Sort */}
            <RightFilters>
                <FilteringOptionsWrapper
                    ref={(el) =>
                        (catsModalRef.current[4] = el as HTMLDivElement)
                    }
                >
                    <FilteringOption
                        ref={(el) =>
                            (catsNavRef.current[4] = el as HTMLButtonElement)
                        }
                        onClick={() => popupModal(4)}
                    >
                        <FilteringOptionDisplay className='last_filter_option'>
                            <Logo name='lines' />
                            <span>Recently added</span>
                        </FilteringOptionDisplay>
                        <span className='sorting_tag'>Filter & Sort</span>
                    </FilteringOption>
                    <SortingModal opened={openedModals[4]} />
                </FilteringOptionsWrapper>
            </RightFilters>
        </FilteringHeader>
    )
}
