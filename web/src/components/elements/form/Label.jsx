import React from 'react'
import { classes, ife } from 'funcs'
import styled from 'styled-components'

const StyledLabel = styled.label.attrs({
	className: props => classes('Label', props.className).className,
	htmlFor: props => props.name
})`
	width: ${props => props.width || 'auto'};
	padding-top: 0.4em;
	user-select: none;
`

export const Label = (props) => (
	<StyledLabel {...props}>
		{props.text}
		{props.children}
	</StyledLabel>
)