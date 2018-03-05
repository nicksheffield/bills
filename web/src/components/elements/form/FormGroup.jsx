import React from 'react'
import { classes, ife } from 'funcs'
import styled from 'styled-components'

const StyledFormGroup = styled.div.attrs({
	className: props => classes('form-group', props.className).className
})`
	display: flex;
	flex-direction: column;

	${props => props.inline && `
		flex-direction: row;
		
		> label {
			display: inline-block;
			margin-right: 1em;
			margin-top: 0.2em;
		}

		> .input, > .IceSelect, > .select-list {
			flex: 1;
		}

		> .input-checkbox {
			margin-top: 0.4em;
		}
	`}

	${props => props.labelCol && `
		> label {
			width: ${props.labelCol}
		}
	`}

	${props => props.separateTop && `
		border-top: 3px solid #eee;
		padding-top: 1em;
		margin-top: 1em;
	`}
`

export const FormGroup = (props) => (
	<StyledFormGroup {...props}>
		{props.children}
	</StyledFormGroup>
)