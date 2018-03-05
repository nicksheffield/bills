import React from 'react'
import { classes, ife } from 'funcs'

export const TableGroup = (props) => (
	<div {...classes(
		'TableGroup',
		'mt-5',
		ife(props.className, props.className),
	)}>
		<h2 {...classes('mb-4')}>{props.title}</h2>
		{props.children}
	</div>
)