import React from 'react'
import { classes, ife } from 'funcs'
import { layoutClassNames } from './Layout'
import styled from 'styled-components'


const Container = styled.div`
	width: 80%;
	margin: 0 auto;
`

export const PageContent = (props) => (
	<Container>
		<div {...classes(
			'PageContent',
			ife(props.className, props.className),
			layoutClassNames(props)
		)}>
			{props.children}
		</div>
	</Container>
)