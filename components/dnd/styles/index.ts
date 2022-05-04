import styled, { css } from 'styled-components'

export const MultiDropboxWrapper = styled.div`
	width: 640px;
	height: auto;
	overflow: hidden;
	margin-bottom: 1rem;
`

export const SingleDropboxWrapper = styled.div`
	width: 100%;
	height: auto;
`

export const ColorDropboxWrapper = styled.div`
	width: 640px;
	height: auto;
	overflow: hidden;
`

export const DropboxInner = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	overflow-x: auto;
	padding: 0.5rem 0 0.5rem 0;

	::-webkit-scrollbar {
		height: 12px;
		width: 13px;
	}
	/* Track */
	::-webkit-scrollbar-track {
		padding: 1px;
		background: none;
	}
	/* Handle */
	::-webkit-scrollbar-thumb {
		border-radius: 2px;
		background: #5a5a5a;
		width: 12px;
	}
	/* On hover */
	::-webkit-scrollbar-thumb:hover {
		background: #b3b3b3;
	}
`

export const PreviewItem = styled.div`
	min-width: 198px;
	padding: 0.6rem;
	height: 236px;
	border-radius: 0.5rem;
	background-color: rgba(255, 255, 255, 0.07);
	position: relative;
	place-items: center;
	margin-right: 1rem;

	button {
		opacity: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: transparent;
		border: none;
		transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		svg {
			color: rgba(170, 170, 170, 1);
			width: 2.25rem;
			height: 2.25rem;
		}
	}

	:hover {
		h3 {
			display: none;
		}
		button {
			opacity: 1;
			background-color: rgba(255, 255, 255, 0.5);
			padding: 1.1rem;
			border-radius: 50%;
			cursor: pointer;
			svg {
				color: rgba(0, 0, 0, 1);
			}
		}
	}
`

const hideInput = css`
	input {
		opacity: 0;
		width: 0.1px;
		height: 0.1px;
		position: absolute;
	}
	label {
		display: grid;
		place-items: center;
		text-align: center;
		p {
			max-width: 196px;
			font-size: 17px;
			line-height: 1.35rem;
		}
		svg {
			transition: all 0.15s ease-in;
			margin-bottom: 0.25rem;
		}
		:hover {
			cursor: pointer;
			svg {
				transform: scale(1.05);
			}
		}
	}
`

export const FileUploadWrapper = styled.div`
	${hideInput}
	position: relative;
`

export const ExtraDropZone = styled.div`
	min-width: 196px;
	padding: 0.6rem;
	height: 236px;
	border-radius: 0.5rem;
	background: rgba(255, 255, 255, 0.07);
	margin-right: 20px;
	display: grid;
	place-items: center;
	${hideInput}
	margin-right: 0;
	position: relative;
`

export const DragOverlay = styled.div`
	font-size: 1.5rem;
	text-align: center;
	line-height: 1.85rem;
`
export const SpecificColor = styled.div`
	width: 2.8rem;
	height: 2.8rem;
	border-radius: 50%;
	border: 2px solid rgba(170, 170, 170, 1);
	margin: 1rem 1.5rem 1rem 0;
`

export const ColorOptionsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const ChooseColor = styled.div<{ previewMode?: boolean }>`
	min-width: 300px;
	display: flex;
	margin-bottom: auto;
	margin-top: ${({ previewMode }) => (previewMode ? '2rem' : '0.5rem')};
	h3 {
		font-size: 19px;
	}

	button {
		margin-top: -1rem;
		margin-left: 0.4rem;
		background-color: transparent;
		width: 4rem;
		height: 4rem;
		border: none;
		transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		:hover {
			cursor: pointer;
			background-color: rgba(255, 255, 255, 0.5);
			border-radius: 50%;
			svg {
				color: rgba(0, 0, 0, 1);
			}
		}
		svg {
			width: 2.2rem;
			height: 2.2rem;
			color: rgba(170, 170, 170, 1);
		}
	}
`

export const RangeWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 0.4rem 0;

	output {
		width: 2.5rem;
		text-align: center;
		font-size: 1.2rem;
		margin-left: 0.4rem;
	}

	span {
		font-size: 1.3rem;
		margin-left: 1rem;
	}
`
