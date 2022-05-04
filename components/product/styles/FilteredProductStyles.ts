import styled from 'styled-components'

export const FilterProductsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 1rem;
	margin-top: 2rem;

	@media (max-width: 1366px) {
		grid-template-columns: repeat(4, 1fr);
		margin-top: 1.2rem;
	}

	@media (max-width: 1100px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 776px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 0.9rem;
		margin-top: 0.8rem;
	}

	@media (max-width: 476px) {
		gap: 0.6rem;
	}

	@media (max-width: 390px) {
		grid-template-columns: repeat(1, 1fr);
	}
`
