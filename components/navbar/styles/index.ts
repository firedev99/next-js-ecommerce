import { motion } from 'framer-motion'
import styled from 'styled-components'

export const MenuItem = styled(motion.li)<{ length: number }>`
	list-style-type: none;
	width: 100%;
	height: 10vh;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1vh 0;

	:nth-of-type(2) {
		justify-content: flex-start;
	}
	:nth-of-type(3) {
		justify-content: flex-end;
	}
	:nth-of-type(4) {
		justify-content: ${({ length }) =>
			length === 4 ? `center` : `flex-start`};
	}
	:nth-of-type(5) {
		justify-content: flex-end;
	}

	@media (max-width: 1540px) {
		height: 4.9rem;
		margin: 0.5rem 0;
	}

	@media (max-width: 1186px) {
		margin: 1rem 0;
		:nth-of-type(1) {
			justify-content: flex-start;
		}
		:nth-of-type(3) {
			justify-content: flex-start;
		}
		:nth-of-type(4) {
			justify-content: flex-start;
		}
		:nth-of-type(5) {
			justify-content: flex-start;
		}
		:nth-of-type(6) {
			justify-content: flex-start;
		}
	}

	@media (max-width: 756px) {
		margin: 0.5rem 0;
	}

	@media (max-width: 542px) {
		height: 4.5rem;
		margin: 0;
	}
`

export const LinkWrapper = styled.div`
	position: relative;
	z-index: 75;
	display: flex;
	align-items: center;

	span {
		position: relative;
		z-index: 20;
		font-size: 2.7vh;
		margin-right: 0.8rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.85);
	}

	@media (max-width: 1540px) {
		span {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 1024px) {
		span {
			margin-top: 0.2rem;
		}
	}

	@media (max-width: 632px) {
		span {
			font-size: 1.1rem;
		}
	}

	@media (max-width: 542px) {
		span {
			margin-top: -0.1rem;
		}
	}

	@media (max-width: 427px) {
		span {
			font-size: 1rem;
			margin-right: 0.6rem;
		}
	}
`

export const PageName = styled(motion.div)`
	position: relative;
	z-index: 20;
	overflow: hidden;
	height: 13vh;

	h1 {
		font-size: 10vh;
		line-height: 1.28;
		font-weight: 700;
		letter-spacing: 2px;

		:hover {
			cursor: pointer;
		}
	}

	.text_clone {
		position: absolute;
		top: 0;
		pointer-events: none;
		color: rgba(255, 255, 255, 1);
		clip-path: inset(0 100% 0 0);
		transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
	}

	:not(.text_clone) {
		-webkit-text-stroke: 1px rgba(255, 255, 255, 0.7);
		color: transparent;
		white-space: nowrap;

		:hover {
			.text_clone {
				clip-path: inset(0 0 0 0);
			}
		}
	}

	@media (max-width: 1540px) {
		height: 104px;

		h1 {
			font-size: 5rem;
		}
	}

	@media (max-width: 916px) {
		height: 86px;
		h1 {
			font-size: 4rem;
		}
	}

	@media (max-width: 756px) {
		height: 72px;

		h1 {
			font-size: 3.5rem;
		}
	}

	@media (max-width: 632px) {
		height: 58px;

		h1 {
			font-size: 2.8rem;
		}
	}

	@media (max-width: 542px) {
		height: 50px;

		h1 {
			font-size: 2.3rem;
		}
	}

	@media (max-width: 427px) {
		h1 {
			white-space: normal;
		}

		:not(.text_clone) {
			white-space: normal;
		}
	}

	@media (max-width: 300px) {
		height: 42px;
		h1 {
			font-size: 2rem;
		}
	}
`

export const LinkImage = styled(motion.div)`
	position: absolute;
	height: 28vh;
	width: 16vw;
	min-width: 180px;
	left: 0;

	.image_wrapper {
		position: relative;
		height: 100%;
		width: 100%;
		min-width: 100%;
	}

	@media (max-width: 1540px) {
		height: 20rem;
	}

	@media (max-width: 1280px) {
		width: 14rem;
	}

	@media (max-width: 834px) {
		width: 10rem;
		height: 15rem;
	}

	@media (max-width: 756px) {
		width: 8rem;
	}

	@media (max-width: 632px) {
		min-width: 142px;
		height: 200px;
	}

	@media (max-width: 525px) {
		min-width: 124px;
		height: 176px;
	}
`

export const MenuWrapper = styled(motion.nav)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 1);
	z-index: 100;
	width: 100%;
	height: 100%;
	overflow: auto;
	padding: 0 8rem;

	ul {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		overflow: hidden;

		::-webkit-scrollbar {
			display: none;
		}
	}

	@media (max-width: 1024px) {
		padding: 0 4rem;
	}

	@media (max-width: 900px) and (orientation: landscape) {
		ul {
			justify-content: flex-start;
			overflow: auto;
			overflow-x: hidden;
			padding-top: 3rem;
			height: 100%;
		}
	}

	@media (min-width: 900px) and (max-height: 776px) {
		ul {
			overflow: auto;
		}
	}

	@media (max-width: 756px) {
		padding: 0 2.5rem;
	}

	@media (max-width: 542px) {
		padding: 0 2rem;
		overflow: auto;
	}

	@media (max-width: 360px) {
		padding: 0 1rem;
	}
`

export const FancyBackground = styled(motion.div)`
	z-index: 200;
	height: 100vh;
	width: 100%;
	position: absolute;
	background-color: whitesmoke;
	left: 0;

	:last-of-type {
		background-color: whitesmoke;
		left: unset;
		right: 0;
		left: 0;
	}

	@media (max-width: 820px) {
		top: 0;
		height: 100vh;
		width: 100vw;
	}
`
