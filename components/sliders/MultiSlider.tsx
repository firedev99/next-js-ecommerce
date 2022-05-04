import { ReactElement } from 'react'
import { useWindowSize } from '../../app/hooks/useWindowSize'
import { ProductProps } from '../../typings/interfaces/mains'
import PaginatedSlider from './PaginatedSlider'
import TouchSlider from './TouchSlider'

interface Props {
	data: ProductProps[]
}

export default function MultiSlider({ data }: Props): ReactElement {
	const { width } = useWindowSize()
	return width > 600 ? (
		<PaginatedSlider data={data} />
	) : (
		<TouchSlider data={data} />
	)
}
