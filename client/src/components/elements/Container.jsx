import React from 'react'
import { classes, ife } from 'funcs'
import { layoutClassNames } from './Layout'

export const Container = (props) => (
	<div {...classes(
		'container',
		ife(props.className, props.className),
		layoutClassNames(props)
	)}>
		{props.children}
	</div>
)