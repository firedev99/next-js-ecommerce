import { ReactElement, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../../app/services/logo'

interface Props {
    list?: string[]
    children?: ReactNode
    title: string
    onClick?: (item: string) => void
    className?: string
    selected?: string
    open?: boolean
}

export const AccordionWrapper = styled(motion.div)`
    cursor: pointer;
    margin-bottom: 1rem;

    svg {
        transition: all 1s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    .accordion_display {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        border: none;
        color: rgba(170, 170, 170, 1);

        h3 {
            font-family: 'Poppins', sans-serif;
        }

        span {
            svg {
                transition: all 1s cubic-bezier(0.215, 0.61, 0.355, 1);
                transform: rotate(0deg);
            }
        }
        .active_logo {
            svg {
                transform: rotate(180deg);
            }
        }

        :hover {
            cursor: pointer;
        }
    }

    .accordion_items_wrapper {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: end;

        .active {
            font-weight: 800;
        }
        span {
            font-size: 22px;
        }
    }
`

function AnimatedAccordion({
    list,
    children,
    title,
    onClick,
    className,
    selected,
    open,
}: Props): ReactElement {
    const [openAccordion, setOpenAccordion] = useState(open || false)
    return (
        <AccordionWrapper className={className}>
            <button
                onClick={() => setOpenAccordion(!openAccordion)}
                className='accordion_display'
            >
                <h3>{title}</h3>
                <span className={openAccordion ? 'active_logo' : ''}>
                    <Logo name='chevron-down' />
                </span>
            </button>
            <AnimatePresence>
                {openAccordion && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                        className='accordion_items_wrapper'
                    >
                        {children
                            ? children
                            : list &&
                              list.map((item, idx) => (
                                  <span
                                      key={`accordion-${
                                          item[item.length - 1].length
                                      }-${idx}`}
                                      className={
                                          selected === item ? 'active' : ''
                                      }
                                      onClick={() => onClick && onClick(item)}
                                  >
                                      {item}
                                  </span>
                              ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </AccordionWrapper>
    )
}

AnimatedAccordion.defaultProps = {
    title: 'AgunBhai',
}

export default AnimatedAccordion
